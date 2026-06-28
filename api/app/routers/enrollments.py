from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, selectinload

from app.core.database import get_db
from app.models.company import Company
from app.models.enrollment import Enrollment
from app.models.program import Program
from app.models.status import Status
from app.models.status_history import StatusHistory
from app.models.student import Student
from app.schemas.enrollment import EnrollmentCreate, EnrollmentRead, EnrollmentUpdate
from app.schemas.status_history import StatusChangeCreate, StatusHistoryRead

router = APIRouter(prefix="/api/enrollments", tags=["Enrollments"])


def _serialize_enrollment(enrollment: Enrollment) -> EnrollmentRead:
    student = enrollment.student
    company = student.company if student else None
    program = enrollment.program
    status = enrollment.status
    return EnrollmentRead(
        id=enrollment.id,
        student_id=enrollment.student_id,
        student_name=f"{student.first_name} {student.last_name}" if student else "",
        company_id=student.company_id if student else 0,
        company_name=company.name if company else "",
        program_id=enrollment.program_id,
        program_name=program.name if program else "",
        status_id=enrollment.status_id,
        status_code=status.code if status else "",
        status_name=status.name if status else "",
        enrollment_date=enrollment.enrollment_date,
        created_at=enrollment.created_at,
        updated_at=enrollment.updated_at,
    )


def _serialize_history(history: StatusHistory) -> StatusHistoryRead:
    return StatusHistoryRead(
        id=history.id,
        enrollment_id=history.enrollment_id,
        previous_status_id=history.previous_status_id,
        previous_status_code=history.previous_status.code if history.previous_status else None,
        previous_status_name=history.previous_status.name if history.previous_status else None,
        new_status_id=history.new_status_id,
        new_status_code=history.new_status.code if history.new_status else "",
        new_status_name=history.new_status.name if history.new_status else "",
        changed_at=history.changed_at,
        reason=history.reason,
    )


@router.get("", response_model=list[EnrollmentRead])
def list_enrollments(db: Session = Depends(get_db)):
    enrollments = (
        db.execute(
            select(Enrollment)
            .options(
                selectinload(Enrollment.student).selectinload(Student.company),
                selectinload(Enrollment.program),
                selectinload(Enrollment.status),
            )
            .order_by(Enrollment.id)
        )
        .scalars()
        .unique()
        .all()
    )
    return [_serialize_enrollment(enrollment) for enrollment in enrollments]


@router.get("/{enrollment_id}", response_model=EnrollmentRead)
def get_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    enrollment = (
        db.execute(
            select(Enrollment)
            .options(
                selectinload(Enrollment.student).selectinload(Student.company),
                selectinload(Enrollment.program),
                selectinload(Enrollment.status),
            )
            .where(Enrollment.id == enrollment_id)
        )
        .scalars()
        .unique()
        .first()
    )
    if enrollment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
    return _serialize_enrollment(enrollment)


@router.post("", response_model=EnrollmentRead, status_code=status.HTTP_201_CREATED)
def create_enrollment(payload: EnrollmentCreate, db: Session = Depends(get_db)):
    existing_enrollment = (
        db.execute(
            select(Enrollment).where(
                Enrollment.student_id == payload.student_id,
                Enrollment.program_id == payload.program_id,
            )
        )
        .scalars()
        .first()
    )
    if existing_enrollment is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Enrollment already exists")

    student = db.get(Student, payload.student_id)
    if student is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student not found")

    program = db.get(Program, payload.program_id)
    if program is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Program not found")

    status_row = db.get(Status, payload.status_id)
    if status_row is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Status not found")

    enrollment = Enrollment(
        student_id=payload.student_id,
        program_id=payload.program_id,
        status_id=payload.status_id,
        enrollment_date=payload.enrollment_date,
    )
    db.add(enrollment)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Unable to create enrollment") from exc

    db.refresh(enrollment)
    enrollment.student = student
    enrollment.program = program
    enrollment.status = status_row
    return _serialize_enrollment(enrollment)


@router.put("/{enrollment_id}", response_model=EnrollmentRead)
def update_enrollment(enrollment_id: int, payload: EnrollmentUpdate, db: Session = Depends(get_db)):
    enrollment = db.get(Enrollment, enrollment_id)
    if enrollment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")

    student = db.get(Student, payload.student_id)
    if student is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student not found")

    program = db.get(Program, payload.program_id)
    if program is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Program not found")

    status_row = db.get(Status, payload.status_id)
    if status_row is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Status not found")

    enrollment.student_id = payload.student_id
    enrollment.program_id = payload.program_id
    enrollment.status_id = payload.status_id
    enrollment.enrollment_date = payload.enrollment_date

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Unable to update enrollment") from exc

    db.refresh(enrollment)
    enrollment.student = student
    enrollment.program = program
    enrollment.status = status_row
    return _serialize_enrollment(enrollment)


@router.post("/{enrollment_id}/status", response_model=StatusHistoryRead, status_code=status.HTTP_201_CREATED)
def change_enrollment_status(enrollment_id: int, payload: StatusChangeCreate, db: Session = Depends(get_db)):
    enrollment = (
        db.execute(
            select(Enrollment)
            .options(
                selectinload(Enrollment.status),
            )
            .where(Enrollment.id == enrollment_id)
        )
        .scalars()
        .first()
    )
    if enrollment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")

    new_status = db.execute(select(Status).where(Status.code == payload.new_status_code)).scalars().first()
    if new_status is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Status not found")

    if enrollment.status_id == new_status.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Enrollment already has this status")

    history = StatusHistory(
        enrollment_id=enrollment.id,
        previous_status_id=enrollment.status_id,
        new_status_id=new_status.id,
        changed_at=datetime.now(),
        reason=payload.reason,
    )
    enrollment.status_id = new_status.id
    db.add(history)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Unable to change enrollment status") from exc

    db.refresh(enrollment)
    db.refresh(history)
    history.previous_status = db.get(Status, history.previous_status_id) if history.previous_status_id else None
    history.new_status = new_status
    return _serialize_history(history)

from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

from app.models.enrollment import Enrollment
from app.models.status import Status
from app.core.database import get_db
from app.models.company import Company
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentRead, StudentUpdate

router = APIRouter(prefix="/api/students", tags=["Students"])


def _serialize_student(student: Student) -> StudentRead:
    company_name = student.company.name if student.company else ""
    return StudentRead(
        id=student.id,
        first_name=student.first_name,
        last_name=student.last_name,
        company_id=student.company_id,
        company_name=company_name,
        created_at=student.created_at,
        updated_at=student.updated_at,
    )


@router.get("", response_model=list[StudentRead])
def list_students(db: Session = Depends(get_db)):
    students = (
        db.execute(
            select(Student)
            .options(selectinload(Student.company))
            .order_by(Student.id)
        )
        .scalars()
        .unique()
        .all()
    )
    return [_serialize_student(student) for student in students]


@router.get("/{student_id}", response_model=StudentRead)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = (
        db.execute(
            select(Student)
            .options(selectinload(Student.company))
            .where(Student.id == student_id)
        )
        .scalars()
        .unique()
        .first()
    )
    if student is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    return _serialize_student(student)

@router.post("", response_model=StudentRead, status_code=status.HTTP_201_CREATED)
def create_student(payload: StudentCreate, db: Session = Depends(get_db)):
    company = db.get(Company, payload.company_id)
    if company is None:
        raise HTTPException(status_code=400, detail="Company not found")

    student = Student(
        id=payload.id,
        first_name=payload.first_name,
        last_name=payload.last_name,
        company_id=payload.company_id,
    )

    db.add(student)
    db.flush()  

    enrolled_status = db.execute(
        select(Status).where(Status.code == "ENROLLED")
    ).scalars().first()

    if enrolled_status is None:
        raise HTTPException(status_code=500, detail="Default status not found")

    enrollment = Enrollment(
        student_id=student.id,
        program_id=payload.program_id, 
        status_id=enrolled_status.id,
        enrollment_date=date.today()
    )

    db.add(enrollment)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Unable to create student") from exc

    db.refresh(student)
    student.company = company
    return _serialize_student(student)


@router.put("/{student_id}", response_model=StudentRead)
def update_student(student_id: int, payload: StudentUpdate, db: Session = Depends(get_db)):
    student = db.get(Student, student_id)
    if student is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

    company = db.get(Company, payload.company_id)
    if company is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Company not found")

    student.first_name = payload.first_name
    student.last_name = payload.last_name
    student.company_id = payload.company_id

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Unable to update student") from exc

    db.refresh(student)
    student.company = company
    return _serialize_student(student)


@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.get(Student, student_id)
    if student is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")

    db.delete(student)
    db.commit()

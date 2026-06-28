from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.program import Program
from app.schemas.program import ProgramRead

router = APIRouter(prefix="/api/programs", tags=["Programs"])


@router.get("", response_model=list[ProgramRead])
def list_programs(db: Session = Depends(get_db)):
    programs = db.execute(select(Program).order_by(Program.id)).scalars().all()
    return programs

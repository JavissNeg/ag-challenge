from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.status import Status
from app.schemas.status import StatusRead

router = APIRouter(prefix="/api/statuses", tags=["Statuses"])


@router.get("", response_model=list[StatusRead])
def list_statuses(db: Session = Depends(get_db)):
    statuses = db.execute(select(Status).order_by(Status.id)).scalars().all()
    return statuses

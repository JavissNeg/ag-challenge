from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.company import Company
from app.schemas.company import CompanyRead

router = APIRouter(prefix="/api/companies", tags=["Companies"])


@router.get("", response_model=list[CompanyRead])
def list_companies(db: Session = Depends(get_db)):
    companies = db.execute(select(Company).order_by(Company.id)).scalars().all()
    return companies

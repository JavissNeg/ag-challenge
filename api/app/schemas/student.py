from datetime import datetime
from pydantic import Field

from app.schemas.base import CamelModel

class StudentBase(CamelModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=120)
    company_id: int


class StudentCreate(CamelModel):
    id: int
    first_name: str 
    last_name: str
    program_id: int
    company_id: int 


class StudentUpdate(CamelModel):
    pass


class StudentRead(CamelModel):
    id: int
    first_name: str
    last_name: str
    company_id: int
    company_name: str
    created_at: datetime
    updated_at: datetime

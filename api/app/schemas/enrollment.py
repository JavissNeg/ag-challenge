from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class EnrollmentBase(BaseModel):
    student_id: int
    program_id: int
    status_id: int
    enrollment_date: date


class EnrollmentCreate(EnrollmentBase):
    pass


class EnrollmentUpdate(EnrollmentBase):
    pass


class EnrollmentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    student_name: str
    company_id: int
    company_name: str
    program_id: int
    program_name: str
    status_id: int
    status_code: str
    status_name: str
    enrollment_date: date
    created_at: datetime
    updated_at: datetime

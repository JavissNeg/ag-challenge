from datetime import datetime

from pydantic import BaseModel, ConfigDict


class StatusChangeCreate(BaseModel):
    new_status_code: str
    reason: str


class StatusHistoryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    enrollment_id: int
    previous_status_id: int | None
    previous_status_code: str | None
    previous_status_name: str | None
    new_status_id: int
    new_status_code: str
    new_status_name: str
    changed_at: datetime
    reason: str

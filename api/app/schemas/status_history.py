from datetime import datetime

from app.schemas.base import CamelModel


class StatusChangeCreate(CamelModel):
    new_status_code: str
    reason: str


class StatusHistoryRead(CamelModel):
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

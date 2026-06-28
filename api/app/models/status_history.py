from datetime import datetime
from typing import Optional

from sqlalchemy import BigInteger, ForeignKey, SmallInteger, String, TIMESTAMP, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class StatusHistory(Base):
    __tablename__ = "status_history"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    enrollment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("enrollments.id"), nullable=False)
    previous_status_id: Mapped[Optional[int]] = mapped_column(SmallInteger, ForeignKey("statuses.id"), nullable=True)
    new_status_id: Mapped[int] = mapped_column(SmallInteger, ForeignKey("statuses.id"), nullable=False)
    changed_at: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))
    reason: Mapped[str] = mapped_column(String(255), nullable=False)

    enrollment = relationship("Enrollment", back_populates="history")
    previous_status = relationship("Status", foreign_keys=[previous_status_id])
    new_status = relationship("Status", foreign_keys=[new_status_id])

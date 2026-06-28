from datetime import date, datetime

from sqlalchemy import BigInteger, Date, ForeignKey, SmallInteger, TIMESTAMP, UniqueConstraint, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Enrollment(Base):
    __tablename__ = "enrollments"
    __table_args__ = (UniqueConstraint("student_id", "program_id", name="uq_student_program"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("students.id"), nullable=False)
    program_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("programs.id"), nullable=False)
    status_id: Mapped[int] = mapped_column(SmallInteger, ForeignKey("statuses.id"), nullable=False)
    enrollment_date: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
        server_onupdate=text("CURRENT_TIMESTAMP"),
    )

    student = relationship("Student")
    program = relationship("Program", back_populates="enrollments")
    status = relationship("Status", back_populates="enrollments")
    history = relationship("StatusHistory", back_populates="enrollment", cascade="all, delete-orphan")

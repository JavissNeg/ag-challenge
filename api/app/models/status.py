from sqlalchemy import SmallInteger, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Status(Base):
    __tablename__ = "statuses"

    id: Mapped[int] = mapped_column(SmallInteger, primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    enrollments = relationship("Enrollment", back_populates="status")

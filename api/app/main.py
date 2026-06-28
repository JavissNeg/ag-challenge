from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import Company, Enrollment, Program, Status, StatusHistory, Student  # noqa: F401
from app.routers import companies_router, enrollments_router, programs_router, statuses_router, students_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Academia Global API", version="1.0.0")
app.include_router(companies_router)
app.include_router(programs_router)
app.include_router(statuses_router)
app.include_router(enrollments_router)
app.include_router(students_router)

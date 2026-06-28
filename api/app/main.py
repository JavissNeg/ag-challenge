from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.core.config import get_settings
from app.models import Company, Enrollment, Program, Status, StatusHistory, Student  # noqa: F401
from app.routers import companies_router, enrollments_router, programs_router, statuses_router, students_router

Base.metadata.create_all(bind=engine)
settings = get_settings()

app = FastAPI(title="Academia Global API", version="1.0.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=settings.cors_allow_origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(companies_router)
app.include_router(programs_router)
app.include_router(statuses_router)
app.include_router(enrollments_router)
app.include_router(students_router)

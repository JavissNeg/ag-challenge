from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import Company, Student  # noqa: F401
from app.routers.students import router as students_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Academia Global API", version="1.0.0")
app.include_router(students_router)

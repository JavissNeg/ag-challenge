from app.schemas.base import CamelModel

class ProgramRead(CamelModel):
    id: int
    name: str

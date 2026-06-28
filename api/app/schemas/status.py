from app.schemas.base import CamelModel

class StatusRead(CamelModel):
    id: int
    code: str
    name: str
    description: str | None = None

from app.schemas.base import CamelModel


class CompanyRead(CamelModel):
    id: int
    name: str

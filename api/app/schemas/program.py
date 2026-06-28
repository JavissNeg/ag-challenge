from pydantic import BaseModel, ConfigDict


class ProgramRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str

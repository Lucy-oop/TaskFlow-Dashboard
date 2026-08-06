from datetime import date
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str | None = "Medium"
    due_date: date | None = None

class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    priority: str | None = "Medium"
    due_date: date | None = None

class TaskResponse(BaseModel):
    id : int
    title : str
    description : str | None = None
    priority : str | None = "Medium"
    due_date : date | None = None
    owner_id : int

    class Config:
        from_attributes = True


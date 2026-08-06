from sqlalchemy import (Column,Integer,String,Date,ForeignKey)
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(
        Integer,
        primary_key=True,
        index=True
        )
    title = Column(
        String,
        nullable=False
    )
    description = Column(
        String
    )
    priority = Column(
        String,
        default="Medium"
    )
    due_date = Column(
        Date
    )
    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    ) 

     
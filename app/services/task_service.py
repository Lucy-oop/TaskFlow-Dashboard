from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate

class TaskService:
    @staticmethod
    def create_task(
        db: Session,
        task: TaskCreate,
        owner_id : int
    ):
        new_task = Task(
            title = task.title,
            description = task.description,
            priority = task.priority,
            due_date = task.due_date,
            owner_id = owner_id
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.task import Task
from app.models.user import User
from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)
from app.services.task_service import TaskService
from typing import List

router = APIRouter(
     prefix = "/tasks",
     tags = ["Tasks"]
)


@router.post(
    "",
    response_model = TaskResponse,
    status_code = 201
)

def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
     return TaskService.create_task(db,task,current_user.id)


@router.get(
     "",
     response_model = List[TaskResponse],
     status_code =status.HTTP_200_OK)

def get_tasks(
     db: Session = Depends(get_db),
     current_user:User = Depends(get_current_user)
):
      tasks = (
            db.query(Task).filter(Task.owner_id == current_user.id).all()
      )
      return tasks

@router.get(
      "/{task_id}",
      response_model = TaskResponse
)

def get_task(
      task_id: int,
      db: Session = Depends(get_db),
      current_user :User = Depends(get_current_user)
):
      task = (
            db.query(Task).filter(Task.id == task_id,
                                  Task.owner_id == current_user.id).first()
      )
      if task is None:
            raise HTTPException(
                  status_code = 404,
                  detail = "Task not found"
            )
      return task

@router.put(
      "/{task_id}",
      response_model = TaskResponse
)
def update_task(
      task_id: int,
      updated: TaskUpdate,
      db: Session = Depends(get_db),
      current_user : User = Depends(get_current_user)
):
      task = (db.query(Task).filter(Task.id == task_id,
                                   Task.owner_id == current_user.id).first())
      if task is None:
            raise HTTPException(
                  status_code = 404,
                  detail = 'Task not found'
            )
      task.title = updated.title
      task.description = updated.description
      task.priority = updated.priority
      task.due_date = updated.due_date
      db.commit()
      db.refresh(task)
      return task

@router.delete(
      "/{task_id}",
      status_code = 204
)
def delete_task(
      task_id: int,
      db: Session = Depends(get_db),
      current_user: User = Depends(get_current_user)
):
      task = (db.query(Task).filter(Task.id == task_id,
                                    Task.owner_id == current_user.id).first())
      if task is None:
            raise HTTPException(
                  status_code = 404,
                  detail = "Task not found"
            )
      db.delete(task)
      db.commit()
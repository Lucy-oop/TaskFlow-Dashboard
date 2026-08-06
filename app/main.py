from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import Base, engine
from app.models.user import User
from app.models.task import Task
from app.routers import user
from app.routers.task import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://taskflow-dashboard1-ten.vercel.app",
        "http://127.0.0.1:8000",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/statics"), name="statics")

app.include_router(user.router)

@app.get("/")
def home():
    return {
        "message": "Task Manager is running!"
    }

app.include_router(task_router)
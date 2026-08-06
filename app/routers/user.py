from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.auth import hash_password
from app.schemas.user import UserLogin
from app.auth import verify_password
from app.oauth2 import create_access_token
from app.dependencies import get_current_user
from app.services.user_service import UserService


router = APIRouter(
    prefix = "/users",
    tags = ["Users"]
)

@router.post(
    "/register",
    response_model = UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
   try:
       return UserService.create_user(db,user)
   except ValueError as e:
       raise HTTPException(
           status_code = 400,
           detail = str(e)
       )
    

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = (db.query(User).filter(User.email == user.email).first())
    if not db_user:

        raise HTTPException(
            status_code = 401,
            detail = "Invalid credentials"
        )
    valid = verify_password(user.password,db_user.hashed_password)
    if not valid:
        raise HTTPException(
            status_code = 401,
            detail = "invalid credentials"
        ) 
    token = create_access_token({
        "sub" : str(db_user.id)
    })
    return {
        "access_token": token,
        "token_type": "bearer"
    }
@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
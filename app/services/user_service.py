from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.auth import hash_password


class UserService:
    @staticmethod
    def create_user(
        db: Session,
        user: UserCreate
    ):
        existing = (
            db.query(User).filter(User.email == user.email).first()
        )
        if existing:
            raise ValueError("Email already exists")

        new_user = User(
            username = user.username,
            email = user.email,
            hashed_password = hash_password(user.password)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user


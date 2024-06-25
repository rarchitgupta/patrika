from app.database import Base
from sqlalchemy import Column, Integer, String


class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, index=True)
    api_key = Column(String)

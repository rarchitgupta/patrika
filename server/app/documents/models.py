from sqlalchemy import Column, String, Integer, DateTime, JSON
from datetime import datetime
from ..database import Base


class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, index=True)
    name = Column(String, index=True)
    date = Column(DateTime, default=datetime.now(), index=True)
    last_modified = Column(DateTime, default=datetime.now(), index=True)
    json_content = Column(JSON)

from sqlalchemy import Column, String, Integer
from ..database import Base


class Source(Base):
    __tablename__ = "sources"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, index=True)
    source_name = Column(String, index=True)
    meta_source_name = Column(String, index=True)
    source_type = Column(String)

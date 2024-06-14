from sqlalchemy.orm import Session
from .models import Source


def add_source_db(file_name: str, tmp_file_name: str, user_id: str, db: Session):
    source = Source(
        user_id=user_id,
        source_name=file_name,
        meta_source_name=tmp_file_name,
        source_type="pdf",
    )
    db.add(source)
    db.commit()


def get_sources(user_id: str, db: Session):
    sources = db.query(Source).filter(Source.user_id == user_id).all()
    return sources


def delete_db_source(id: int, db: Session):
    db.query(Source).filter(Source.id == id).delete()
    db.commit()


def get_meta_source(user_id: str, id: int, db: Session):
    source = db.query(Source).filter(Source.id == id, Source.user_id == user_id).first()
    return source.meta_source_name

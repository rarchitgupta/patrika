from sqlalchemy.orm import Session, defer
from datetime import datetime
from .models import Document


def add_document_db(name: str, user_id: str, json_content: dict, date, db: Session):
    document = Document(
        user_id=user_id,
        name=name,
        date=date,
        json_content=json_content,
        last_modified=datetime.now(),
    )
    db.add(document)
    db.commit()
    return db.query(Document).filter(Document.id == document.id).first()


def update_document_db(
    id: int,
    db: Session,
    name: str = "",
    user_id: str = "",
    json_content: dict = "",
    date="",
):
    document = (
        db.query(Document)
        .filter(Document.id == id, Document.user_id == user_id)
        .first()
    )
    document.name = name if name else document.name
    document.date = date if date else document.date
    document.json_content = json_content if json_content else document.json_content
    document.last_modified = datetime.now()
    db.commit()


def get_documents_db(user_id: str, db: Session):
    documents = (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .options(defer(Document.json_content))
        .order_by(Document.last_modified)
        .all()
    )
    return documents


def get_documents_count_db(user_id: str, db: Session):
    documents = get_documents_db(user_id, db)
    return len(documents)


def get_latest_document(user_id: str, db: Session):
    document = (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .order_by(Document.last_modified)
        .first()
    )
    return document


def get_document_by_id(id: int, user_id: str, db: Session):
    document = (
        db.query(Document)
        .filter(Document.id == id, Document.user_id == user_id)
        .first()
    )
    return document


def delete_document_db(id: int, user_id: str, db: Session):
    db.query(Document).filter(Document.id == id, Document.user_id == user_id).delete()
    db.commit()

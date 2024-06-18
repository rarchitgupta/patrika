from datetime import datetime
from sqlalchemy.orm import Session
from app.utils.log_config import logger
from .database import (
    add_document_db,
    get_documents_db,
    update_document_db,
    get_latest_document,
    get_document_by_id,
)


async def add_document_service(
    name: str, user_id: str, json_content: dict, date, db: Session
):
    try:
        add_document_db(name, user_id, json_content, date, db)
        return {"success": True, "message": "Document added successfully"}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}


async def get_user_documents_service(user_id: str, db: Session):
    try:
        user_documents = get_documents_db(user_id, db)
        return {"success": True, "data": user_documents}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}


async def update_document_service(
    id: int, name: str, user_id: str, json_content: dict, date, db: Session
):
    try:
        update_document_db(id, db, name, user_id, json_content, date)
        return {"success": True, "message": "Document updated successfully"}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}


async def get_latest_document_service(user_id: str, db: Session):
    try:
        user_documents = get_documents_db(user_id, db)
        if len(user_documents) == 0:
            add_document_db("Untitled", user_id, {}, datetime.today(), db)
        document = get_latest_document(user_id, db)
        return {"success": True, "data": document}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}


async def get_document_service(id: int, user_id: str, db: Session):
    try:
        document = get_document_by_id(id, user_id, db)
        return {"success": True, "data": document}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}

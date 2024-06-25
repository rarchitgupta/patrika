from sqlalchemy.orm import Session
from app.utils.log_config import logger
from .database import add_api_key_db, get_api_key_db


async def add_api_key_service(user_id: str, api_key: str, db: Session):
    try:
        add_api_key_db(user_id, api_key, db)
        return {"success": True, "message": "API key added successfully"}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}


async def get_api_key_service(user_id: str, db: Session):
    try:
        api_key = get_api_key_db(user_id, db)
        return {"success": True, "data": api_key}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}

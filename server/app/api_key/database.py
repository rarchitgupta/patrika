from cryptography.fernet import Fernet
from sqlalchemy.orm import Session
from app.api_key.models import ApiKey
from app.utils.log_config import logger
import os
from dotenv import load_dotenv

load_dotenv()


def get_cipher_suite():
    encryption_key = os.getenv("ENCRYPTION_KEY")
    if encryption_key is None:
        raise ValueError("ENCRYPTION_KEY environment variable not set.")
    return Fernet(encryption_key.encode())


def add_api_key_db(user_id: str, api_key: str, db: Session):
    cipher_suite = get_cipher_suite()
    encrypted_api_key = cipher_suite.encrypt(api_key.encode())
    # Check if an API key already exists for the user
    existing_api_key = db.query(ApiKey).filter(ApiKey.user_id == user_id).first()
    if existing_api_key:
        existing_api_key.api_key = encrypted_api_key
    else:
        api_key_db = ApiKey(user_id=user_id, api_key=encrypted_api_key)
        db.add(api_key_db)
    db.commit()


def get_api_key_db(user_id: str, db: Session):
    try:
        cipher_suite = get_cipher_suite()
        api_key_db = db.query(ApiKey).filter(ApiKey.user_id == user_id).first()
        if not api_key_db:
            return None
        api_key = cipher_suite.decrypt(api_key_db.api_key).decode()
        return api_key
    except Exception as e:
        logger.error(e)
        return None

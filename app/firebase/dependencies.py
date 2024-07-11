from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import firebase_admin
from firebase_admin import auth, credentials
import os
from ..utils.log_config import logger


json_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "./firebase.json"
)

security = HTTPBearer()


creds = credentials.Certificate(json_path)
firebase_admin.initialize_app(creds)


async def get_current_active_user_from_request(request: Request):
    authorization: str = await security(request)
    token = authorization.credentials
    decoded_token = verify_token(token)
    if not decoded_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return decoded_token


def verify_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        logger.error(e)
        return None


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise credentials_exception
    return decoded_token

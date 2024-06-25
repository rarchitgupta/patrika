from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.firebase.dependencies import get_current_user
from app.database import get_db
from .service import get_api_key_service, add_api_key_service

router = APIRouter()


@router.get("/api-key")
async def get_api_key(user=Depends(get_current_user), db: Session = Depends(get_db)):
    res = await get_api_key_service(user["uid"], db)
    if res["success"]:
        return res
    else:
        raise HTTPException(status_code=500, detail=res["message"])


@router.post("/api-key")
async def add_api_key(
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
    x_api_key: Annotated[str | None, Header()] = None,
):
    res = await add_api_key_service(user["uid"], x_api_key, db)
    if res["success"]:
        return res
    else:
        raise HTTPException(status_code=500, detail=res["message"])

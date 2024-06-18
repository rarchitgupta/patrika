from typing import Optional, Dict, List, Union, Any, AnyStr
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.firebase.dependencies import get_current_user
from app.database import get_db
from .service import (
    add_document_service,
    get_user_documents_service,
    update_document_service,
    get_latest_document_service,
    get_document_service,
)


router = APIRouter()

JSONObject = Dict[AnyStr, Any]
JSONArray = List[Any]
JSONStructure = Union[JSONArray, JSONObject]


class UpdateDocumentRequest(BaseModel):
    name: Optional[str] = None
    date: Optional[str] = None
    json_content: Optional[Any] = None


@router.post("/documents")
async def add_document(
    name: str,
    date: str,
    json_content: dict,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    res = await add_document_service(name, user["uid"], json_content, date, db)
    if res["success"]:
        return res
    else:
        raise HTTPException(status_code=500, detail=res["message"])


@router.get("/documents")
async def get_user_documents(
    user=Depends(get_current_user), db: Session = Depends(get_db)
):
    res = await get_user_documents_service(user["uid"], db)
    if res["success"]:
        return res["data"]
    else:
        raise HTTPException(status_code=500, detail=res["message"])


@router.put("/documents/{id}")
async def update_document(
    id: int,
    update_request: UpdateDocumentRequest,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    res = await update_document_service(
        id,
        update_request.name,
        user["uid"],
        update_request.json_content,
        update_request.date,
        db,
    )
    if res["success"]:
        return res
    else:
        raise HTTPException(status_code=500, detail=res["message"])


@router.get("/documents/latest")
async def get_latest_document(
    user=Depends(get_current_user), db: Session = Depends(get_db)
):
    res = await get_latest_document_service(user["uid"], db)
    if res["success"]:
        return res["data"]
    else:
        raise HTTPException(status_code=500, detail=res["message"])


@router.get("/documents/{id}")
async def get_document(
    id: int, user=Depends(get_current_user), db: Session = Depends(get_db)
):
    res = await get_document_service(id, user["uid"], db)
    if res["success"]:
        return res["data"]
    else:
        raise HTTPException(status_code=500, detail=res["message"])

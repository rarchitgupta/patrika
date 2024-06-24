from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Header, UploadFile
from sqlalchemy.orm import Session
from app.firebase.dependencies import get_current_user
from app.database import get_db
from app.sources.service import load_split_store_source, delete_source
from app.utils.file import is_pdf
from .database import get_sources

router = APIRouter()


@router.post("/sources")
async def load_and_process(
    file: UploadFile,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
    x_api_key: Annotated[str | None, Header()] = None,
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    if not await is_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    if not x_api_key:
        raise HTTPException(status_code=401, detail="No OpenAI API key provided")
    res = await load_split_store_source(file, user["uid"], db, x_api_key)
    if res["success"]:
        return res
    else:
        raise HTTPException(status_code=500, detail=res["message"])


@router.get("/sources")
async def get_user_sources(
    user=Depends(get_current_user), db: Session = Depends(get_db)
):
    sources = get_sources(user["uid"], db)
    return sources


@router.delete("/sources/{id}")
async def delete_context_source(
    id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
    x_api_key: Annotated[str | None, Header()] = None,
):
    res = await delete_source(id, user["uid"], db, x_api_key)
    if res["success"]:
        return res
    else:
        raise HTTPException(status_code=500, detail=res["message"])

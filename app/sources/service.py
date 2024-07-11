from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.llm.utils import get_embeddings
from app.sources.database import get_vector_ids, delete_db_source, add_source_db
from app.utils.log_config import logger
from .utils import load_doc, split_text
from .vectorstore import add_to_vectorstore, delete_from_vectorstore


async def load_split_store_source(
    file: UploadFile, user_id: str, db: Session
):
    try:
        docs, tmp_file_name = await load_doc(file, user_id)
        embeddings = get_embeddings()
        chunks, vector_ids = split_text(docs, embeddings)
        add_to_vectorstore(chunks)
        if docs:
            add_source_db(file.filename, tmp_file_name, user_id, vector_ids, db)
        return {"success": True, "message": "File loaded successfully"}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}


async def delete_source(id: int, user_id: str, db: Session):
    try:
        associated_vector_ids = get_vector_ids(user_id, id, db)
        delete_from_vectorstore(associated_vector_ids)
        delete_db_source(id, db)
        return {"success": True, "message": "Source deleted successfully"}
    except Exception as e:
        logger.error(e)
        return {"success": False, "message": str(e)}

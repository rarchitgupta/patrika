import aiofiles
import uuid
from tempfile import NamedTemporaryFile
from typing import List
from fastapi import UploadFile
from langchain.schema import Document
from langchain_community.document_loaders import UnstructuredPDFLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings
from app.utils.log_config import logger


async def load_doc(file: UploadFile, user_id: str) -> List[Document]:
    try:
        docs = None
        tmp_file_name = None
        with NamedTemporaryFile(suffix=".pdf") as tmp_file:
            tmp_file.write(await file.read())
            tmp_file_path = tmp_file_name = tmp_file.name
            loader = UnstructuredPDFLoader(tmp_file_path)
            docs = loader.load()
        for doc in docs:
            if not hasattr(doc, "metadata"):
                doc.metadata = {}
            doc.metadata["user_id"] = user_id
        return [docs, tmp_file_name]
    except Exception as e:
        logger.error(e)
        return None


def split_text(docs: List[Document], embeddings: OpenAIEmbeddings):
    vector_ids = []
    text_splitter = SemanticChunker(embeddings=embeddings)
    chunks = text_splitter.split_documents(docs)
    for idx, chunk in enumerate(chunks):
        vector_id = str(uuid.uuid4())
        chunks[idx].metadata["id"] = vector_id
        vector_ids.append(vector_id)
    return [chunks, vector_ids]

from typing import List
from langchain.schema import Document
from langchain_postgres import PGVector
from app.config import PG_COLLECTION_NAME, PG_CONNECTION_STRING
from app.llm.utils import get_embeddings


def add_to_vectorstore(chunks: List[Document]):
    embeddings = get_embeddings()
    vectorstore = get_vectorstore()
    vectorstore.add_documents(
        documents=chunks,
        embedding=embeddings,
    )


def delete_from_vectorstore(meta_source_name: str):
    vectorstore = get_vectorstore()
    vectorstore.delete(ids=[meta_source_name], collection_only=True)


def get_vectorstore():
    embeddings = get_embeddings()
    vectorstore = PGVector(
        collection_name=PG_COLLECTION_NAME,
        connection=PG_CONNECTION_STRING,
        embeddings=embeddings,
    )
    return vectorstore

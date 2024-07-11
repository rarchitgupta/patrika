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
        ids=[chunk.metadata["id"] for chunk in chunks],
    )


def delete_from_vectorstore(associated_vector_ids: List[str]):
    vectorstore = get_vectorstore()
    vectorstore.delete(associated_vector_ids)


def get_vectorstore():
    vectorstore = PGVector(
        collection_name=PG_COLLECTION_NAME,
        connection=PG_CONNECTION_STRING,
        embeddings=get_embeddings(),
    )
    return vectorstore

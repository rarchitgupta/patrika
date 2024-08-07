from typing import Optional, List
from app.sources.vectorstore import get_vectorstore
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableSerializable,
    RunnableConfig,
)
from langchain_core.documents import Document
from langchain_core.vectorstores import VectorStore


class PerUserQuery(RunnableSerializable):
    """
    A custom runnable that returns a list of documents for the given user.

    The runnable is configurable by the user, and the search results are
    filtered by the user ID.
    """

    user_id: Optional[str]
    vectorstore: Optional[VectorStore]

    class Config:
        # Allow arbitrary types since VectorStore is an abstract interface
        # and not a pydantic model
        arbitrary_types_allowed = True

    def get_rag_chain(self, query):
        self.vectorstore = get_vectorstore()
        retriever = self.vectorstore.similarity_search(
            query, k=5, filter={"user_id": {"$eq": self.user_id}}
        )

        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)

        return {
            "context": format_docs(retriever),
            "question": RunnablePassthrough(),
        }

    def invoke(
        self, input: str, config: Optional[RunnableConfig] = None, **kwargs
    ) -> List[Document]:
        retriever = self.get_rag_chain(query=input)
        return retriever
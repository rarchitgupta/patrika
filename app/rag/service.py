import os
from typing import Dict
from app.config import LLM_MODEL
from fastapi import HTTPException, Request
from langchain import hub
from langchain_core.runnables import ConfigurableField
from langchain_core.output_parsers import StrOutputParser
from app.firebase.dependencies import get_current_active_user_from_request
from langchain_openai import ChatOpenAI
from .rag_chain import PerUserQuery, OpenAIChatLLM


async def per_req_config_modifier(config: Dict, request: Request) -> Dict:
    """
    Modify the config for each request
    """
    user = await get_current_active_user_from_request(request)
    openai_api_key = ""
    if "x-api-key" in request.headers:
        openai_api_key = request.headers["x-api-key"]
        os.environ["OPENAI_API_KEY"] = openai_api_key
    else:
        os.environ["OPENAI_API_KEY"] = ""
        raise HTTPException(401, "No OpenAI API key provided")
    # Attention: Make sure that the user ID is over-ridden for each request.
    # We should not be accepting a user ID from the user in this case!
    config["configurable"]["user_id"] = user["uid"]
    config["configurable"]["openai_api_key"] = openai_api_key
    config["configurable"]["embeddings_api_key"] = openai_api_key
    return config


per_user_retriever = PerUserQuery(
    user_id=None,  # Placeholder ID that will be replaced by the per_req_config_modifier
    embeddings_api_key=None,
    vectorstore=None,
).configurable_fields(
    user_id=ConfigurableField(
        id="user_id",
        name="User ID",
        description="The user ID to use for the retriever",
    ),
    embeddings_api_key=ConfigurableField(
        id="embeddings_api_key",
        name="Embeddings API Key",
        description="The embeddings API key to use for the retriever",
    ),
    vectorstore=ConfigurableField(
        id="vectorstore",
        name="Vectorstore",
        description="The vectorstore to use for the retriever",
    ),
)

llm = ChatOpenAI(openai_api_key="placeholder_key").configurable_fields(
    openai_api_key=ConfigurableField(
        id="openai_api_key",
        name="OpenAI API Key",
        description=("API Key for OpenAI interactions"),
    ),
)

prompt = hub.pull("rlm/rag-prompt")

chain = per_user_retriever | prompt | llm | StrOutputParser()

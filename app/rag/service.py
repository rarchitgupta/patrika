import os
from typing import Dict
from fastapi import Request
from langchain import hub
from langchain_core.runnables import ConfigurableField
from langchain_core.output_parsers import StrOutputParser
from app.firebase.dependencies import get_current_active_user_from_request
from .rag_chain import PerUserQuery
from app.llm.utils import get_llm


async def per_req_config_modifier(config: Dict, request: Request) -> Dict:
    """
    Modify the config for each request
    """
    user = await get_current_active_user_from_request(request)
    # Attention: Make sure that the user ID is over-ridden for each request.
    # We should not be accepting a user ID from the user in this case!
    config["configurable"]["user_id"] = user["uid"]
    return config


per_user_retriever = PerUserQuery(
    user_id=None,  # Placeholder ID that will be replaced by the per_req_config_modifier
    vectorstore=None,
).configurable_fields(
    user_id=ConfigurableField(
        id="user_id",
        name="User ID",
        description="The user ID to use for the retriever",
    ),
    vectorstore=ConfigurableField(
        id="vectorstore",
        name="Vectorstore",
        description="The vectorstore to use for the retriever",
    ),
)

llm = get_llm()

prompt = hub.pull("rlm/rag-prompt")

chain = per_user_retriever | prompt | llm | StrOutputParser()

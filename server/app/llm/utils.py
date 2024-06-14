from langchain_openai import ChatOpenAI, OpenAIEmbeddings
import os
from dotenv import load_dotenv
from app.config import LLM_MODEL

load_dotenv()


def get_embeddings():
    openai_embeddings = OpenAIEmbeddings(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )
    return openai_embeddings


def get_llm():
    llm = ChatOpenAI(api_key=os.environ.get("OPENAI_API_KEY"), model=LLM_MODEL)
    return llm

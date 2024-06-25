from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from dotenv import load_dotenv
from app.config import LLM_MODEL

load_dotenv()


def get_embeddings(openai_api_key: str):
    openai_embeddings = OpenAIEmbeddings(
        api_key=openai_api_key,
    )
    return openai_embeddings


def get_llm(openai_api_key: str):
    llm = ChatOpenAI(api_key=openai_api_key, model=LLM_MODEL)
    return llm

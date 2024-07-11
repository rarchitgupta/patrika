from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from app.config import LLM_MODEL, EMBEDDING_MODEL

load_dotenv()


def get_embeddings():
    gemini_embeddings = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL)
    return gemini_embeddings


def get_llm():
    llm = ChatGoogleGenerativeAI(model=LLM_MODEL)
    return llm

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes
from .rag.service import per_req_config_modifier, chain
from .sources.router import router as sources_router
from .documents.router import router as documents_router
from .api_key.router import router as api_key_router
from .database import Base, engine


app = FastAPI()
app.include_router(sources_router)
app.include_router(documents_router)
app.include_router(api_key_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # Create tables
    Base.metadata.create_all(bind=engine)


add_routes(
    app,
    chain,
    per_req_config_modifier=per_req_config_modifier,
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

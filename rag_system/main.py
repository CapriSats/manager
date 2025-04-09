# from fastapi import FastAPI
# from rag_system.container import Container
# from rag_system.api import composer_service, execution_service, indexer_service

# app = FastAPI()
# container = Container()
# container.config.db_connection_string.from_env("DB_CONNECTION_STRING")
# app.include_router(composer_service.router)
# app.include_router(execution_service.router)
# app.include_router(indexer_service.router)
#
# if __name__ == "main":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8111)


from fastapi import FastAPI
from rag_system.config import container
from rag_system.api import composer_service, execution_service, indexer_service

app = FastAPI()

# Wire the container to the API routes
container.wire(modules=[composer_service, execution_service, indexer_service])

app.include_router(composer_service.router, prefix="/api/composer", tags=["composer"])
app.include_router(execution_service.router, prefix="/api/execution", tags=["execution"])
app.include_router(indexer_service.router, prefix="/api/indexer", tags=["indexer"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8111)

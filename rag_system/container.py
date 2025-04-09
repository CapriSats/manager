import json
from typing import Dict, Any

from fastapi import FastAPI, Depends
from dependency_injector import containers, providers
from dependency_injector.wiring import inject, Provide

from core.PipelineManager import PipelineManager
from rag_system.persistence.couchbase_repo import CouchbaseRepo
from rag_system.composition.pipeline_composer import PipelineComposer
# from rag_system.execution.pipeline_manager import PipelineManager
from rag_system.indexing.rag_indexer import RAGIndexer


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    metadata_repository = providers.Singleton(
        CouchbaseRepo,
        connection_string=config.db_connection_string
    )

    pipeline_composer = providers.Factory(
        PipelineComposer,
        metadata_repository=metadata_repository
    )

    pipeline_manager = providers.Factory(
        PipelineManager,
        metadata_repository=metadata_repository
    )

    rag_indexer = providers.Factory(
        RAGIndexer,
        metadata_repository=metadata_repository
    )


app = FastAPI()
container = Container()
container.config.db_connection_string.from_env("DB_CONNECTION_STRING")


@app.post("/pipelines/")
@inject
async def create_pipeline(pipeline: Dict[str, Any],
                          composer: PipelineComposer = Depends(Provide[Container.pipeline_composer])):
    composed_pipeline = composer.compose_pipeline(pipeline)
    pipeline_id = f"pipeline_{composed_pipeline['name'].lower().replace(' ', '_')}"
    success = composer.persist_pipeline(pipeline_id, composed_pipeline)
    return {"success": success, "pipeline_id": pipeline_id}


@app.get("/pipelines/{pipeline_id}")
@inject
async def get_pipeline(pipeline_id: str, composer: PipelineComposer = Depends(Provide[Container.pipeline_composer])):
    pipeline = composer.load_pipeline(pipeline_id)
    if pipeline:
        return pipeline
    return {"error": "Pipeline not found"}


# For AWS Lambda
def lambda_handler(event, context):
    container = Container()
    container.config.db_connection_string.from_env("DB_CONNECTION_STRING")
    composer = container.pipeline_composer()

    # Example: Create a pipeline
    if event['httpMethod'] == 'POST' and event['path'] == '/pipelines':
        pipeline_def = json.loads(event['body'])
        composed_pipeline = composer.compose_pipeline(pipeline_def)
        pipeline_id = f"pipeline_{composed_pipeline['name'].lower().replace(' ', '_')}"
        success = composer.persist_pipeline(pipeline_id, composed_pipeline)
        return {
            'statusCode': 200,
            'body': json.dumps({"success": success, "pipeline_id": pipeline_id})
        }

    # Add more handlers for other operations

    return {
        'statusCode': 404,
        'body': json.dumps('Not Found')
    }
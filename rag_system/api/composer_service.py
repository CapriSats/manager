from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from rag_system.composition.pipeline_composer import PipelineComposer

router = APIRouter()


class PipelineDefinition(BaseModel):
    name: str
    description: str
    elements: List[str]


def get_pipeline_composer():
    # This would typically be handled by dependency injection
    # For now, we'll just create a new instance each time
    return PipelineComposer()


@router.post("/pipelines")
async def create_pipeline(pipeline: PipelineDefinition, composer: PipelineComposer = Depends(get_pipeline_composer)):
    try:
        pipeline_id = composer.compose_pipeline(pipeline.dict())
        return {"pipeline_id": pipeline_id, "message": "Pipeline created successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/pipelines/{pipeline_id}")
async def get_pipeline(pipeline_id: str, composer: PipelineComposer = Depends(get_pipeline_composer)):
    pipeline = composer.load_pipeline(pipeline_id)
    if pipeline is None:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline


@router.get("/pipelines")
async def list_pipelines(composer: PipelineComposer = Depends(get_pipeline_composer)):
    return composer.list_pipelines()

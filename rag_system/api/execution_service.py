# rag_system/api/execution_service.py

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import Dict, Any
from pydantic import BaseModel
from rag_system.execution.pipeline_manager import PipelineManager
# from core.PipelineManager import PipelineManager

router = APIRouter()


class ExecutionRequest(BaseModel):
    pipeline_id: str
    context: Dict[str, Any]


def get_pipeline_manager():
    # This would typically be handled by dependency injection
    return PipelineManager()


@router.post("/execute")
async def execute_pipeline(request: ExecutionRequest, background_tasks: BackgroundTasks,
                           manager: PipelineManager = Depends(get_pipeline_manager)):
    try:
        # Start execution in the background
        background_tasks.add_task(manager.execute_pipeline, request.pipeline_id, request.context)
        return {"message": "Pipeline execution started", "pipeline_id": request.pipeline_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/execution-status/{execution_id}")
async def get_execution_status(execution_id: str, manager: PipelineManager = Depends(get_pipeline_manager)):
    status = manager.get_execution_status(execution_id)
    if status is None:
        raise HTTPException(status_code=404, detail="Execution not found")
    return status

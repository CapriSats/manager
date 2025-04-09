# rag_system/api/indexer_service.py

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List
from pydantic import BaseModel
from rag_system.indexing.indexing_state_manager import IndexingStateManager, IndexingStatus

router = APIRouter()


class IndexingRequest(BaseModel):
    file_paths: List[str]


def get_indexing_state_manager():
    # This would typically be handled by dependency injection
    return IndexingStateManager()


@router.post("/index")
async def index_files(request: IndexingRequest, background_tasks: BackgroundTasks,
                      manager: IndexingStateManager = Depends(get_indexing_state_manager)):
    job_id = manager.create_indexing_job(request.file_paths)
    background_tasks.add_task(process_indexing_job, job_id, manager)
    return {"job_id": job_id, "message": "Indexing job created and started"}


@router.get("/indexing-status/{job_id}")
async def get_indexing_status(job_id: str, manager: IndexingStateManager = Depends(get_indexing_state_manager)):
    try:
        return manager.get_indexing_status(job_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/indexing-jobs")
async def get_all_indexing_jobs(manager: IndexingStateManager = Depends(get_indexing_state_manager)):
    return manager.get_all_jobs()


async def process_indexing_job(job_id: str, manager: IndexingStateManager):
    # This function would contain the logic to process each file in the indexing job
    # It would update the job status as it progresses
    pass

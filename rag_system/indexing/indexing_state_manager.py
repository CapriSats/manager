# rag_system/indexing/indexing_state_manager.py

from enum import Enum
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from rag_system.core.interfaces import IMetadataRepository


class IndexingStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


class IndexingStateManager:
    def __init__(self, metadata_repository: IMetadataRepository):
        self.metadata_repository = metadata_repository
        self.indexing_metadata_key = "indexing_metadata"

    def create_indexing_job(self, files: List[str]) -> str:
        job_id = str(uuid.uuid4())
        job_metadata = {
            "job_id": job_id,
            "start_time": datetime.utcnow().isoformat(),
            "status": IndexingStatus.PENDING.value,
            "files": [{"file_path": file, "status": IndexingStatus.PENDING.value} for file in files],
            "total_files": len(files),
            "completed_files": 0,
            "failed_files": 0
        }
        self.metadata_repository.insert_document(f"{self.indexing_metadata_key}:{job_id}", job_metadata)
        return job_id

    def update_file_status(self, job_id: str, file_path: str, status: IndexingStatus, error_message: Optional[str] = None):
        job_metadata = self.metadata_repository.get_document(f"{self.indexing_metadata_key}:{job_id}")
        if not job_metadata:
            raise ValueError(f"No indexing job found with id {job_id}")

        for file in job_metadata["files"]:
            if file["file_path"] == file_path:
                file["status"] = status.value
                file["last_updated"] = datetime.utcnow().isoformat()
                if error_message:
                    file["error_message"] = error_message

        job_metadata["completed_files"] = sum(1 for file in job_metadata["files"] if file["status"] == IndexingStatus.COMPLETED.value)
        job_metadata["failed_files"] = sum(1 for file in job_metadata["files"] if file["status"] == IndexingStatus.FAILED.value)

        if job_metadata["completed_files"] + job_metadata["failed_files"] == job_metadata["total_files"]:
            job_metadata["status"] = IndexingStatus.COMPLETED.value
            job_metadata["end_time"] = datetime.utcnow().isoformat()

        self.metadata_repository.insert_document(f"{self.indexing_metadata_key}:{job_id}", job_metadata)

    def get_indexing_status(self, job_id: str) -> Dict[str, Any]:
        job_metadata = self.metadata_repository.get_document(f"{self.indexing_metadata_key}:{job_id}")
        if not job_metadata:
            raise ValueError(f"No indexing job found with id {job_id}")
        return job_metadata

    def get_pending_files(self, job_id: str) -> List[str]:
        job_metadata = self.get_indexing_status(job_id)
        return [file["file_path"] for file in job_metadata["files"] if file["status"] == IndexingStatus.PENDING.value]

    def get_all_jobs(self) -> List[Dict[str, Any]]:
        # This method assumes that the metadata_repository has a method to query keys with a prefix
        # If not, you may need to implement a different approach to list all jobs
        job_keys = self.metadata_repository.query_keys(f"{self.indexing_metadata_key}:")
        return [self.metadata_repository.get_document(key) for key in job_keys]

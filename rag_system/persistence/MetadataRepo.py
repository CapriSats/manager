import json
import os
from typing import Dict, Any, List
from rag_system.core.interfaces import IMetadataRepository


class FileBasedMetadataRepo(IMetadataRepository):
    def __init__(self, base_path: str):
        self.base_path = base_path
        os.makedirs(self.base_path, exist_ok=True)

    def get_document(self, document_id: str) -> Dict[str, Any]:
        file_path = os.path.join(self.base_path, f"{document_id}.json")
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {}

    def insert_document(self, document_id: str, content: Dict[str, Any]) -> bool:
        file_path = os.path.join(self.base_path, f"{document_id}.json")
        try:
            with open(file_path, 'w') as f:
                json.dump(content, f)
            return True
        except Exception as e:
            print(f"Error inserting document: {str(e)}")
            return False

    def query_keys(self, prefix: str) -> List[str]:
        return [f.split('.')[0] for f in os.listdir(self.base_path) if f.startswith(prefix) and f.endswith('.json')]
from abc import ABC, abstractmethod
from typing import List, Dict, Any


class IMetadataRepository(ABC):
    @abstractmethod
    def get_document(self, document_id: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def insert_document(self, document_id: str, content: Dict[str, Any]) -> bool:
        pass

    @abstractmethod
    def query_keys(self, prefix: str) -> List[str]:
        pass
from typing import Dict, Any, List, Optional
from abc import ABC, abstractmethod
from rag_system.core.interfaces import IMetadataRepository


class IndexStrategy(ABC):
    @abstractmethod
    def index_document(self, document: Dict[str, Any]) -> bool:
        pass

    @abstractmethod
    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        pass


class VectorStoreStrategy(IndexStrategy):
    def index_document(self, document: Dict[str, Any]) -> bool:
        # Implement vector store indexing
        pass

    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        # Implement vector store search
        pass


class KnowledgeGraphStrategy(IndexStrategy):
    def index_document(self, document: Dict[str, Any]) -> bool:
        # Implement knowledge graph indexing
        pass

    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        # Implement knowledge graph search
        pass


class RAGIndexer:
    def __init__(self, metadata_repository: IMetadataRepository):
        self.metadata_repository = metadata_repository
        self.index_strategies: Dict[str, IndexStrategy] = {
            "vector_store": VectorStoreStrategy(),
            "knowledge_graph": KnowledgeGraphStrategy()
        }
        self.default_strategy = "vector_store"

    def index_document(self, document: Dict[str, Any], strategy: Optional[str] = None) -> bool:
        if strategy is None:
            strategy = self.default_strategy

        if strategy not in self.index_strategies:
            raise ValueError(f"Unknown indexing strategy: {strategy}")

        try:
            # Preprocess the document if needed
            processed_document = self._preprocess_document(document)

            # Index the document using the selected strategy
            success = self.index_strategies[strategy].index_document(processed_document)

            if success:
                # Update metadata to record that this document has been indexed
                self._update_index_metadata(document["id"], strategy)

            return success
        except Exception as e:
            print(f"Error indexing document: {str(e)}")
            return False

    def search(self, query: str, strategy: Optional[str] = None, top_k: int = 5) -> List[Dict[str, Any]]:
        if strategy is None:
            strategy = self.default_strategy

        if strategy not in self.index_strategies:
            raise ValueError(f"Unknown indexing strategy: {strategy}")

        try:
            return self.index_strategies[strategy].search(query, top_k)
        except Exception as e:
            print(f"Error searching index: {str(e)}")
            return []

    def _preprocess_document(self, document: Dict[str, Any]) -> Dict[str, Any]:
        # Implement any necessary preprocessing steps
        # This could include text extraction, normalization, etc.
        return document

    def _update_index_metadata(self, document_id: str, strategy: str):
        metadata_key = f"index_metadata::{document_id}"
        existing_metadata = self.metadata_repository.get_document(metadata_key) or {}
        existing_metadata[strategy] = {"indexed": True, "timestamp": self._get_current_timestamp()}
        self.metadata_repository.insert_document(metadata_key, existing_metadata)

    @staticmethod
    def _get_current_timestamp():
        from datetime import datetime
        return datetime.utcnow().isoformat()

    def get_index_status(self, document_id: str) -> Dict[str, Any]:
        metadata_key = f"index_metadata::{document_id}"
        return self.metadata_repository.get_document(metadata_key) or {}

    def add_index_strategy(self, name: str, strategy: IndexStrategy):
        self.index_strategies[name] = strategy

    def set_default_strategy(self, strategy: str):
        if strategy not in self.index_strategies:
            raise ValueError(f"Unknown indexing strategy: {strategy}")
        self.default_strategy = strategy
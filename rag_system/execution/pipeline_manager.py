import yaml
import importlib
from threading import local
import logging
from typing import Dict, Any

from dependency_injector.wiring import inject, Provide

from rag_system.core.interfaces import IMetadataRepository
from rag_system.indexing.rag_indexer import RAGIndexer
from rag_system.core.exceptions import PipelineException

class PipelineManager:
    @inject
    def __init__(self, metadata_repository: IMetadataRepository, rag_indexer: RAGIndexer):
        self.logger = logging.getLogger(__name__)
        self.metadata_repository = metadata_repository
        self.rag_indexer = rag_indexer
        self.thread_context = local()
        self.module_cache = {}

    def load_pipeline(self, pipeline_id: str) -> Dict[str, Any]:
        pipeline_yaml = self.metadata_repository.get_document(f"pipeline::{pipeline_id}")
        if not pipeline_yaml:
            raise PipelineException(f"Pipeline with id {pipeline_id} not found")
        return yaml.safe_load(pipeline_yaml)

    def execute_pipeline(self, pipeline_id: str, context: Dict[str, Any]):
        self.thread_context.data = context.copy()
        pipeline_config = self.load_pipeline(pipeline_id)

        for module_path in pipeline_config.get('elements', []):
            self.logger.info(f"Executing {module_path}")

            try:
                module = self._import_module(module_path)
                if hasattr(module, 'execute'):
                    should_continue = module.execute(self.thread_context.data)
                    if should_continue is False:
                        self.logger.info("Pipeline execution stopped by module")
                        break
                else:
                    self.logger.warning(f"Module {module_path} does not have an 'execute' method")

            except PipelineException as pex:
                self.logger.exception(pex)
                break
            except Exception as e:
                self.logger.error(f"Error executing {module_path}: {str(e)}")
                raise

        # After pipeline execution, index the processed document
        self._index_processed_document()

    def _import_module(self, module_path):
        if module_path not in self.module_cache:
            module_parts = module_path.split('.')
            class_name = module_parts[-1]
            module_name = '.'.join(module_parts[:-1])

            module = importlib.import_module(module_name)
            class_ = getattr(module, class_name)
            self.module_cache[module_path] = class_()

        return self.module_cache[module_path]

    def _index_processed_document(self):
        document = self.thread_context.data.get('processed_document')
        if document:
            success = self.rag_indexer.index_document(document)
            if not success:
                self.logger.error("Failed to index the processed document")
        else:
            self.logger.warning("No processed document found in context for indexing")

    def get_result(self):
        return self.thread_context.data

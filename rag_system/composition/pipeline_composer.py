from typing import Dict, Any, List
import yaml
import jsonschema
from rag_system.core.interfaces import IMetadataRepository


class PipelineComposer:
    def __init__(self):
        self.pipelines_list_key = None
        self.pipeline_schema = None
        self.metadata_repository = None

    def init(self, metadata_repository: IMetadataRepository):
        self.metadata_repository = metadata_repository
        self.pipeline_schema = self._load_pipeline_schema()
        self.pipelines_list_key = "pipelines_list"

    def compose_pipeline(self, pipeline_definition: Dict[str, Any]) -> Dict[str, Any]:
        # Ensure the pipeline has all required components
        required_components = ['name', 'description', 'elements']
        for component in required_components:
            if component not in pipeline_definition:
                raise ValueError(f"Missing required component: {component}")

        # Validate each pipeline element
        for element in pipeline_definition['elements']:
            if 'type' not in element or 'config' not in element:
                raise ValueError(f"Invalid element structure: {element}")

        # Additional composition logic (e.g., resolving element dependencies)

        # Validate the entire pipeline
        if not self.validate_pipeline(pipeline_definition):
            raise ValueError("Invalid pipeline composition")

        return pipeline_definition

    def validate_pipeline(self, pipeline_definition: Dict[str, Any]) -> bool:
        try:
            jsonschema.validate(instance=pipeline_definition, schema=self.pipeline_schema)
            return True
        except jsonschema.exceptions.ValidationError:
            return False

    def persist_pipeline(self, pipeline_id: str, pipeline_definition: Dict[str, Any]) -> bool:
        try:
            if isinstance(pipeline_definition, str):
                pipeline_definition = self._yaml_to_json(pipeline_definition)

            if not self.validate_pipeline(pipeline_definition):
                raise ValueError("Invalid pipeline definition")

            success = self.metadata_repository.insert_document(f"pipeline::{pipeline_id}", pipeline_definition)
            if success:
                self._update_pipelines_list(pipeline_id, add=True)
            return success
        except Exception as e:
            print(f"Error persisting pipeline: {str(e)}")
            return False

    def load_pipeline(self, pipeline_id: str) -> str:
        try:
            pipeline_json = self.metadata_repository.get_document(f"pipeline::{pipeline_id}")
            return self._json_to_yaml(pipeline_json)
        except Exception as e:
            print(f"Error loading pipeline: {str(e)}")
            return ""

    def list_pipelines(self) -> List[str]:
        try:
            pipelines_list = self.metadata_repository.get_document(self.pipelines_list_key)
            return pipelines_list.get("pipelines", [])
        except Exception as e:
            print(f"Error listing pipelines: {str(e)}")
            return []

    def _update_pipelines_list(self, pipeline_id: str, add: bool = True):
        pipelines_list = self.metadata_repository.get_document(self.pipelines_list_key) or {"pipelines": []}
        if add:
            if pipeline_id not in pipelines_list["pipelines"]:
                pipelines_list["pipelines"].append(pipeline_id)
        else:
            pipelines_list["pipelines"] = [pid for pid in pipelines_list["pipelines"] if pid != pipeline_id]
        self.metadata_repository.insert_document(self.pipelines_list_key, pipelines_list)

    def _load_pipeline_schema(self) -> dict:
        # Load the schema from a file or define it inline
        return {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "description": {"type": "string"},
                "elements": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "type": {"type": "string"},
                            "config": {"type": "object"}
                        },
                        "required": ["type", "config"]
                    }
                }
            },
            "required": ["name", "description", "elements"]
        }

    @staticmethod
    def _yaml_to_json(self, yaml_string: str) -> dict:
        return yaml.safe_load(yaml_string)

    @staticmethod
    def _json_to_yaml(self, json_dict: dict) -> str:
        return yaml.dump(json_dict, default_flow_style=False)
    #
    # # Initialize the PipelineComposer
    # composer = PipelineComposer(couchbase_repo)
    #
    # # Create a pipeline definition
    # pipeline_def = {
    #     "name": "Document Processing Pipeline",
    #     "description": "Processes and indexes documents",
    #     "elements": [
    #         {"type": "document_parser", "config": {"parser_type": "pdf"}},
    #         {"type": "text_extractor", "config": {"language": "en"}},
    #         {"type": "vector_indexer", "config": {"model": "bert-base-uncased"}}
    #     ]
    # }
    #
    # # Compose and validate the pipeline
    # composed_pipeline = composer.compose_pipeline(pipeline_def)
    #
    # # Persist the pipeline
    # composer.persist_pipeline("doc_processing_001", composed_pipeline)
    #
    # # Load the pipeline
    # loaded_pipeline = composer.load_pipeline("doc_processing_001")
    #
    # # List all pipelines
    # pipeline_ids = composer.list_pipelines()
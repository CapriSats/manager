from rag_system.core.pipeline_element import PipelineElement
from typing import Dict, Any


class DocParserHandler(PipelineElement):
    def execute(self, context: Dict[str, Any]) -> bool:
        document = context.get('document')
        if not document:
            print("No document found in context")
            return False

        # Determine the document type and select appropriate parser
        doc_type = self._determine_doc_type(document)
        context['doc_type'] = doc_type
        context['parser'] = self._get_parser(doc_type)

        return True

    def _determine_doc_type(self, document: Dict[str, Any]) -> str:
        # Logic to determine document type (e.g., based on file extension or content)
        # This is a placeholder implementation
        return document.get('file_type', 'unknown')

    def _get_parser(self, doc_type: str) -> Any:
        # Logic to return appropriate parser based on doc_type
        # This is a placeholder implementation
        parser_map = {
            'pdf': 'PDFParser',
            'docx': 'DocxParser',
            'txt': 'TextParser'
        }
        return parser_map.get(doc_type, 'GenericParser')

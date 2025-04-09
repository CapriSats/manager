from rag_system.core.pipeline_element import PipelineElement
from typing import Dict, Any


class IndexCheck(PipelineElement):
    def execute(self, context: Dict[str, Any]) -> bool:
        indexed_document = context.get('indexed_document')
        if not indexed_document:
            print("No indexed document found in context")
            return False

        # Perform sanity checks on the indexed document
        check_result = self._perform_checks(indexed_document)
        context['index_check_result'] = check_result

        return check_result['passed']

    def _perform_checks(self, indexed_document: Dict[str, Any]) -> Dict[str, Any]:
        # Logic to perform sanity checks on the indexed document
        # This is a placeholder implementation
        checks_passed = (
            indexed_document.get('vector_id') is not None and
            indexed_document.get('graph_id') is not None and
            indexed_document.get('index_status') == 'completed'
        )

        return {
            'passed': checks_passed,
            'message': 'All checks passed' if checks_passed else 'Some checks failed'
        }


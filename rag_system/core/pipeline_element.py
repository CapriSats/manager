from abc import ABC, abstractmethod
from typing import Dict, Any


class PipelineElement(ABC):
    @abstractmethod
    def execute(self, context: Dict[str, Any]) -> bool:
        pass
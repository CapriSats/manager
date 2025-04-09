# rag_system/core/exceptions.py

class PipelineException(Exception):
    """Custom exception class for pipeline-related errors."""

    def __init__(self, message: str, step: str = None, details: dict = None):
        self.message = message
        self.step = step
        self.details = details or {}
        super().__init__(self.message)

    def __str__(self):
        error_msg = f"Pipeline Error: {self.message}"
        if self.step:
            error_msg += f" (Step: {self.step})"
        if self.details:
            error_msg += f" - Details: {self.details}"
        return error_msg

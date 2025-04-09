# rag_system/config.py

from dotenv import load_dotenv
import os
from dependency_injector import containers, providers
from rag_system.indexing.indexing_state_manager import IndexingStateManager, IndexingStatus
from rag_system.persistence.couchbase_repo import CouchbaseRepo  # Or your chosen repository implementation

# Load the .env file
load_dotenv()


class AppContainer(containers.DeclarativeContainer):
    config = providers.Configuration()

    # Load configuration from environment variables
    config.db_connection_string.from_env("DB_CONNECTION_STRING")
    config.db_username.from_env("DB_USERNAME")
    config.db_password.from_env("DB_PASSWORD")
    config.db_bucket_name.from_env("DB_BUCKET_NAME")

    # Define other dependencies here
    metadata_repository = providers.Singleton(
        CouchbaseRepo,
        connection_string=config.db_connection_string,
        username=config.db_username,
        password=config.db_password,
        bucket_name=config.db_bucket_name
    )

    indexing_state_manager = providers.Factory(
        IndexingStateManager,
        metadata_repository=metadata_repository
    )

    # Add other dependencies as needed


# Create and configure the container
container = AppContainer()

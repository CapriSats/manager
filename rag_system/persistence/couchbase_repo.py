from typing import Dict, Any, List
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions
from couchbase.auth import PasswordAuthenticator
from couchbase.exceptions import DocumentNotFoundException
from rag_system.core.interfaces import IMetadataRepository


class CouchbaseRepo(IMetadataRepository):
    def __init__(self, connection_string: str, username: str, password: str, bucket_name: str):
        auth = PasswordAuthenticator(username, password)
        cluster = Cluster.connect(connection_string, ClusterOptions(auth))
        self.bucket = cluster.bucket(bucket_name)
        self.collection = self.bucket.default_collection()

    def get_document(self, document_id: str) -> Dict[str, Any]:
        try:
            result = self.collection.get(document_id)
            return result.content_as[dict]
        except DocumentNotFoundException:
            return {}
        except Exception as e:
            print(f"Error retrieving document {document_id}: {str(e)}")
            return {}

    def insert_document(self, document_id: str, content: Dict[str, Any]) -> bool:
        try:
            self.collection.upsert(document_id, content)
            return True
        except Exception as e:
            print(f"Error inserting document {document_id}: {str(e)}")
            return False

    def query_keys(self, prefix: str) -> List[str]:
        query = f"SELECT META().id FROM `{self.bucket.name}` WHERE META().id LIKE $prefix"
        try:
            result = self.bucket.query(query, prefix=f"{prefix}%")
            return [row['id'] for row in result]
        except Exception as e:
            print(f"Error querying keys with prefix {prefix}: {str(e)}")
            return []

    def update_document(self, document_id: str, content: Dict[str, Any]) -> bool:
        return self.insert_document(document_id, content)

    def delete_document(self, document_id: str) -> bool:
        try:
            self.collection.remove(document_id)
            return True
        except Exception as e:
            print(f"Error deleting document {document_id}: {str(e)}")
            return False
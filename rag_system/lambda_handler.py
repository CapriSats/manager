# rag_system/lambda_handler.py

import json
import os

from rag_system.indexing.indexing_state_manager import IndexingStateManager, IndexingStatus
from rag_system.persistence.couchbase_repo import CouchbaseRepo  # Or your chosen repository implementation


def lambda_handler(event, context):
    # Initialize your metadata repository
    metadata_repo = CouchbaseRepo(
        connection_string=os.environ['COUCHBASE_CONNECTION_STRING'],
        username=os.environ['COUCHBASE_USERNAME'],
        password=os.environ['COUCHBASE_PASSWORD'],
        bucket_name=os.environ['COUCHBASE_BUCKET_NAME']
    )

    # Initialize the IndexingStateManager
    indexing_manager = IndexingStateManager(metadata_repo)

    # Route the request based on the event
    http_method = event['httpMethod']
    path = event['path']

    if http_method == 'POST' and path == '/index':
        body = json.loads(event['body'])
        job_id = indexing_manager.create_indexing_job(body['file_paths'])
        return {
            'statusCode': 200,
            'body': json.dumps({'job_id': job_id, 'message': 'Indexing job created'})
        }

    elif http_method == 'GET' and path.startswith('/indexing-status/'):
        job_id = path.split('/')[-1]
        try:
            status = indexing_manager.get_indexing_status(job_id)
            return {
                'statusCode': 200,
                'body': json.dumps(status)
            }
        except ValueError as e:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': str(e)})
            }

    elif http_method == 'GET' and path == '/indexing-jobs':
        jobs = indexing_manager.get_all_jobs()
        return {
            'statusCode': 200,
            'body': json.dumps(jobs)
        }

    else:
        return {
            'statusCode': 404,
            'body': json.dumps({'error': 'Not found'})
        }

from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_generate():
    response = client.get('/api/generate?utterance=hello')
    assert response.status_code == 200

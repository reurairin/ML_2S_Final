from fastapi.testclient import TestClient
from io import BytesIO
from app import app

client = TestClient(app)


def test_generate():
    response = client.get('/api/generate?utterance=hello')
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "audio/wav"
    assert isinstance(BytesIO(response.content).read(), bytes)

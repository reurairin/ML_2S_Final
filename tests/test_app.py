from fastapi.testclient import TestClient
from io import BytesIO
from app import app

client = TestClient(app)

def test_root():
    response = client.get('/')
    assert response.status_code == 200

def test_generate():
    response = client.get('/api/generate?utterance=hello')
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "audio/wav"
    assert isinstance(BytesIO(response.content).read(), bytes)

def test_describe():
    response = client.get('/about-team')
    assert response.status_code == 200
    assert response.json() == {
        'name': 'Cobra Kai',
        'members': [
            { 'full_name': 'Danil Makushev', 'role': 'developer', 'img': '/image/Danil.jpg' },
            { 'full_name': 'Evgenia Prasolova', 'role': 'analyst', 'img': '/image/Evgenia.jpg' },
            { 'full_name': 'Semen Bakulin', 'role': 'developer', 'img': '/image/Semen.jpg' },
            { 'full_name': 'Denis Tryapitsyn', 'role': 'project manager', 'img': '/image/Denis.jpg' }
        ]
    }


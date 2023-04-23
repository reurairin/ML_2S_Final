from fastapi import FastAPI, Response
from pydantic import BaseModel

from generate_speech_service import GenerateSpeechService


class GenerateSpeechRequest(BaseModel):
    utterance: str


_service = GenerateSpeechService()
app = FastAPI()


@app.post("/api/generate", response_class=Response)
async def generate_speech(request_model: GenerateSpeechRequest):
    buffer = _service.generate_speech(request_model.utterance)
    with buffer as b:
        return Response(b.getvalue(), media_type="audio/wav")

from fastapi import FastAPI, Response
from pydantic import BaseModel

from generate_speech_service import GenerateSpeechService


class GenerateSpeechRequest(BaseModel):
    utterance: str


_service = GenerateSpeechService()
app = FastAPI()


@app.get("/api/generate", response_class=Response)
async def generate_speech(utterance: str):
    buffer = _service.generate_speech(utterance)
    with buffer as b:
        return Response(b.getvalue(), media_type="audio/wav")

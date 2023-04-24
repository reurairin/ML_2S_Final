from fastapi import FastAPI, Response
from pydantic import BaseModel
from generate_speech_service import GenerateSpeechService
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from starlette.status import HTTP_302_FOUND


class GenerateSpeechRequest(BaseModel):
    utterance: str


_service = GenerateSpeechService()
app = FastAPI()


@app.get("/")
def root():
    '''Redirect home route to the client app'''
    return RedirectResponse(url="/client/index.html", status_code=HTTP_302_FOUND)


@app.get("/api/generate", response_class=Response)
async def generate_speech(utterance: str):
    buffer = _service.generate_speech(utterance)
    with buffer as b:
        return Response(b.getvalue(), media_type="audio/wav")

app.mount("/client", StaticFiles(directory="./tts-client/dist"), name="client")

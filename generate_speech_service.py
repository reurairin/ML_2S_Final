from transformers import (
    SpeechT5Processor,
    SpeechT5ForTextToSpeech,
    SpeechT5HifiGan
    )
from datasets import load_dataset
import torch
import soundfile as sf
import io


# Preparation:

_processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
_model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
_vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

# load xvector containing speaker's voice characteristics from a dataset
_embeddings_dataset = load_dataset("Matthijs/cmu-arctic-xvectors",
                                   split="validation")


# Definitions:

class GenerateSpeechService:
    def generate_speech(self, text: str) -> io.BytesIO:
        inputs = _processor(text=text, return_tensors="pt")
        speaker_embeddings = torch.tensor(
            _embeddings_dataset[7306]["xvector"]
        ).unsqueeze(0)
        speech = _model.generate_speech(
            inputs["input_ids"], speaker_embeddings, vocoder=_vocoder
        )

        buffer = io.BytesIO()
        sf.write(buffer, speech.numpy(), format="wav", samplerate=16000)
        return buffer

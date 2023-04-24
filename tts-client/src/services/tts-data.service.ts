import axios from 'axios';

export function sendUserInput(input: string) {
    return axios.post('http://127.0.0.1:8000/text-to-speach');
}

export function getAudioUrl() {
    return axios.get('http://mediaserv30.live-streams.nl:8086/live');
}

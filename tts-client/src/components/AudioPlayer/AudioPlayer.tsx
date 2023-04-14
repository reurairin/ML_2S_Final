import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';
import styles from './AudioPlayer.module.css';

const sound = new Howl({
    src: ['http://mediaserv30.live-streams.nl:8086/live'],
    html5: true
});

export function AudioPlayer() {
    const [playIcon, setPlayIcon] = useState('play-solid.svg');
    const [muteIcon, setMuteIcon] = useState('volume-xmark-solid.svg');

    const [volume, setVolume] = useState(1.0);
    const [savedVolume, setSavedVolume] = useState(1.0);

    useEffect(() => {
        Howler.volume(volume);
    }, [volume]);

    const handlePlayPause = () => {
        if (sound.playing()) {
            sound.pause();
            setPlayIcon('play-solid.svg');
        } else {
            sound.play();
            setPlayIcon('pause-solid.svg');
        }
    };

    const handleMute = () => {
        if (volume === 0.0) {
            setVolume(savedVolume);
            setMuteIcon('volume-xmark-solid.svg');
        } else {
            setSavedVolume(volume);
            setVolume(0.0);
            setMuteIcon('volume-high-solid.svg');
        }
    };

    return (
        <section>
            <button onClick={handlePlayPause}>
                <img
                    className={styles['control-icon']}
                    src={`/icons/${playIcon}`}
                    alt="play"
                />
            </button>
            <button onClick={() => sound.stop()}>
                <img
                    className={styles['control-icon']}
                    src="/icons/stop-solid.svg"
                    alt="stop"
                />
            </button>
            <button onClick={handleMute}>
                <img
                    className={styles['control-icon']}
                    src={`/icons/${muteIcon}`}
                    alt="mute"
                />
            </button>
            <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={volume}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setVolume(event?.target?.valueAsNumber);
                }}
            />
        </section>
    );
}

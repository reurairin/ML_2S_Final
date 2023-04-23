import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';
import styles from './AudioPlayer.module.css';

let sound = new Howl({
    src: [
        'http://127.0.0.1:8000/api/generate?utterance=Please write something'
    ],
    html5: true
});

export function AudioPlayer(props: { utterance: string }) {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [hasBackendError, setHasBackendError] = useState(false);

    useEffect(() => {
        if (!!props.utterance) {
            setIsDataLoaded(false);
            setHasBackendError(false);
            sound = new Howl({
                src: [
                    `http://127.0.0.1:8000/api/generate?utterance=${props.utterance}`
                ],
                html5: true
            });
            sound.on('load', () => {
                setIsDataLoaded(true);
            });
            sound.on('loaderror', () => {
                console.log('fail');
                setHasBackendError(true);
            });
            sound.on('end', () => {
                setPlayIcon('play-solid.svg');
            });
            sound.on('stop', () => {
                setPlayIcon('play-solid.svg');
            });
            sound.on('play', () => {
                setPlayIcon('pause-solid.svg');
            });
            sound.on('pause', () => {
                setPlayIcon('play-solid.svg');
            });
            sound.play();
        }
    }, [props.utterance]);

    const [playIcon, setPlayIcon] = useState('play-solid.svg');
    const [muteIcon, setMuteIcon] = useState('volume-high-solid.svg');

    const [volume, setVolume] = useState(1.0);
    const [savedVolume, setSavedVolume] = useState(1.0);

    useEffect(() => {
        Howler.volume(volume);
    }, [volume]);

    const handlePlayPause = () => {
        if (sound.playing()) {
            sound.pause();
        } else {
            sound.play();
        }
    };

    const handleMute = () => {
        if (volume === 0.0) {
            setVolume(savedVolume);
            setMuteIcon('volume-high-solid.svg');
        } else {
            setSavedVolume(volume);
            setVolume(0.0);
            setMuteIcon('volume-xmark-solid.svg');
        }
    };

    const handleStop = () => {
        sound.stop();
    };

    if (hasBackendError) {
        return (
            <section className={styles['player-container']}>
                <p className="--primary-text">Failed to load data.</p>
            </section>
        );
    }

    if (!props.utterance) {
        return (
            <section className={styles['player-container']}>
                <p className="--primary-text">Please write something.</p>
            </section>
        );
    }

    if (!isDataLoaded) {
        return (
            <section className={styles['player-container']}>
                <p className="--primary-text">Loading...</p>
            </section>
        );
    }

    return (
        <section className={styles['player-container']}>
            <span className={styles['button-container']}>
                <button
                    onClick={handlePlayPause}
                    className={styles['icon-button']}
                >
                    <img
                        className={styles['control-icon']}
                        src={`/icons/${playIcon}`}
                        alt="play"
                    />
                </button>
                <button onClick={handleStop} className={styles['icon-button']}>
                    <img
                        className={styles['control-icon']}
                        src={`/icons/stop-solid.svg`}
                        alt="play"
                    />
                </button>
                <button onClick={handleMute} className={styles['icon-button']}>
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
            </span>
        </section>
    );
}

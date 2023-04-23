import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';
import styles from './AudioPlayer.module.css';

const sound = new Howl({
    src: ['http://mediaserv30.live-streams.nl:8086/live'],
    html5: true
});

export function AudioPlayer() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);

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
            setPlayIcon('play-solid.svg');
        } else {
            sound.play();
            setPlayIcon('pause-solid.svg');
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
        () => sound.stop();
    };

    return (
        <section className={styles['player-container']}>
            <p className="--primary-text">
                {isDataLoaded ? 'Ready for playback.' : 'No data loaded.'}
            </p>
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

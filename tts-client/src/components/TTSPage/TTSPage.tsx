import { useState } from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { InputForm } from '../InputForm/InputForm';
import styles from './TTSPage.module.css';

export function TTSPage() {
    const [utterance, setUtterance] = useState('')

    return (
        <main className={styles.page}>
            <div className={styles['gradient-wrapper']}>
                <div className={styles.container}>
                    <InputForm setUtterance={setUtterance} />
                    <AudioPlayer utterance={utterance} />
                </div>
            </div>
        </main>
    );
}

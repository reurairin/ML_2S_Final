import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { InputForm } from '../InputForm/InputForm';
import styles from './TTSPage.module.css';

export function TTSPage() {
    return (
        <main className={styles.page}>
            <div className={styles['gradient-wrapper']}>
                <div className={styles.container}>
                    <InputForm />
                    <AudioPlayer />
                </div>
            </div>
        </main>
    );
}

import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import { InputForm } from '../InputForm/InputForm';
import styles from './TTSPage.module.css';

export function TTSPage() {
    return (
        <main className={styles.container}>
            <div>
                <InputForm />
                <AudioPlayer />
            </div>
        </main>
    );
}

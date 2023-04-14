import styles from './AppBar.module.css';

export function AppBar() {
    return (
        <section className={styles['app-bar']}>
            <h1 className={styles['app-title']}>Text-to-Speech</h1>
        </section>
    );
}

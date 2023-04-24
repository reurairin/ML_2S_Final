import styles from './AppBar.module.css';

export function AppBar() {
    return (
        <section className={styles['app-bar']}>
            <h1 className={`${styles['app-title']} --primary-text`}>
                Final Project | Text-to-Speech
            </h1>
            <span className={styles['gradient-bar']}></span>
        </section>
    );
}

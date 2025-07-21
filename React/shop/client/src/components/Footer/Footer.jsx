import styles from './Footer.module.scss';

export function Footer() {
    return (
        <footer className={styles.Footer}>
            <div className={'wrapper'}>
                &copy; 2025 Logoipsum Inc. All rights reserved.
            </div>
        </footer>
    );
}
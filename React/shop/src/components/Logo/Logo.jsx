import styles from './Logo.module.scss';

export function Logo(props) {
    return (
        <a href={props.url} className={styles.logo}>
            <img src={props.src} alt={props.alt} />
        </a>
    );
}
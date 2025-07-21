import { Link, useNavigate } from 'react-router';
import styles from './Logo.module.scss';

export function Logo(props) {
    return (
        <Link to={props.url} className={styles.logo}>
            <img src={props.src} alt={props.alt} />
        </Link>
    );
}
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './MainContent.module.scss'

export function MainContent(props) {
    return (
        <>
            <Header />
            <div className={styles.MainContent}>
                {props.children}
            </div>
            <Footer />
        </>
    );
}
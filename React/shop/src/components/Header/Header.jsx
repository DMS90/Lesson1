import { Logo } from '../Logo/Logo';
import styles from './Heder.module.scss';
import logoSrc from '../../assets/img/logoipsum-375.svg';
import { Cart } from '../Cart/Cart';

export function Header() {
    return (
        <div className={styles.header}>
            <div className='wrapper'>
                <div className={styles.header__container}>
                    <div className={styles.header__container}>
                        <Logo src={logoSrc} url='/' alt='Logo' />
                        <Cart />
                    </div>
                </div>
            </div>
        </div>
    );
}
import styles from './Cart.module.scss';
import CartIconUrl from '../../assets/img/cart.svg';
import { useState } from 'react';

export const Cart = () => {
    const [itemCount, setItemCount] = useState(0);
    const [showList, setShowList] = useState(false);

    const onClick = (e) => {
        e.preventDefault();
        console.log('Cart click');
        setShowList(!showList);
    }

    return (
        <div className={styles.Cart}>
            <div className={styles.Cart__button}>
                <button className={styles.Cart__trigger} onClick={onClick}>
                    <img src={CartIconUrl} alt="Cart" className={styles.Cart__icon} />
                </button>
                <span className={styles.Cart__count}>{itemCount ?? 0}</span>
            </div>
            {/* // TODO: Add list */}
            {
                showList && (
                    <div className={styles.Cart__list}>
                        Корзина пуста
                    </div>
                )
            }
        </div>
    );
};
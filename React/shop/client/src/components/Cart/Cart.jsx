import styles from './Cart.module.scss';
import CartIconUrl from '../../assets/img/cart.svg';
import { useContext, useState } from 'react';
import { CartContext } from '../../App';
import { useNavigate } from 'react-router';

export const Cart = () => {
    const [showList, setShowList] = useState(false);
    const { getCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault();
        navigate('/cart');
    }

    const cartCount = () => {
        let newCount = 0;
        (getCartItems() ?? []).forEach(item => {
            newCount += item.count;
        });
        return newCount;
        // return cartItems?.length ?? 0;
    }

    return (
        <div className={styles.Cart}>
            <div className={styles.Cart__button}>
                <button className={styles.Cart__trigger} onClick={onClick}>
                    <img src={CartIconUrl} alt="Cart" className={styles.Cart__icon} />
                </button>
                <span className={styles.Cart__count}>{cartCount()}</span>
            </div>
            {/* {
                showList && (
                    <div className={styles.Cart__list}>
                        {(getCartItems() ?? []).map(item => {
                            return <div>{item.description}</div>
                        })}
                    </div>
                )
            } */}
        </div>
    );
};
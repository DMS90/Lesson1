import { useContext, useMemo } from 'react';
import { CartContext } from '../../App';
import styles from './CartItem.module.scss';

export const CartItem = (props) => {
    console.log(props);
    const summary = useMemo(() => {
return props
    }, [])

    function onAddClick() {
        if (props.onIncrementClick) {
            props.onIncrementClick(props.id);
        }
    }

    function onRemoveClick() {
        if (props.onDecrementClick) {
            props.onDecrementClick(props.id);
        }
    }

    return (
        <div className={styles.CartItem}>
            <img src={props.images?.[0]?.imageUrl} alt='' className={styles.CartItem__image} />
            <div>
                <h3 className={styles.CartItem__title}>
                    {props.name ?? ''}
                </h3>
                <div className={styles.CartItem__text}>{props.description ?? ''}</div>
                <div className={styles.CartItem__amount}>
                    <button
                        className={styles.CartItem__amountButton}
                        title='Убрать единицу товара из корзины'
                        onClick={onRemoveClick}
                    >
                        -
                    </button>
                    <span className={styles.CartItem__amountCount}>{props.count ?? ''}</span>
                    <button
                        className={styles.CartItem__amountButton}
                        title='Добавить единицу товара в корзину'
                        onClick={onAddClick}
                    >
                        +
                    </button>
                </div>
                <div className={styles.CartItem__singleprice}>Цена за штуку: {props.price ?? ''}&nbsp;&#8381;</div>
            </div>
            <div className={styles.CartItem__summary}>
                <span className={styles.CartItem__summaryPrice}>100500&nbsp;&#8381;</span>
                <button title='Удалить из корзины' className={styles.CartItem__summaryRemove}>X</button>
            </div>
        </div>
    );
}
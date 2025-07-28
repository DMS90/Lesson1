import styles from './Product.module.scss';
import CartIconUrl from '../../assets/img/cart.svg';
import { memo, useContext } from 'react';
import { CartContext } from '../../App';

export const Product = memo(
    function Product(props) {
        const { id, name, description, images, price, addToCart } = props;
        const { getCartItems } = useContext(CartContext);
        const inCart = (getCartItems() ?? []).find(item => item.id === id);

        const getMainImage = () => {
            const mainImage = (images ?? []).filter(image => image.main);
            return mainImage;
        };

        return (
            <div className={styles.Product}>
                <div className={styles.Product__image}>
                    {/* //TODO: Add slider */}
                    <img src={getMainImage()[0]?.imageUrl} alt={name ?? ''} />
                </div>
                <div className={styles.Product__content}>
                    <h3 className={styles.Product__title}>{name ?? ''}</h3>
                    <div className={styles.Product__text}>{description ?? ''}</div>
                </div>
                <div className={styles.Product__controls}>
                    <div className={styles.Product__price}>
                        {price ?? ''}&nbsp;&#8381;
                    </div>
                    <div className={styles.Product__add}>
                        <button className={inCart && styles.active} onClick={() => addToCart(id)}>
                            <img src={CartIconUrl} alt='' />
                            {inCart?.count ? <span>{inCart.count}</span> : <></>}
                        </button>
                    </div>
                </div>
                {/* <a href="#1" className={styles.Product__link} aria-label="See full description"></a> */}
            </div>
        );
    }, (prevProps, props) => {
        return (
            prevProps.id === props.id
            && prevProps.name === props.name
            && prevProps.description === props.description
            && prevProps.images === props.images
            && prevProps.price === props.price
        );
    }
)
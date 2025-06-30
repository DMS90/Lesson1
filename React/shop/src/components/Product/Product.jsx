import styles from './Product.module.scss';

export function Product(props) {
    const { name, description, images, price } = props;

    const getMainImage = () => {
        const mainImage = (images ?? []).filter(image => image.main);
        return mainImage;
    }

    return (
        <div className={styles.Product}>
            <div className={styles.Product__image}>
                {/* //TODO: Add slider */}
                <img src={getMainImage()[0]?.imageUrl} alt={name ?? ''} />
            </div>
            <div className={styles.Product__content}>
                <h3 className={styles.Product__image}>{name ?? ''}</h3>
                <div className={styles.Product__text}>{description ?? ''}</div>
            </div>
            <div className={styles.Product__price}>{price ?? ''}&nbsp;&#8381;</div>
            <a href="#1" className={styles.Product__link} aria-label="See full description"></a>
        </div>
    );
}
import { useEffect, useState } from 'react';
import { Product } from '../Product/Product';
import styles from './MainContent.module.scss';

export function MainContent() {
    const [products, setProducts] = useState([]);

    const update = async () => {
        try {
            const resp = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (!resp?.ok) {
                throw new Error(resp.statusText);
            }
            const data = await resp.json();
            setProducts(data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        update();
    }, []);

    return (
        <div className={styles.MainContent}>
            <div className='wrapper'>
                <div className={styles.products}>
                    {products.map(product => (
                        <Product
                            key={product.id}
                            name={product.name}
                            description={product.description}
                            images={product.images}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
import { useContext, useEffect, useState } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { MainContent } from '../components/MainContent/MainContent';
import { Product } from '../components/Product/Product'
import { CartContext, ProductsContext } from '../App';
import styles from './HomePage.module.scss'
import { Requests } from '../services/Requests';

const requests = new Requests();

export const HomePage = () => {
    const { products, setProducts } = useContext(ProductsContext);
    const { getCartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);
    console.log('Cart items on home: ', getCartItems());

    const update = async () => {
        try {
            const data = await requests.getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    }

    const addToCart = (productId) => {
        addItemToCart(productId);
    };

    useEffect(() => {
        update();
    }, []);

    return (
        <MainContent>
            <div className={styles.HomePage}>
                <div className='wrapper'>
                    <div className={styles.products}>
                        {products.map(product => (
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                images={product.images}
                                price={product.price}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainContent>
    )
}
import { useContext, useEffect, useState } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { MainContent } from '../components/MainContent/MainContent';
import { Product } from '../components/Product/Product'
import { CartContext, ProductsContext } from '../App';
import styles from './HomePage.module.scss'
import { Requests } from '../services/Requests';
import { groupBy } from 'lodash';

const requests = new Requests();

export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('');
    const [categoryId, setCategoryId] = useState(-1);
    const { addItemToCart } = useContext(CartContext);

    const update = async () => {
        console.log('Filter: ', filter);
        console.log('Catgory ID', categoryId);
        try {
            let data = [];
            if (!filter && (categoryId === -1 || categoryId === null || categoryId === undefined)) {
                data = await requests.getProducts();
            }
            if (filter && (categoryId === -1 || categoryId === null || categoryId === undefined)) {
                data = await requests.searchProduct(filter);
            }
            if (categoryId >= 0) {
                data = await requests.getProductsByCategrory(categoryId, filter);
            }
            const newCategories = await requests.getCategories();
            setCategories(newCategories);
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    const addToCart = (productId) => {
        addItemToCart(productId);
    };

    const renderCategories = () => {
        return (categories ?? []).map(cat => (
            <button
                className={cat.id === categoryId ? styles.active : undefined}
                key={cat.id}
                onClick={() => {
                    if (categoryId === cat.id) {
                        setCategoryId(-1);
                    } else {
                        setCategoryId(cat.id);
                    }
                }}
            >
                {cat.name}
            </button>
        ))
        // return result;
    };

    useEffect(() => {
        update();
    }, [filter, categoryId]);

    return (
        <MainContent>
            <div className={styles.HomePage}>

                <div className='wrapper'>
                    <div className={styles.HomePage__search}>
                        <input
                            className={styles.HomePage__searchInput}
                            placeholder='Search product'
                            defaultValue={filter}
                            // onBlur={(e) => { setFilter(e.target.value ?? '') }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setFilter(e.target.value ?? '');
                                }
                            }}
                        />
                    </div>
                    <div className={styles.HomePage__categories}>
                        {renderCategories()}
                    </div>
                    <div className={styles.products}>
                        {(products ?? []).map(product => {
                            return <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                images={product.images}
                                price={product.price}
                                addToCart={addToCart}
                            />
                        })}
                    </div>
                </div>
            </div>
        </MainContent>
    )
}
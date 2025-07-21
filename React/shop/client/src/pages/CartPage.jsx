import { useContext } from 'react';
import { CartContext, ProductsContext } from '../App';
import { MainContent } from '../components/MainContent/MainContent';
import { CartItem } from '../components/CartItem/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
    const { products, setProducts } = useContext(ProductsContext);
    const { getCartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

    function cartToDisplayItems() {
        return getCartItems();
        // const foundItems = {};
        // const uniqueItems = cartItems.filter((item) => {
        //     if (foundItems[item.id]) {
        //         return false;
        //     } else {
        //         foundItems[item.id] = true;
        //         return true;
        //     }
        // });
        // uniqueItems.forEach(uniqueItem => {
        //     const count = cartItems.filter(cartItem => cartItem.id === uniqueItem.id)?.length;
        //     uniqueItem.count = count;
        // });

        // return uniqueItems;
    }

    function onProductAddClick(productId) {
        addItemToCart(productId);
    }

    // function removeObjectWithId(arr, id) {
    //     const index = arr.findIndex(obj => obj.id === id);
    //     if (index !== -1) {
    //         arr.splice(index, 1);
    //     }
    //     debugger;
    //     return [...arr];
    // }

    function onProductRemoveClick(productId) {
        removeItemFromCart(productId);
    }

    const displayItems = cartToDisplayItems();

    return (
        <MainContent>
            <div className={styles.CartPage}>
                <div className='wrapper'>
                    <div className={styles.CartPage__products}>
                        {!displayItems?.length
                            ? <>Cart is empty</>
                            : displayItems.map((item) => {
                                return (
                                    <CartItem
                                        key={item.id}
                                        name={item.name}
                                        count={item.count}
                                        images={item.images}
                                        description={item.description}
                                        price={item.price}
                                        id={item.id}
                                        onIncrementClick={onProductAddClick}
                                        onDecrementClick={onProductRemoveClick}
                                    />
                                )
                            })}
                    </div>
                </div>
            </div>
        </MainContent>
    )
}
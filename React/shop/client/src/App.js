import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { createContext, useEffect, useState } from 'react';
import { LocalStorageHelper } from './lib/LocalStorageHelper';

export const CartContext = createContext();
export const ProductsContext = createContext();
const localStorageKey = '__reactShop__';

let router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
]);

function App() {
  const [cartItems, setCartItems] = useState(LocalStorageHelper.load(localStorageKey) || []);
  const [products, setProducts] = useState([]);
  console.log('Cart items: ', cartItems);

  const getCartItems = () => {
    if (!LocalStorageHelper.isAvailable()) {
      return cartItems;
    } else {
      return LocalStorageHelper.load(localStorageKey);
    }
  }

  const addItemToCart = (productId) => {
    //FIXME: Делать запрос на продукты
    const product = products.find(product => product.id === productId);
    if (!product) { return; }
    setCartItems(prevItems => {
      let newItems = [...prevItems ?? []];
      const foundIndex = newItems.findIndex(item => item.id === productId);
      if (foundIndex < 0) {
        const itemsToSave = newItems.concat({ ...product, count: 1 });
        LocalStorageHelper.save(localStorageKey, itemsToSave);
        return itemsToSave;
      }
      newItems = newItems.map(item => item.id === productId ? { ...item, count: item.count + 1 } : item)
      LocalStorageHelper.save(localStorageKey, newItems)
      return newItems;
    });
  }

  const removeItemFromCart = (productId) => {
    //FIXME: Делать запрос на продукты
    const product = products.find(product => product.id === productId);
    if (!product) { return; }
    setCartItems(prevItems => {
      let newItems = [...prevItems ?? []];
      const foundIndex = newItems.findIndex(item => item.id === productId);
      const found = newItems[foundIndex];
      if (found) {
        if (found.count <= 1) {
          newItems.slice(foundIndex, 1);
          LocalStorageHelper.save(localStorageKey, [...newItems]);
          return [...newItems];
        } else {
          newItems.slice(foundIndex, 1);
          newItems = newItems.map(item => item.id === productId ? { ...item, count: item.count - 1 } : item)
          LocalStorageHelper.save(localStorageKey, [...newItems]);
        }
      }
    });
  }

  // useEffect(() => {
  //   if (LocalStorageHelper.isAvailable()) {
  //     debugger;
  //     LocalStorageHelper.save(localStorageKey, cartItems);
  //   }
  // }, [cartItems.length]);

  return (
    <div className='app'>
      <CartContext.Provider value={{ getCartItems, addItemToCart, removeItemFromCart }}>
        <ProductsContext.Provider value={{ products, setProducts }}>
          <RouterProvider router={router} />
        </ProductsContext.Provider>
      </CartContext.Provider>
    </div >
  );
}

export default App;

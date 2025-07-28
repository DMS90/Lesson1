import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { createContext, useEffect, useMemo, useState } from 'react';
import { LocalStorageHelper } from './lib/LocalStorageHelper';
import { Requests } from './services/Requests';

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

const requests = new Requests();

function App() {
  const [cartItems, setCartItems] = useState(LocalStorageHelper.load(localStorageKey) || []);
  console.log('Cart items: ', cartItems);

  const getCartItems = () => {
    if (!LocalStorageHelper.isAvailable()) {
      return cartItems;
    } else {
      return LocalStorageHelper.load(localStorageKey);
    }
  }

  const addItemToCart = async (productId) => {
    let product = null;
    try {
      product = await requests.getProductById(productId);
    } catch (err) {
      console.error(err);
    }

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

  const removeItemFromCart = async (productId) => {
    setCartItems(prevItems => {
      let newItems = [...prevItems ?? []];
      const foundIndex = newItems.findIndex(item => item.id === productId);
      const found = newItems[foundIndex];
      if (found) {
        if (found.count <= 1) {
          newItems = newItems.filter((item, index) => index !== foundIndex);
          LocalStorageHelper.save(localStorageKey, [...newItems]);
          return [...newItems ?? []];
        } else {
          newItems = newItems.map(item => item.id === productId ? { ...item, count: item.count - 1 } : item)
          LocalStorageHelper.save(localStorageKey, [...newItems]);
          return [...newItems ?? []];
        }
      }
    });
  }

  const removeProductFromCart = async (productId) => {
    setCartItems(prevItems => {
      let newItems = [...prevItems ?? []];
      const foundIndex = newItems.findIndex(item => item.id === productId);
      newItems = newItems.filter((item, index) => index !== foundIndex);
      LocalStorageHelper.save(localStorageKey, [...newItems]);
      return [...newItems ?? []];
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
      <CartContext.Provider value={{
        getCartItems,
        addItemToCart,
        removeItemFromCart,
        removeProductFromCart
      }}>
        <RouterProvider router={router} />
      </CartContext.Provider>
    </div >
  );
}

export default App;

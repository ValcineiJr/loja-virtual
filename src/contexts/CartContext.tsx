/* eslint-disable react-hooks/rules-of-hooks */
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { onValue, ref } from 'firebase/database';

import { database } from '@/services/firebase';

import { gamesType } from './ProductContext';

type CartContextType = {
  cart: gamesType[];
  totalCartValue: number;
  setCartToStorage: (item: gamesType) => void;
  removeItemFromCart: (item: gamesType) => void;
  increaseItemCartQuantity: (product: gamesType) => void;
  decreaseItemCartQuantity: (product: gamesType) => void;
  frete: {
    value: number;
    prazo: string;
  };
  setFrete: Dispatch<
    SetStateAction<{
      value: number;
      prazo: string;
    }>
  >;
};

type CartContextProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider(props: CartContextProviderProps) {
  const [cart, setCart] = useState<gamesType[]>([]);
  const [change, setChange] = useState(false);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [frete, setFrete] = useState({ value: 0, prazo: `` });

  const cartStorageKey = `cart-loja`;

  useEffect(() => {
    const cartStorage = localStorage.getItem(cartStorageKey);
    const freteStorage = localStorage.getItem(`frete-loja`);

    if (cartStorage) {
      const c: gamesType[] = JSON.parse(cartStorage ?? `[]`);

      let total = 0;
      c.map((item) => (total += item.price * item.quantity));
      setCart(c);

      setTotalCartValue(total);
    }

    if (freteStorage) {
      const f = JSON.parse(freteStorage ?? `{ value: 0, prazo: '' }`);
      setFrete(f);
    }
  }, [cartStorageKey]);

  useEffect(() => {
    if (cart.length > 0) {
      let total = 0;
      cart.map((item) => (total += item.price * item.quantity));

      setTotalCartValue(total);
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    }
  }, [cart, cartStorageKey, change]);

  useEffect(() => {
    if (frete.prazo !== ``) {
      localStorage.setItem(`frete-loja`, JSON.stringify(frete));
    }
  }, [frete]);

  // useEffect(() => {
  //   const recentStorage = localStorage.getItem(recentStorageKey);

  //   if (recentStorage) {
  //     const c: Product[] = JSON.parse(recentStorage ?? "[]");
  //     setRecentItems(c);
  //   }
  // }, [recentStorageKey]);

  function resetCart(cartCopy: gamesType[]) {
    localStorage.setItem(cartStorageKey, JSON.stringify(cartCopy));
    setTotalCartValue(0);
  }

  function setCartToStorage(product: gamesType) {
    const containID = cart.findIndex((item) => item.name === product.name);

    const productInventoryRef = ref(
      database,
      `products_inventories/${product.inventory_id}`,
    );

    if (containID !== -1) {
      onValue(productInventoryRef, (snapshot) => {
        const data = snapshot.val();
        const product_quantity = data.quantity;
        const cartCopy = cart;

        if (cartCopy[containID].quantity < product_quantity) {
          cartCopy[containID].quantity++;

          setCart(cartCopy);
        }
      });
    } else {
      setCart((state) => {
        return [...state, { ...product, quantity: 1 }];
      });
    }
  }

  function removeItemFromCart(product: gamesType) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      const cartCopy = cart;

      cartCopy.splice(containID, 1);

      setCart(cartCopy);
      setChange((state) => !state);

      if (cartCopy.length === 0) {
        resetCart(cartCopy);
      }
    }
  }

  function increaseItemCartQuantity(product: gamesType) {
    const containID = cart.findIndex((item) => item.name === product.name);

    const productInventoryRef = ref(
      database,
      `products_inventories/${product.inventory_id}`,
    );

    if (containID !== -1) {
      onValue(productInventoryRef, (snapshot) => {
        const data = snapshot.val();
        const product_quantity = data.quantity;

        if (product.quantity < product_quantity) {
          const cartCopy = cart;
          cartCopy[containID].quantity++;
          setCart(cartCopy);
          setChange((state) => !state);
        }
      });
    }
  }

  function decreaseItemCartQuantity(product: gamesType) {
    const containID = cart.findIndex((item) => item.name === product.name);

    if (containID !== -1) {
      let cartCopy = cart;
      cartCopy[containID].quantity--;

      if (cartCopy[containID].quantity === 0) {
        cartCopy = cartCopy.filter(
          (item) => item.name !== cartCopy[containID].name,
        );
      }
      setCart(cartCopy);
      setChange((state) => !state);

      if (cartCopy.length === 0) {
        resetCart(cartCopy);
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCartToStorage,
        totalCartValue,
        removeItemFromCart,
        increaseItemCartQuantity,
        decreaseItemCartQuantity,
        frete,
        setFrete,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

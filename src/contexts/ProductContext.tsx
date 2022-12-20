/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, ReactNode, useState, useEffect } from 'react';

import { onValue, ref, set } from 'firebase/database';

import { database } from '@/services/firebase';
import { useFetch } from '@/hooks/useFetch';
import api from '@/services/api';

export type gamesType = {
  id: string;
  category_id: string;
  sub_category_id: string;
  inventory_id: string;
  banner: string;
  thumbs: string[];
  name: string;
  price: number;
  quantity: number;
  description: string;
  gameSpecifications: gameSpecifications;
};

export type categoriesType = {
  id: string;
  name: string;
  category_id: string;
};

export type gameSpecifications = {
  developer: string;
  publisher: string;
  languages: string;
  genre: string[];
  releaseDate: string;
  subtitles: string;
  age: string;
  numberOfPlayersOffline: string;
  numberOfPlayersOnline: string;
};

type ProductContextType = {
  createProductCategory: (name: string) => Promise<boolean>;
  getAllProducts: (
    setProducts: React.Dispatch<React.SetStateAction<gamesType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
  createProductSubCategory: (
    name: string,
    category_id: number,
  ) => Promise<void>;
  createProduct: (
    name: string,
    description: string,
    price: number,
    gameSpecifications: gameSpecifications,
    banner: string,
    category_id: number,
    sub_category_id: number,
    quantity: number,
  ) => Promise<boolean>;
  categories: categoriesType[];
  recentItems: gamesType[];
  addItemsToRecents: (product: gamesType) => void;
};

type ProductContextProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext({} as ProductContextType);

export function ProductContextProvider(props: ProductContextProviderProps) {
  const [recentItems, setRecentItems] = useState<gamesType[]>([]);
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const recentStorageKey = `recente-storage`;

  async function getData() {
    const response = await api.get(`api/product/read/categories`);
    const data: categoriesType[] = response.data;

    if (data) {
      setCategories(data);
    }
  }

  useEffect(() => {
    if (categories.length === 0) {
      getData();
    }

    const recentStorage = localStorage.getItem(recentStorageKey);

    if (recentStorage) {
      const c: gamesType[] = JSON.parse(recentStorage ?? `[]`);

      let total = 0;
      c.map((item) => (total += item.price * item.quantity));
      setRecentItems(c);
    }
  }, [categories.length, recentStorageKey]);

  async function createProductCategory(name: string) {
    const id = crypto.randomUUID();

    try {
      await set(ref(database, `products_categories/` + id), {
        name,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async function createProductSubCategory(name: string, category_id: number) {
    const id = crypto.randomUUID();

    await set(ref(database, `products_sub_categories/` + id), {
      name,
      category_id,
    });
  }

  async function createProduct(
    name: string,
    description: string,
    price: number,
    gameSpecifications: gameSpecifications,
    banner: string,
    category_id: number,
    sub_category_id: number,
    quantity: number,
  ) {
    const product_id = crypto.randomUUID();
    const inventory_id = crypto.randomUUID();

    try {
      await set(ref(database, `products_inventories/` + inventory_id), {
        quantity,
      });

      await set(ref(database, `products/` + product_id), {
        id: product_id,
        name,
        description,
        price,
        gameSpecifications,
        banner,
        category_id,
        sub_category_id,
        inventory_id,
        discount_id: 0,
        createdAt: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async function getAllProducts(
    setProducts: (data: any) => void,
    setLoading: (data: any) => void,
  ) {
    const ProductsRef = ref(database, `products/`);
    setLoading(true);

    onValue(ProductsRef, (snapshot) => {
      const data = snapshot.val();

      setProducts(Object.values(data));
      setLoading(false);
    });
  }

  function addItemsToRecents(product: gamesType) {
    const products = recentItems;
    const containID = products.findIndex((item) => item.name === product.name);

    if (containID === -1) {
      if (products.length >= 3) {
        products.pop();
      }
      products.unshift(product);
      localStorage.setItem(recentStorageKey, JSON.stringify(products));

      setRecentItems(products);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        createProductCategory,
        createProductSubCategory,
        createProduct,
        getAllProducts,
        categories,
        addItemsToRecents,
        recentItems,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

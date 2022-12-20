import crypto from 'crypto';
/* eslint-disable react-hooks/rules-of-hooks */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';

import { ref, set } from 'firebase/database';
import { database } from '@/services/firebase';
import { gameSpecifications } from '@/contexts/ProductContext';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    name,
    description,
    price,
    gameSpecifications,
    banner,
    category_id,
    sub_category_id,
    quantity,
  } = req.body;

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

  const result = await createProduct(
    name,
    description,
    price,
    gameSpecifications,
    banner,
    category_id,
    sub_category_id,
    quantity,
  );

  res.status(200).json({ result });
}

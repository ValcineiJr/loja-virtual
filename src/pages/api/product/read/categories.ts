import type { NextApiRequest, NextApiResponse } from 'next';

import { onValue, ref } from 'firebase/database';
import { database } from '@/services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  async function getCategories() {
    try {
      const ProductsRef = ref(database, `products_sub_categories`);

      let product;

      onValue(ProductsRef, (snapshot) => {
        const data = snapshot.val();

        product = Object.values(data);
      });

      return product;
    } catch (error) {
      return false;
    }
  }

  if (req.method === `GET`) {
    const result = await getCategories();

    return res.status(200).json(result);
  }

  return res.status(200).json({ error: `nada aqui` });
}

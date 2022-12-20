import type { NextApiRequest, NextApiResponse } from 'next';

import { onValue, ref } from 'firebase/database';
import { database } from '@/services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { product_id }: any = req.query;

  async function getProduct(product_id: string) {
    try {
      const ProductsRef = ref(database, `products/${product_id}`);

      let product;

      onValue(ProductsRef, (snapshot) => {
        const data = snapshot.val();

        product = data;
      });

      return product;
    } catch (error) {
      return false;
    }
  }

  if (req.method === `GET`) {
    const result = await getProduct(product_id);
    return res.status(200).json(result);
  }

  return res.status(200).json({ error: `nada aqui` });
}

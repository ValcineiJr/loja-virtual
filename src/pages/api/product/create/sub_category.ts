import crypto from 'crypto';
/* eslint-disable react-hooks/rules-of-hooks */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';

import { ref, set } from 'firebase/database';
import { database } from '@/services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { categoryName, category_id } = req.body;

  async function createProductCategory(name: string, category_id: string) {
    const id = crypto.randomUUID();
    try {
      await set(ref(database, `products_sub_categories/` + id), {
        id,
        name,
        category_id,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  const result = await createProductCategory(categoryName, category_id);

  res.status(200).json({ result });
}

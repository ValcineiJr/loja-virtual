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
  const { categoryName } = req.body;

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

  const result = await createProductCategory(categoryName);

  res.status(200).json({ result });
}

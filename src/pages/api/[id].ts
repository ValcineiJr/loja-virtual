/* eslint-disable react-hooks/rules-of-hooks */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { allGames } from '@/utils/dummyData';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { id } = req.query;

  const gameID = allGames.findIndex((i) => i.id === id);

  res.status(200).json(allGames[gameID]);
}

/* eslint-disable react-hooks/rules-of-hooks */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await res.revalidate(`/`);

  res.status(200).json({});
}

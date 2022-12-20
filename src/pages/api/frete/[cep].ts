/* eslint-disable react-hooks/rules-of-hooks */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Correios from 'node-correios';

export type FreteData = {
  Valor: string;
  PrazoEntrega: string;
  MsgErro: string;
  obsFim: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FreteData>,
) {
  const { cep } = req.query;
  const args = {
    sCepOrigem: `22780084`,
    sCepDestino: cep,
    nCdServico: `40010`,
    nVlPeso: `1`,
    nCdFormato: 1,
    nVlComprimento: 20,
    nVlLargura: 20,
    nVlAltura: 20,
    nVlDiametro: 20,
  };
  const correios = new Correios();

  const [{ Valor, PrazoEntrega, MsgErro, obsFim }] =
    await correios.calcPrecoPrazo(args);

  res.status(200).json({ Valor, PrazoEntrega, MsgErro, obsFim });
}

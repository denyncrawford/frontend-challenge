import { STORES, getStoreBodySchema } from '@/stores';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { page = 1, limit = 10, search } = req.query;
      let results = STORES;
      if (typeof search === 'string') {
        results = results.filter((store) => store.name.toLowerCase().includes(search.toLowerCase()));
      }
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = Number(page) * Number(limit);
      results = results.slice(startIndex, endIndex);
      res.status(200).json(results);
      break;
    case 'POST':
      try {
        const storeBody = getStoreBodySchema().parse(req.body);

        res.status(200).json({
          status: 'success',
          data: storeBody,
        });
      } catch (error) {
        let err = error;
        if (err instanceof z.ZodError) {
          err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
        }
        return res.status(409).json({
          status: 'failed',
          error: err,
        });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

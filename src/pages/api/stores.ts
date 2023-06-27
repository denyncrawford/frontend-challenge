import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

interface Store {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const RANDOM_WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'curabitur',
  'vel',
  'hendrerit',
  'libero',
  'eleifend',
  'blandit',
  'nunc',
  'ornare',
  'odio',
  'ut',
];

function generateStoreData(): Store[] {
  const stores: Store[] = [];

  for (let i = 0; i < 100; i++) {
    stores.push({
      name: RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)],
      description: `Description ${i}`,
      email: `loremipsum@gmail.com`,
      phone: `1234567890`,
      address: `Address ${i}`,
      city: `City ${i}`,
      state: `State ${i}`,
      zip: `Zip ${i}`,
    });
  }

  return stores;
}

const stores = generateStoreData();

function getStoreBodySchema() {
  return z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
    email: z.string().email(),
    items: z.array(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().min(1).max(50),
        price: z.number().min(0),
        quantity: z.number().min(0),
      }),
    ),
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { page = 1, limit = 10, search } = req.query;
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = Number(page) * Number(limit);
      let results = stores.slice(startIndex, endIndex);
      if (typeof search === 'string') {
        results = results.filter((store) => store.name.toLowerCase().includes(search.toLowerCase()));
      }
      res.status(200).json(results);
      break;
    case 'POST':
      try {
        const storeBody = getStoreBodySchema().parse(req.body);

        res.status(200).json(stores);
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

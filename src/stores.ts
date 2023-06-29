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

export const STORES = generateStoreData();

export function getStoreBodySchema() {
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

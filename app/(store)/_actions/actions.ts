'use server';

import { cache } from '@/lib/cache';
import db from '@/lib/db';


export const getNewProducts = cache(
  () => {
    return db.product.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 4,
    });
  },
  ['/', 'getNewProducts'],
  { revalidate: 60 * 60 * 24 },
);

export async function getAllProducts() {
  const products = await db.product.findMany({
    where: {
      isAvailable: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return products;
}

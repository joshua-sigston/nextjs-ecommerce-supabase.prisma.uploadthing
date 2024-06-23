import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import Link from 'next/link';
import ProductsTable from './_components/product-table';
import { Suspense } from 'react';
import Spinner from '../_components/spinner';

async function getProducts() {
  const data = await db.product.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      image: true,
      priceInCents: true,
      isAvailable: true,
      _count: { select: { orderItems: true } },
    },
  });
  return data;
}

export default async function CreateProduct() {
  const products = await getProducts();

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-col gap-y-10">
        <Button variant="outline">
          <Link href="products/create-product">Create Product</Link>
        </Button>

        <div>
          {products.length == 0 ? (
            <p>No products found</p>
          ) : (
            <ProductsTable products={products} />
          )}
        </div>
      </div>
    </Suspense>
  );
}

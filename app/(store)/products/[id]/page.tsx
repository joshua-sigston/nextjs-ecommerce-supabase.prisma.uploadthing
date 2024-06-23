import { formatCurrency } from '@/lib/currencyFormats';
import db from '@/lib/db';
import Image from 'next/image';
import React from 'react';
import ProductButtons from '../../_components/product-buttons';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  const price = product?.priceInCents == undefined ? 0 : product?.priceInCents;

  return (
    <main className="mt-10 py-5 px-3 space-y-5 grid grid-cols-1 md:grid-cols-2">
      <div className="space-y-5">
        <h3>{product?.name}</h3>
        <p>{product?.description}</p>
      </div>
      <div className="space-y-5 flex flex-col items-center">
        <Image
          src={`${product?.image}`}
          height={400}
          width={400}
          alt="product image"
          priority
          className="shadow-md rounded-sm"
        />
        <div className="flex flex-col space-y-3">
          <h4>Price: {formatCurrency(price / 100)}</h4>
          {product && <ProductButtons data={product} />}
        </div>
      </div>
    </main>
  );
}

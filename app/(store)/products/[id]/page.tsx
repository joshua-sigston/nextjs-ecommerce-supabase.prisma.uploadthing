import { formatCurrency } from '@/lib/currencyFormats';
import db from '@/lib/db';
import Image from 'next/image';
import React from 'react';
import AddButton from '../../_components/add-button';
import useCartStore from '@/store/store';
import ProductButtons from '../../_components/product-buttons';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  const price = product?.priceInCents == undefined ? 0 : product?.priceInCents;

  return (
    <main className="mt-5 py-5 space-y-5 grid grid-cols-1 bg-slate-300">
      <div className="space-y-5">
        <h3>{product?.name}</h3>
        <p>{product?.description}</p>
      </div>
      <div className="space-y-5">
        <Image
          src={`${product?.image}`}
          height={400}
          width={400}
          alt="product image"
          priority
        />
        <h4>Price: {formatCurrency(price / 100)}</h4>
      </div>
      {product && <ProductButtons data={product} />}
    </main>
  );
}

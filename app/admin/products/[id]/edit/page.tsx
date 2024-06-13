import db from '@/lib/db';
import React from 'react';
import ProductForm from '../../_components/product-form';

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });
  return (
    <>
      <ProductForm product={product} />
    </>
  );
}

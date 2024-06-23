import db from '@/lib/db';
import React from 'react';
import ProductCard from '../../_components/product-card';

export default async function CategoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log(id);
  const products = await db.product.findMany({ where: { category: id } });
  console.log(products);
  return (
    <main className="mt-[5rem]">
      <h3 className="text-center">{id.toLocaleUpperCase()} Category Page</h3>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item, index) => (
          <div key={index}>
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </main>
  );
}

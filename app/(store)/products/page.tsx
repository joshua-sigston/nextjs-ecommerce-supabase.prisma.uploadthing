import { getAllProducts } from '../_actions/actions';
import ProductsContainer from '../_components/products-container';
import { Suspense, useState } from 'react';
import ProductsList from '../_components/products-list';
import { ProductCardSkeleton } from '../_components/product-card';

export default async function ProductsPage() {
  const products = await getAllProducts();
  // console.log(products);
  return (
    <div>
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsList products={products} />
      </Suspense>
    </div>
  );
}

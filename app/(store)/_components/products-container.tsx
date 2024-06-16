import ProductCard, { ProductCardSkeleton } from './product-card';
import { Product } from '@prisma/client';
import { Suspense } from 'react';

type ProductsContainerProps = {
  productsFetcher: () => Promise<Product[]>;
};

export default async function ProductsContainer({
  productsFetcher,
}: ProductsContainerProps) {
  return (
    <Suspense
      fallback={
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      }
    >
      <ProductSuspense productsFetcher={productsFetcher} />
    </Suspense>
  );
}

export async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product, index) => (
    <ProductCard key={index} {...product} />
  ));
}

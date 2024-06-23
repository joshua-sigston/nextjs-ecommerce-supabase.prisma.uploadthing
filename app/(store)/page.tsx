import CarouselSection from '@/components/carousel';
import { Hero, Categories } from './_components';
import ProductsContainer from './_components/products-container';
import { getNewProducts } from './_actions/actions';

export default async function Home() {
  return (
    <main className="space-y-12">
      <Hero />
      <section className="md:px-5 lg:max-w-[1200px] lg:m-auto space-y-12">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold text-center">New Products</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 gap-4 px-3">
          <ProductsContainer productsFetcher={getNewProducts} />
        </div>
      </section>
      <div className="w-full flex justify-center">
        <CarouselSection />
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold text-center">Categories</h3>
      </div>
      <Categories />
      <div className="h-[200px] w-full bg-gray-400">{/* footer */}</div>
    </main>
  );
}

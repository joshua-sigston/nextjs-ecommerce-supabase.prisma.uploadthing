import CarouselSection from '@/components/carousel';
import db from '@/lib/db';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Hero, Categories } from './_components';
import ProductsContainer from './_components/products-container';
import { getNewProducts } from './_actions/actions';

export default async function Home() {
  const supabase = await createClient();
  // const prisma = new PrismaClient();
  const products = await getNewProducts();
  console.log(products);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user?.email);

  if (!user) return redirect('/sign-in');

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email ?? '',
        role: 'customer',
      },
    });
  }

  return (
    <main className="space-y-12">
      <Hero />
      <section className="md:px-5 lg:max-w-[1200px] lg:m-auto space-y-12">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold text-center">New Products</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 gap-4">
          <ProductsContainer productsFetcher={getNewProducts} />
        </div>
      </section>
      <div className="w-full flex justify-center">
        {/* <CarouselSection /> */}
      </div>
      <Categories />
      <div className="h-[200px] w-full bg-gray-400">{/* footer */}</div>
    </main>
  );
}

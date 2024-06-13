import db from '@/lib/db';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default async function Home() {
  const supabase = await createClient();
  // const prisma = new PrismaClient();

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
        mailingAddress: '',
      },
    });
  }

  const product = await db.product.findFirst();
  // console.log(product);

  // const order = await db.order.findUnique({
  //   where: { id: '3e18127c-129d-416c-924b-dc9b28a58f08' },
  //   include: {
  //     products: true,
  //   },
  // });
  // console.log(order);

  // {
  //   name: 'cucumber',
  //   priceInCents: 496,
  //   category: 'classic',
  //   image: [
  //     'https://utfs.io/f/0ddb1696-2aec-4758-bec1-584230797a84-1xbwrm.jpeg',
  //   ],
  //   description: 'dcasdlk asdfas asdfasdfa',
  //   isAvailable: true,
  // },
  // {
  //   name: 'salamander',
  //   priceInCents: 496,
  //   category: 'classic',
  //   image: [
  //     'https://utfs.io/f/0ddb1696-2aec-4758-bec1-584230797a84-1xbwrm.jpeg',
  //   ],
  //   description: 'dcasdlk asdfas asdfasdfa',
  //   isAvailable: true,
  // },

  // await db.order.create({
  //   data: {
  //     totalInCents: 45.8,
  //     userId: dbUser?.id as string,
  //     orderMailed: false,
  //   },
  // });

  return <div>Home</div>;
}

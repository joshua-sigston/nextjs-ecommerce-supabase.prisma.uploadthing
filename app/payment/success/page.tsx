import ClearCart from '@/app/(store)/_components/clear-cart-action';
import db from '@/lib/db';
import Link from 'next/link';
import React from 'react';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { orderID: string };
}) {
  const orderId = searchParams.orderID;
  // console.log(orderId);

  const userOrder = await db.order.update({
    where: { id: orderId },
    data: {
      isPaid: true,
    },
  });

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-secondary space-y-5">
      <h1 className="text-2xl font-semibold text-green-500">
        Payment Successful!
      </h1>
      <p className="text-lg">Thank you for your purchase.</p>
      <Link href="/" className="text-lg text-blue-400">
        Return To Store
      </Link>
      <ClearCart />
    </main>
  );
}

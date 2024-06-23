import ClearCart from '@/app/(store)/_components/clear-cart-action';
import db from '@/lib/db';
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
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <ClearCart />
    </div>
  );
}

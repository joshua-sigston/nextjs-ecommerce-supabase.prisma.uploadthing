'use client';
import { formatCurrency } from '@/lib/currencyFormats';
import useCartStore from '@/store/store';
import Image from 'next/image';
import React from 'react';
import AddButton from '../_components/add-button';
import RemoveButton from '../_components/remove-button';

export default function Cart() {
  const { cart } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0,
  );

  return (
    <div>
      {cart.map((item, index) => (
        <div key={index} className="flex items-center justify-around">
          <h4>{item.name}</h4>
          <Image
            src={`${item.image}`}
            height={100}
            width={100}
            alt="product image"
          />
          <div className="flex flex-col items-center justify-center">
            <div>
              <AddButton data={item} />
            </div>
            <p>{item.quantity}</p>
            <div>
              <RemoveButton data={item} />
            </div>
          </div>
          <p>{formatCurrency((item.priceInCents / 100) * item.quantity)}</p>
        </div>
      ))}
      <h4>Total: {formatCurrency(total / 100)}</h4>
    </div>
  );
}

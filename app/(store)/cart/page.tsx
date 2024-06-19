'use client';
import { formatCurrency } from '@/lib/currencyFormats';
import useCartStore from '@/store/store';
import Image from 'next/image';
import React from 'react';
import AddButton from '../_components/add-button';
import RemoveButton from '../_components/remove-button';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
import { Button } from '@/components/ui/button';
import { MakeOrder } from '@/app/actions';

export default function Cart() {
  const { cart, items } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0,
  );

  const totalCost = Number(total / 100);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const { data } = await axios.post('/api/create-checkout-session', {
        cart,
        totalCost,
      });

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

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
          <p>{formatCurrency(item.priceInCents / 100)}</p>
        </div>
      ))}
      <div>
        <h4>Total: ${totalCost}</h4>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
}

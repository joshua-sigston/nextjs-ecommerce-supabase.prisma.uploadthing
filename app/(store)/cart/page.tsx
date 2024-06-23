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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import RemoveAllButton from '../_components/empty-cart-button';

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

  if (cart.length === 0)
    return (
      <main className="h-screen flex items-center justify-center">
        <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
      </main>
    );

  return (
    <main className="mt-[5rem]">
      <h3 className="text-center font-semibold text-lg">Your Cart</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-8">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Image
                  src={`${item.image}`}
                  height={100}
                  width={100}
                  alt="product image"
                  className="rounded-sm"
                />
              </TableCell>
              <TableCell>
                <div className="text-center md:flex items-center justify-around">
                  <div className="md:hidden">
                    <AddButton data={item} />
                  </div>
                  {item.quantity}
                  <div className="hidden md:block">
                    <AddButton data={item} />
                  </div>
                  <div>
                    <RemoveButton data={item} />
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(item.priceInCents / 100)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <h4>Total: ${totalCost}</h4>
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
        <div>
          <RemoveAllButton />
        </div>
      </div>
    </main>
  );
}

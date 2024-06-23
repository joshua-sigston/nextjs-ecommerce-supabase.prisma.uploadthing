'use client';
import useCartStore from '@/store/store';
import React, { useEffect } from 'react';

export default function ClearCart() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, []);
  return <div></div>;
}

'use client';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/store';

import { Product } from '@prisma/client';
import React, { useState } from 'react';

export default function RemoveAllButton() {
  const { clearCart } = useCartStore();

  return (
    <>
      <Button
        onClick={() => {
          clearCart();
        }}
        className="w-[100%] bg-red-500"
      >
        Empty Cart
      </Button>
    </>
  );
}

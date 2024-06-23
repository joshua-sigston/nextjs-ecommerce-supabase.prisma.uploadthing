'use client';
import { Button } from '@/components/ui/button';

import useCartStore from '@/store/store';

import { Product } from '@prisma/client';
import React, { useState } from 'react';

interface Props {
  data: Product;
}

export default function AddButton({ data }: Props) {
  const item = useCartStore().cart.find((i) => i.id === data.id);
  const quantity = item?.quantity || 0;
  const [num, setNum] = useState(1);
  const { addItem } = useCartStore();

  return (
    <>
      <Button
        onClick={() => {
          addItem(data);
        }}
        className="w-[100%]"
      >
        {quantity > 0 ? '+' : 'Add to Cart'}
      </Button>
    </>
  );
}

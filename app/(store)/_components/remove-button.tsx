'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCartStore from '@/store/store';

import { Product } from '@prisma/client';
import React, { useState } from 'react';

interface Props {
  data: Product;
}

export default function RemoveButton({ data }: Props) {
  const item = useCartStore().cart.find((i) => i.id === data.id);
  const quantity = item?.quantity || 0;
  const [num, setNum] = useState(1);
  const { removeItem } = useCartStore();

  return (
    <>
      {quantity > 0 && (
        <Button
          onClick={() => {
            removeItem(data);
          }}
          className="w-[100%]"
        >
          -
        </Button>
      )}
    </>
  );
}

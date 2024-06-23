'use client';
import React from 'react';
import AddButton from './add-button';
import RemoveButton from './remove-button';
import { Product } from '@prisma/client';
import useCartStore from '@/store/store';

interface Props {
  data: Product;
}

export default function ProductButtons({ data }: Props) {
  const item = useCartStore().cart.find((i) => i.id === data.id);
  const quantity = item?.quantity || 0;

  return (
    <div className="flex items-center space-x-3">
      <div className="w-[150px] mx-auto">
        <AddButton data={data} />
      </div>
      {quantity > 0 && (
        <div className="w-[150px] mx-auto">
          <RemoveButton data={data} />
        </div>
      )}
    </div>
  );
}

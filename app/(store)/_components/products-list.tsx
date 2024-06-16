'use client';

import ProductCard from './product-card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '@prisma/client';
import { useState } from 'react';

interface Props {
  products: Product[];
}
export default function ProductsList({ products }: Props) {
  const [filter, setFilter] = useState('All');
  console.log(products);
  console.log(filter);
  const changeFilter = (value: string) => {
    setFilter(value);
  };
  return (
    <div className="pt-10">
      <div className="flex justify-center">
        <Select onValueChange={changeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Classic">Classic</SelectItem>
              <SelectItem value="Modern">Modern</SelectItem>
              <SelectItem value="Set">Sets</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] lg:m-auto">
        {products
          .filter((item) => {
            return filter === 'All'
              ? item
              : item.category.includes(filter.toLocaleLowerCase());
          })
          .map((item, index) => (
            <ProductCard {...item} />
          ))}
      </div>
    </div>
  );
}

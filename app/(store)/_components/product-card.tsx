'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/currencyFormats';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  priceInCents: number;
  description: string;
  id: string;
  image: string[];
}

export default function ProductCard({
  name,
  priceInCents,
  description,
  id,
  image,
}: Props) {
  return (
    <Card className="overflow-hidden relative shadow-lg lg:odd:row-span-2">
      <div className="absolute w-full h-full aspect-auto">
        <Image
          src={`${image[0]}`}
          height={300}
          width={300}
          className="w-full h-full object-cover"
          alt={name}
          priority={true}
        />
      </div>
      <div className="relative z-10 bg-gray-900/40 h-full w-full flex flex-col items-center justify-center text-white">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="text-center font-semibold text-white">
            {formatCurrency(priceInCents / 100)}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild size="lg" className="w-full">
            <Link href={`/products/${id}`}>See Product</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}

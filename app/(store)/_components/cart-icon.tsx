'use client';
import useCartStore from '@/store/store';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CartBtn() {
  // const [mounted, setMounted] = useState(false);
  const { items } = useCartStore();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  return (
    <div className="fixed right-3 top-10 lg:right-28">
      <Link href="/cart" className="flex space-x-3 items-center m-2">
        <ShoppingBag />
        <span>{items}</span>
      </Link>
    </div>
  );
}

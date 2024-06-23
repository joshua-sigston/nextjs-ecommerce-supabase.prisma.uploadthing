'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function Navigation() {
  return (
    <nav className="bg-secondary">
      <NavLinks />
    </nav>
  );
}

const links = [
  { href: '/admin', title: 'Dashboard' },
  { href: '/admin/products', title: 'Products' },
  { href: '/admin/users', title: 'Users' },
  { href: '/admin/orders', title: 'Orders' },
];

export function NavLinks() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex justify-evenly p-4">
      {links.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={cn(
            'p-2 rounded-sm shadow-md bg-background hover:bg-primary/70 hover:text-secondary focus-visible:bg-secondary focus-visible:text-secondary-foreground transition ease-in-out duration-300 font-semibold',
            pathname === `${link.href}` && 'text-secondary bg-primary',
          )}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/currencyFormats';
import db from '@/lib/db';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import DeleteDropDownItem from './_components/user-actions';

function getUsers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      _count: { select: { orders: true } },
      orders: { select: { totalInCents: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default function UsersPage() {
  return (
    <div>
      <UsersTable />
    </div>
  );
}

async function UsersTable() {
  const users = await getUsers();
  // console.log(users[0].orders[0].totalInCents);
  if (users.length === 0) return <h3>No Customers found</h3>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-8">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.orders.length}</TableCell>
            <TableCell>
              {formatCurrency(
                user.orders.reduce((sum, o) => o.totalInCents + sum, 0),
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

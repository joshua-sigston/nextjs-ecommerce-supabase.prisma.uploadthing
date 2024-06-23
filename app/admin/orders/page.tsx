import db from '@/lib/db';
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
import { MoreVertical } from 'lucide-react';
import { DeleteDropDownItem } from './_components/order-actions';
import { Suspense } from 'react';
import Spinner from '../_components/spinner';

function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      totalInCents: true,
      user: { select: { email: true } },
      isPaid: true,
      orderItems: { select: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OrdersTable />
    </Suspense>
  );
}

async function OrdersTable() {
  const orders = await getOrders();

  if (orders.length === 0) return <h3>No Orders Found</h3>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Order Items</TableHead>
          <TableHead>Order Total</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead className="w-8">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={index}>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>{order.orderItems.length}</TableCell>
            <TableCell>{order.totalInCents}</TableCell>
            <TableCell>{`${
              order.isPaid ? 'Completed' : 'No Completed'
            }`}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

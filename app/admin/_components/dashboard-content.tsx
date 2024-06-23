import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { formatCurrency, formatNumber } from '@/lib/currencyFormats';
import db from '@/lib/db';
import { Suspense } from 'react';
import LoadingCards from './loading-cards';

async function getOrderStatus() {
  const orderStatus = await db.order.findMany();

  let isPayed: number = 0;
  let notPayed: number = 0;
  let totalProfits: number = 0;

  const data = orderStatus.map((order) => {
    if (order.isPaid === true) {
      isPayed += 1;
      totalProfits += order.totalInCents;
    }

    if (order.isPaid === false) {
      notPayed += 1;
    }
  });

  console.log(isPayed, notPayed, totalProfits);
  return { isPayed, notPayed, totalProfits };
}

// async function getOrderData() {
//   await wait(2000);

//   const data = await db.order.aggregate({
//     _sum: { totalInCents: true },
//     _count: true,
//   });

//   // console.log(data);
//   return {
//     amount: (data._sum.totalInCents || 0) / 100,
//     numOfSales: data._count,
//   };
// }

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { totalInCents: true },
    }),
  ]);
  // console.log(userCount);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.totalInCents || 0) / userCount / 100,
  };
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailable: true } }),
    db.product.count({ where: { isAvailable: false } }),
  ]);

  return { activeCount, inactiveCount };
}

export default async function DashboardContent() {
  const [userData, productData, orderData] = await Promise.all([
    getUserData(),
    getProductData(),
    getOrderStatus(),
  ]);

  return (
    <Suspense fallback={<LoadingCards />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        <DashboardCard
          title="Orders Completed"
          subtitle={`Orders completed: ${orderData.isPayed}`}
          body={`Amount made: ${formatCurrency(orderData.totalProfits)}`}
        />
        <DashboardCard
          title="Orders Pending"
          subtitle={`Orders pending: ${orderData.notPayed}`}
          body={`Click to see order details`}
        />
        <DashboardCard
          title="Customer"
          subtitle={`${formatCurrency(
            userData.averageValuePerUser,
          )} average value`}
          body={formatNumber(userData.userCount)}
        />
        <DashboardCard
          title="Active Products"
          subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
          body={formatNumber(productData.activeCount)}
        />
      </div>
    </Suspense>
  );
}

type Props = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: Props) {
  return (
    <Card className="mx-auto min-w-[250px]">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}

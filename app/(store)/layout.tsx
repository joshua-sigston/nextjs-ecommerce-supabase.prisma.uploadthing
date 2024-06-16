import Navigation from '@/components/navigation';
import db from '@/lib/db';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CartBtn from './_components/cart-action';

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  // const prisma = new PrismaClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user?.email);

  if (!user) return redirect('/sign-in');

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email ?? '',
        role: 'customer',
      },
    });
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="p-3">
        {dbUser && <CartBtn />}
        {/* <Navigation /> */}
        {children}
      </body>
    </html>
  );
}

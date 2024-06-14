import db from '@/lib/db';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default async function Home() {
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

  return <div>Home</div>;
}

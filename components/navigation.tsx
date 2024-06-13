import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { signout } from '@/app/(auth)/actions';

export default async function Navigation() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user);

  return (
    <>
      <h1>navigation</h1>
      {user !== null ? (
        <form className="flex items-center gap-2" action={signout}>
          <p>{user?.email}</p>
          <Button>Sign Out</Button>
        </form>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </>
  );
}

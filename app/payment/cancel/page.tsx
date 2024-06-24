import Link from 'next/link';
import React from 'react';

export default async function CancelPage() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-secondary space-y-5">
      <h1 className="text-2xl font-semibold text-red-500">
        Oops Something Went Wrong
      </h1>
      <p className="text-lg">Thank you for your purchase.</p>
      <Link href="/" className="text-lg text-blue-400">
        Return To Store
      </Link>
    </main>
  );
}

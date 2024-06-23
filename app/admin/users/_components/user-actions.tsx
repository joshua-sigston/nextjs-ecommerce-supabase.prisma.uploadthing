'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { deleteUser } from '../../actions';

export default function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="text-red-500 font-semibold"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteUser(id);
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}

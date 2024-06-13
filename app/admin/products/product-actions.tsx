'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import { toggleProductAvailability, deleteProduct } from '../actions';
import { useRouter } from 'next/navigation';

export function ActiveToggleDropdownItem({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
          router.refresh();
        });
      }}
    >
      {!isAvailable ? 'Activate' : 'Deactivate'}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="text-red-500"
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}

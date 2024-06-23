import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Spinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="size-24 animate-spin" />
    </div>
  );
}

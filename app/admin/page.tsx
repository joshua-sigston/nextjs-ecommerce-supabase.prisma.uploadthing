import React, { Suspense } from 'react';
import DashboardContent from './_components/dashboard-content';
import DashboardSkeletons from './_components/dashoard-skeletons';

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={<DashboardSkeletons />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}

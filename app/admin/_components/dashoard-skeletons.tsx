import { DashbaordSkeleton } from './dashboard-skeleton';

export default function DashboardSkeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
      <DashbaordSkeleton />
      <DashbaordSkeleton />
      <DashbaordSkeleton />
      <DashbaordSkeleton />
    </div>
  );
}

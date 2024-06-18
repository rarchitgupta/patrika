import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDocument() {
  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-4 h-screen">
      <div className="px-6 py-4 lg:px-24 lg:pt-16 flex flex-col justify-center">
        <div className="flex flex-col gap-8 justify-between md:flex-row md:items-center">
          <Skeleton className="h-12 text-xl font-semibold md:text-3xl w-64" />
          <Skeleton className="h-8 text-xl font-semibold md:text-3xl w-64" />
        </div>
        <Skeleton className="h-8 w-32 mt-8" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col">
          <div className="px-6 py-4 lg:px-24 flex-1 overflow-auto">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full mt-8" />
            <Skeleton className="h-4 w-full mt-8" />
            <Skeleton className="h-4 w-full mt-8" />
            <Skeleton className="h-4 w-full mt-8" />
          </div>
        </div>
      </div>
    </main>
  );
}

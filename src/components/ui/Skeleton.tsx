export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-[#0f0f14] border border-[#27272f] overflow-hidden animate-pulse">
      <div className="w-full aspect-2/3 bg-[#18181f]" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-[#18181f] rounded w-3/4" />
        <div className="h-3 bg-[#18181f] rounded w-1/2" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#09090b] animate-pulse">
      <div className="h-100 w-full bg-[#0f0f14]" />
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="w-64 aspect-2/3 bg-[#18181f] rounded-2xl shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-[#18181f] rounded w-2/3" />
            <div className="h-4 bg-[#18181f] rounded w-1/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-[#18181f] rounded-full w-20" />
              <div className="h-6 bg-[#18181f] rounded-full w-24" />
              <div className="h-6 bg-[#18181f] rounded-full w-16" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-[#18181f] rounded w-full" />
              <div className="h-4 bg-[#18181f] rounded w-full" />
              <div className="h-4 bg-[#18181f] rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

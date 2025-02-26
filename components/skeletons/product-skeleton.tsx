import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="rounded-md border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-4 border-b last:border-b-0 px-6">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  )
}


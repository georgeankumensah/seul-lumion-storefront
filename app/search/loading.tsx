import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-xl mx-auto mb-8">
        <Skeleton className="h-10 w-full" />
      </div>
      <ProductGridSkeleton />
    </div>
  )
}


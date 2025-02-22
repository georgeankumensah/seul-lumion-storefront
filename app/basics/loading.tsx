import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-20 w-full" />
      </div>
      <ProductGridSkeleton />
    </div>
  )
}


import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Skeleton className="h-10 w-48 mb-8" />
      <ProductGridSkeleton />
    </div>
  )
}


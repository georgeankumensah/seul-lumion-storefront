import { ProductDetailSkeleton } from "@/components/skeletons/product-detail-skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <ProductDetailSkeleton />
    </div>
  )
}


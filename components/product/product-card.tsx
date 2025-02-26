"use client"

import Link from "next/link"
import type { Product } from "@/types"
import { Suspense } from "react"
import { ProductCardSkeleton } from "../skeletons/product-card-skeleton"
import { useLocale } from "@/lib/hooks/use-locale"
import { formatPrice } from "@/lib/utils/format"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, currency } = useLocale()

  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <Link href={`/products/${product.slug}`} className="group">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-sm">{product.name}</h3>
          <p className="text-sm text-gray-500">{formatPrice(product.price, currency, locale)}</p>
        </div>
      </Link>
    </Suspense>
  )
}


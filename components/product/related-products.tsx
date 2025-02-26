"use client"

import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/types"

interface RelatedProductsProps {
  currentProduct: Product
  maxProducts?: number
}

export function RelatedProducts({ currentProduct, maxProducts = 4 }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch products from the same category
        const res = await fetch(`/api/products?category=${currentProduct.category}`)
        if (!res.ok) throw new Error("Failed to fetch products")

        const data = await res.json()

        // Filter out current product and limit results
        const relatedProducts = data.filter((p: Product) => p.id !== currentProduct.id).slice(0, maxProducts)

        setProducts(relatedProducts)
      } catch (error) {
        console.error("Error fetching related products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProduct.id, currentProduct.category, maxProducts])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: maxProducts }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-gray-200 mb-2" />
            <div className="h-4 bg-gray-200 w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}


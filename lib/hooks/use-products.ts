"use client"

import useSWR from "swr"
import type { Product } from "@/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProducts(category?: string) {
  const url = category ? `/api/products?category=${category}` : "/api/products"

  const { data, error, isLoading, mutate } = useSWR<Product[]>(url, fetcher)

  return {
    products: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useProduct(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Product>(`/api/products/${id}`, fetcher)

  return {
    product: data,
    isLoading,
    isError: error,
    mutate,
  }
}


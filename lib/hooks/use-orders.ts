"use client"

import useSWR from "swr"
import type { Order } from "@/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useOrders() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>("/api/orders", fetcher)

  return {
    orders: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useOrder(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Order>(`/api/orders/${id}`, fetcher)

  return {
    order: data,
    isLoading,
    isError: error,
    mutate,
  }
}


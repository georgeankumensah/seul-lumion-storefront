"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useCoupons() {
  const { data, error, isLoading, mutate } = useSWR("/api/coupons", fetcher)

  return {
    coupons: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useCoupon(code: string) {
  const { data, error, isLoading, mutate } = useSWR(code ? `/api/coupons/${code}` : null, fetcher)

  return {
    coupon: data,
    isLoading,
    isError: error,
    mutate,
  }
}


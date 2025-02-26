"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useHomeContent() {
  const { data, error, isLoading, mutate } = useSWR("/api/home-content", fetcher)

  return {
    content: data,
    isLoading,
    isError: error,
    mutate,
  }
}


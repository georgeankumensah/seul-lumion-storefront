"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useSettings() {
  const { data, error, isLoading, mutate } = useSWR("/api/settings", fetcher)

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate,
  }
}


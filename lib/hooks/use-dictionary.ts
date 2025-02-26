"use client"

import { useEffect, useState } from "react"
import { useLocale } from "./use-locale"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export function useDictionary() {
  const { locale } = useLocale()
  const [dictionary, setDictionary] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale)
      setDictionary(dict)
    }
    loadDictionary()
  }, [locale])

  return dictionary
}


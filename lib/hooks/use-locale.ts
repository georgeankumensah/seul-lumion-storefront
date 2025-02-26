"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { LocaleSettings } from "@/types"
import { defaultLocale, defaultCurrency } from "@/lib/i18n/config"

interface LocaleStore extends LocaleSettings {
  setLocale: (locale: string) => void
  setCurrency: (currency: string) => void
}

export const useLocale = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      currency: defaultCurrency,
      setLocale: (locale: string) => set({ locale }),
      setCurrency: (currency: string) => set({ currency }),
    }),
    {
      name: "locale-storage",
    },
  ),
)


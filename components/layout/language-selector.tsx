"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { locales } from "@/lib/i18n/config"
import { useRouter, usePathname } from "next/navigation"

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleSelect = (locale: string) => {
    // In a real app, this would use Next.js internationalization routing
    // For demo purposes, we'll just store the locale preference
    localStorage.setItem("locale", locale)
    router.refresh()
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale.code} onClick={() => handleSelect(locale.code)}>
            {locale.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


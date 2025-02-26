"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { currencies } from "@/lib/i18n/config"
import { useRouter } from "next/navigation"

export function CurrencySelector() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleSelect = (currency: string) => {
    localStorage.setItem("currency", currency)
    router.refresh()
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DollarSign className="h-5 w-5" />
          <span className="sr-only">Select currency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem key={currency.code} onClick={() => handleSelect(currency.code)}>
            {currency.code} ({currency.symbol})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


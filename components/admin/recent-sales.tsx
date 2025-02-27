"use client"

import { useLocale } from "@/lib/hooks/use-locale"
import { formatPrice } from "@/lib/utils/format"

interface RecentSalesProps {
  products: Array<{
    product: {
      name: string
      id: string
    }
    totalSales: number
    revenue: number
  }>
}

export function RecentSales({ products }: RecentSalesProps) {
  const { locale, currency } = useLocale()

  return (
    <div className="space-y-8">
      {products.map((item) => (
        <div key={item.product.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">{item.totalSales} units sold</p>
          </div>
          <div className="ml-auto font-medium">{formatPrice(item.revenue, currency, locale)}</div>
        </div>
      ))}
    </div>
  )
}


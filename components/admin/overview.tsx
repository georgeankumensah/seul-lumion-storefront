"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useLocale } from "@/lib/hooks/use-locale"
import { formatPrice } from "@/lib/utils/format"

interface OverviewProps {
  data: Array<{
    _id: string
    total: number
  }>
}

export function Overview({ data }: OverviewProps) {
  const { locale, currency } = useLocale()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="_id" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatPrice(value, currency, locale)}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}


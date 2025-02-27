"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentSales } from "@/components/admin/recent-sales"
import { CreditCard, DollarSign, Package, Users } from "lucide-react"
import { getAnalytics } from "@/lib/api/admin"
import { useRealTimeAnalytics } from "@/lib/hooks/use-real-time"
import { formatPrice } from "@/lib/utils/format"
import { useLocale } from "@/lib/hooks/use-locale"

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<any>(null)
  const { locale, currency } = useLocale()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics()
        setAnalytics(data)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      }
    }
    fetchAnalytics()
  }, [])

  useRealTimeAnalytics((data) => {
    setAnalytics((prev: any) => ({
      ...prev,
      ...data,
    }))
  })

  if (!analytics) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(analytics.revenue, currency, locale)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.orders}</div>
            <p className="text-xs text-muted-foreground">{analytics.pendingOrders} pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.lowStock}</div>
            <p className="text-xs text-muted-foreground">Products need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.processingOrders}</div>
            <p className="text-xs text-muted-foreground">Orders in progress</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={analytics.dailyRevenue} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales products={analytics.topProducts} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


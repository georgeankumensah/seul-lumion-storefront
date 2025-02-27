import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/lib/models/order"
import Product from "@/lib/models/product"
import { getUser } from "@/lib/auth"
import { startOfDay, subDays } from "date-fns"

export async function GET(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "7d"

    const startDate = startOfDay(subDays(new Date(), period === "30d" ? 30 : period === "1y" ? 365 : 7))

    // Get orders
    const orders = await Order.find({
      createdAt: { $gte: startDate },
    })

    // Calculate revenue
    const revenue = orders.reduce((sum, order) => sum + order.total, 0)

    // Get product stats
    const products = await Product.find()
    const lowStock = products.filter((product) => product.stock < 10).length

    // Get order stats
    const pendingOrders = orders.filter((order) => order.status === "pending").length
    const processingOrders = orders.filter((order) => order.status === "processing").length

    // Calculate daily revenue
    const dailyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$total" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])

    // Get top products
    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.product",
          totalSales: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
      {
        $sort: { revenue: -1 },
      },
      {
        $limit: 5,
      },
    ])

    // Populate product details
    await Product.populate(topProducts, { path: "_id" })

    return NextResponse.json({
      revenue,
      orders: orders.length,
      lowStock,
      pendingOrders,
      processingOrders,
      dailyRevenue,
      topProducts: topProducts.map((item) => ({
        product: item._id,
        totalSales: item.totalSales,
        revenue: item.revenue,
      })),
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


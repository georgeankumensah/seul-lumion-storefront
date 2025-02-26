import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/lib/models/order"
import { getUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const filter = user.role === "admin" ? {} : { user: user.id }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const order = await Order.create({
      ...data,
      user: user.id,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


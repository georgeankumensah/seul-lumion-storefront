import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Coupon from "@/lib/models/coupon"
import { getUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const coupons = await Coupon.find().sort({ createdAt: -1 })
    return NextResponse.json(coupons)
  } catch (error) {
    console.error("Coupons fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const coupon = await Coupon.create(data)

    return NextResponse.json(coupon, { status: 201 })
  } catch (error) {
    console.error("Coupon creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


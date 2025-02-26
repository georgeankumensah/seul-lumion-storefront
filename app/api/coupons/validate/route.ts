import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Coupon from "@/lib/models/coupon"
import { getUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { code, subtotal, items } = await request.json()

    const coupon = await Coupon.findOne({ code: code.toUpperCase() })

    if (!coupon) {
      return NextResponse.json({ message: "Invalid coupon code" }, { status: 400 })
    }

    if (!coupon.isValid()) {
      return NextResponse.json({ message: "Coupon is not valid" }, { status: 400 })
    }

    // Check if user has already used this coupon
    // This would require tracking coupon usage per user in a separate collection

    const discount = coupon.calculateDiscount(subtotal)

    return NextResponse.json({
      valid: true,
      discount,
      coupon,
    })
  } catch (error) {
    console.error("Coupon validation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


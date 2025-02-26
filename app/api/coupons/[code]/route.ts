import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Coupon from "@/lib/models/coupon"
import { getUser } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { code: string } }) {
  try {
    await connectDB()

    const coupon = await Coupon.findOne({ code: params.code.toUpperCase() })

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 })
    }

    if (!coupon.isValid()) {
      return NextResponse.json({ message: "Coupon is not valid" }, { status: 400 })
    }

    return NextResponse.json(coupon)
  } catch (error) {
    console.error("Coupon fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { code: string } }) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const coupon = await Coupon.findOneAndUpdate({ code: params.code.toUpperCase() }, data, { new: true })

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json(coupon)
  } catch (error) {
    console.error("Coupon update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { code: string } }) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const coupon = await Coupon.findOneAndDelete({ code: params.code.toUpperCase() })

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Coupon deleted" })
  } catch (error) {
    console.error("Coupon deletion error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


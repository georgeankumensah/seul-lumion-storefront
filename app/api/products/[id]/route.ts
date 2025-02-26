import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/lib/models/product"
import { getUser } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const product = await Product.findById(params.id).populate("category")

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const product = await Product.findByIdAndUpdate(params.id, data, { new: true })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted" })
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


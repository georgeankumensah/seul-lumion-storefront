import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/lib/models/product"
import { getUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const query = searchParams.get("query")

    const filter: any = {}

    if (category) {
      filter.category = category
    }

    if (query) {
      filter.$or = [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }]
    }

    const products = await Product.find(filter).populate("category").sort({ createdAt: -1 })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Products fetch error:", error)
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
    const product = await Product.create(data)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


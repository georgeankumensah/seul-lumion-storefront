import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import HomeContent from "@/lib/models/home-content"
import { getUser } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()
    const content = await HomeContent.findOne()
    return NextResponse.json(content || {})
  } catch (error) {
    console.error("Home content fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const content = await HomeContent.findOneAndUpdate({}, data, { new: true, upsert: true })

    return NextResponse.json(content)
  } catch (error) {
    console.error("Home content update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


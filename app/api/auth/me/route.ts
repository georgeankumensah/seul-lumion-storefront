import { NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"

export async function GET(request: Request) {
  try {
    await connectDB()

    const payload = await getUser()
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findById(payload.id).select("-password")
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


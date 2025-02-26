import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Create token
    const token = await createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


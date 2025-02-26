import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    await connectDB()

    const { name, email, password } = await request.json()

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    })

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
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


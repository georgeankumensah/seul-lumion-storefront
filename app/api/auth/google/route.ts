import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"
import { createToken } from "@/lib/auth"
import { verifyGoogleToken } from "@/lib/auth/google"

export async function POST(request: Request) {
  try {
    await connectDB()

    const { token } = await request.json()
    const payload = await verifyGoogleToken(token)

    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Find or create user
    let user = await User.findOne({ email: payload.email })

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        password: Math.random().toString(36).slice(-8), // Random password for Google users
        googleId: payload.sub,
        emailVerified: true, // Google users are already verified
      })
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = payload.sub
      user.emailVerified = true
      await user.save()
    }

    // Create JWT token
    const jwtToken = await createToken({
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
    response.cookies.set("auth-token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Google auth error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


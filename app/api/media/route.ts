import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Media from "@/lib/models/media"
import { getUser } from "@/lib/auth"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    })

    // Save to database
    const media = await Media.create({
      name: file.name,
      url: blob.url,
      type: file.type,
      size: file.size,
      uploadedBy: user.id,
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error("Media upload error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const media = await Media.find().populate("uploadedBy", "name").sort({ createdAt: -1 })

    return NextResponse.json(media)
  } catch (error) {
    console.error("Media fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


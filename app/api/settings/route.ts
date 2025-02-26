// Fix settings API to handle localization
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Settings from "@/lib/models/settings"
import { getUser } from "@/lib/auth"
import { locales, currencies } from "@/lib/i18n/config"

export async function GET() {
  try {
    await connectDB()

    let settings = await Settings.findOne()

    // Initialize default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        localization: {
          defaultLanguage: "en",
          defaultCurrency: "USD",
          supportedLanguages: locales.map((locale) => ({
            ...locale,
            enabled: true,
          })),
          supportedCurrencies: currencies.map((currency) => ({
            ...currency,
            enabled: true,
          })),
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings fetch error:", error)
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

    // Validate localization settings
    if (data.localization) {
      if (!locales.find((l) => l.code === data.localization.defaultLanguage)) {
        return NextResponse.json({ message: "Invalid default language" }, { status: 400 })
      }
      if (!currencies.find((c) => c.code === data.localization.defaultCurrency)) {
        return NextResponse.json({ message: "Invalid default currency" }, { status: 400 })
      }
    }

    const settings = await Settings.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


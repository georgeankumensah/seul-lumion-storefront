import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

export async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    return ticket.getPayload()
  } catch (error) {
    console.error("Google token verification error:", error)
    return null
  }
}


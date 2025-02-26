import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-key-change-it")

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function getUser(req?: NextRequest) {
  const cookieStore = req ? req.cookies : cookies()
  const token = cookieStore.get("auth-token")

  if (!token) return null

  const payload = await verifyToken(token.value)
  return payload
}


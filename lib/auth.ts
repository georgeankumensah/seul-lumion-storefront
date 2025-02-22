import { useAuthStore, useUserStore } from "@/store"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || "default-secret-key-change-it")



export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function getUser() {
  
  const token =  useAuthStore.getState().token;

  if (!token) return null
  const payload = await verifyToken(token)
  useUserStore.setState({ user: payload })
  console.log({payload})
  return payload
}


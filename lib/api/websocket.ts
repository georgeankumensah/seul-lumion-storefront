import { io, type Socket } from "socket.io-client"

let socket: Socket | null = null
let reconnectAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5

export function initializeWebSocket() {
  if (!socket) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL
    if (!wsUrl) {
      console.error("WebSocket URL not configured")
      return null
    }

    socket = io(wsUrl, {
      reconnection: true,
      reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    socket.on("connect", () => {
      console.log("WebSocket connected")
      reconnectAttempts = 0
    })

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected")
    })

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error)
      reconnectAttempts++
    })

    socket.on("error", (error) => {
      console.error("WebSocket error:", error)
    })
  }

  return socket
}

export function getSocketStatus(): "connected" | "disconnected" | "connecting" {
  if (!socket) return "disconnected"
  return socket.connected ? "connected" : socket.connecting ? "connecting" : "disconnected"
}

export function subscribeToOrders(callback: (data: any) => void) {
  const ws = initializeWebSocket()
  if (!ws) return () => {}

  ws.on("new-order", callback)
  return () => {
    ws.off("new-order", callback)
  }
}

export function subscribeToInventory(callback: (data: any) => void) {
  const ws = initializeWebSocket()
  if (!ws) return () => {}

  ws.on("inventory-update", callback)
  return () => {
    ws.off("inventory-update", callback)
  }
}

export function subscribeToAnalytics(callback: (data: any) => void) {
  const ws = initializeWebSocket()
  if (!ws) return () => {}

  ws.on("analytics-update", callback)
  return () => {
    ws.off("analytics-update", callback)
  }
}

export function closeWebSocket() {
  if (socket) {
    socket.close()
    socket = null
    reconnectAttempts = 0
  }
}


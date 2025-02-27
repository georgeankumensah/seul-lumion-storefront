import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Order from "@/lib/models/order"
import Product from "@/lib/models/product"
import { Server } from "socket.io"
import { createServer } from "http"

// Initialize Socket.io server
const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log("Client connected")

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

httpServer.listen(process.env.WS_PORT || 3001)

export async function POST(request: Request) {
  try {
    await connectDB()

    const { type, data } = await request.json()

    switch (type) {
      case "order.created":
        // Handle new order
        const order = await Order.create(data)
        io.emit("new-order", order)
        break

      case "order.updated":
        // Handle order update
        const updatedOrder = await Order.findByIdAndUpdate(data.id, data, {
          new: true,
        })
        io.emit("order-update", updatedOrder)
        break

      case "inventory.updated":
        // Handle inventory update
        const product = await Product.findByIdAndUpdate(data.id, data, {
          new: true,
        })
        io.emit("inventory-update", product)
        break

      default:
        return NextResponse.json({ message: "Unknown webhook type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


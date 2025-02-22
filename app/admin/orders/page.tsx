"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderStatusBadge } from "@/components/admin/order-status-badge"
import { OrderDetails } from "@/components/admin/order-details"
import { format } from "date-fns"

const orders = [
  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    date: new Date(),
    status: "processing",
    total: 299.99,
    items: [{ id: "1", name: "Signature Leather Jacket", quantity: 1, price: 299.99 }],
  },
  // Add more orders...
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{format(order.date, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  )
}


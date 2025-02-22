import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OrderStatusBadge } from "./order-status-badge"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderDetailsProps {
  order: any
  onClose: () => void
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  if (!order) return null

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Customer Details</h3>
              <p className="text-sm text-gray-500">{order.customer}</p>
              <p className="text-sm text-gray-500">{order.email}</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">Order Status</h3>
              <div className="mt-1 space-y-2">
                <OrderStatusBadge status={order.status} />
                <Select defaultValue={order.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Order Items</h3>
            <div className="border rounded-lg divide-y">
              {order.items.map((item: any) => (
                <div key={item.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Order Date: {format(order.date, "MMM d, yyyy")}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


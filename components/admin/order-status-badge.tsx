import { Badge } from "@/components/ui/badge"

interface OrderStatusBadgeProps {
  status: string
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusStyles[status as keyof typeof statusStyles]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}


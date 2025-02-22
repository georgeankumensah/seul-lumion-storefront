import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import type { Product } from "@/types"

interface CartToastProps {
  product: Product
  size: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartToast({ product, size, open, onOpenChange }: CartToastProps) {
  return (
    <ToastProvider>
      <Toast open={open} onOpenChange={onOpenChange}>
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-100">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <ToastTitle>Added to Cart</ToastTitle>
            <ToastDescription className="mt-1">
              {product.name} - Size {size}
            </ToastDescription>
          </div>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}


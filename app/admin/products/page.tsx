"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductForm } from "@/components/admin/product-form"
import { useProducts } from "@/lib/hooks/use-products"
import { ProductSkeleton } from "@/components/skeletons/product-skeleton"
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const { products, isLoading, mutate } = useProducts()
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete product")

      mutate()
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  if (isLoading) return <ProductSkeleton />

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ProductForm
        open={isCreating || !!editingProduct}
        onClose={() => {
          setIsCreating(false)
          setEditingProduct(null)
        }}
        initialData={editingProduct}
        onSuccess={() => {
          mutate()
          setIsCreating(false)
          setEditingProduct(null)
        }}
      />
    </div>
  )
}


import type { Product, Order, Category, Settings } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL

// Products
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export async function createProduct(data: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create product")
  return res.json()
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return res.json()
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete product")
  return res.json()
}

// Orders
export async function getOrders() {
  const res = await fetch(`${BASE_URL}/api/orders`)
  if (!res.ok) throw new Error("Failed to fetch orders")
  return res.json()
}

export async function updateOrder(id: string, data: Partial<Order>) {
  const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update order")
  return res.json()
}

// Categories
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

export async function createCategory(data: Partial<Category>) {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create category")
  return res.json()
}

export async function updateCategory(id: string, data: Partial<Category>) {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update category")
  return res.json()
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete category")
  return res.json()
}

// Media
export async function uploadMedia(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${BASE_URL}/api/media`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload media")
  return res.json()
}

export async function deleteMedia(id: string) {
  const res = await fetch(`${BASE_URL}/api/media/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete media")
  return res.json()
}

// Settings
export async function getSettings() {
  const res = await fetch(`${BASE_URL}/api/settings`)
  if (!res.ok) throw new Error("Failed to fetch settings")
  return res.json()
}

export async function updateSettings(data: Partial<Settings>) {
  const res = await fetch(`${BASE_URL}/api/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update settings")
  return res.json()
}

// Analytics
export async function getAnalytics(period = "7d") {
  const res = await fetch(`${BASE_URL}/api/analytics?period=${period}`)
  if (!res.ok) throw new Error("Failed to fetch analytics")
  return res.json()
}


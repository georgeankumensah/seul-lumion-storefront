import type { Product } from "@/types"

export const products: Product[] = [
  {
    id: "1",
    name: "Signature Leather Jacket",
    slug: "signature-leather-jacket",
    price: 299.99,
    category: "jackets",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description: "Premium leather jacket with signature Peso branding.",
    details: [
      "100% genuine leather",
      "Signature embroidered logo",
      "Two side pockets",
      "Interior pocket",
      "Premium YKK zippers",
    ],
  },
  {
    id: "2",
    name: "Essential T-Shirt",
    slug: "essential-t-shirt",
    price: 49.99,
    category: "basics",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description: "Premium cotton t-shirt with a relaxed fit.",
    details: ["100% cotton", "Regular fit", "Crew neck", "Pre-shrunk", "Made in Portugal"],
  },
  // Add more products...
]


export interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  description: string
  details: string[]
  category: string
}

export interface CartItem extends Product {
  quantity: number
  size: string
}


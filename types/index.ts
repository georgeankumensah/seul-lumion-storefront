export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  sizes: string[]
  details: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  user: {
    id: string
    name: string
    email: string
  }
  items: {
    product: Product
    quantity: number
    size: string
    price: number
  }[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed"
  subtotal: number
  shippingCost: number
  total: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedBy: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface CartItem extends Product {
  quantity: number
  size: string
}

export interface CartState {
  items: CartItem[]
  coupon?: {
    code: string
    discount: number
    type: "percentage" | "fixed"
    value: number
  }
  total: number
  subtotal: number
}

export interface Settings {
  storeName: string
  storeEmail: string
  storePhone: string
  storeAddress: string
  maintenanceMode: boolean
  customerReviews: boolean
  inventoryNotifications: boolean
  notifications: {
    orderConfirmations: boolean
    shippingUpdates: boolean
    customerMessages: boolean
    reviewNotifications: boolean
  }
  shipping: {
    defaultMethod: string
    freeShippingThreshold: number
    methods: {
      name: string
      price: number
      estimatedDays: string
    }[]
  }
  payments: {
    stripe: {
      enabled: boolean
      testMode: boolean
      livePublicKey?: string
      liveSecretKey?: string
      testPublicKey?: string
      testSecretKey?: string
    }
    paypal: {
      enabled: boolean
      testMode: boolean
      liveClientId?: string
      liveSecretKey?: string
      testClientId?: string
      testSecretKey?: string
    }
    paystack: {
      enabled: boolean
      testMode: boolean
      livePublicKey?: string
      liveSecretKey?: string
      testPublicKey?: string
      testSecretKey?: string
    }
  }
  localization: {
    defaultLanguage: string
    defaultCurrency: string
    supportedLanguages: {
      code: string
      name: string
      enabled: boolean
    }[]
    supportedCurrencies: {
      code: string
      symbol: string
      enabled: boolean
    }[]
  }
}

export interface LocaleSettings {
  locale: string
  currency: string
}


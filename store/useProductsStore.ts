
import { create } from "zustand";

interface Variant {
  type: string;
  value: string;
}

interface Inventory {
  quantity: number;
  inStock: boolean;
}

export interface Product {
  _id: string;
  name: string;

  description: string;
  price: number;
  category: string;
  images:string[];
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  clearProducts: () => void;
}

const useProductsStore = create<ProductState>((set) => ({
  products: [
    {
      _id: "67b9181182828a1d5a94280a",
      name: "Wireless Bluetooth Headphones",
      description:
        "Noise-canceling over-ear headphones with Bluetooth 5.0 and up to 40 hours of battery life.",
      price: 99.99,
      category: "Electronics",
      images:[
        "/placeholder.svg","/placeholder.svg","/placeholder.svg","/placeholder.svg","/placeholder.svg"
      ],
      tags: ["wireless", "headphones", "bluetooth", "audio", "noise-canceling"],
      variants: [
        { type: "color", value: "black" },
        { type: "color", value: "white" },
        { type: "size", value: "standard" },
      ],
      inventory: {
        quantity: 150,
        inStock: true,
      },
    },
  ],

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    })),

  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? { ...product, ...updatedProduct } : product
      ),
    })),

  clearProducts: () => set({ products: [] }),
}));

export default useProductsStore;

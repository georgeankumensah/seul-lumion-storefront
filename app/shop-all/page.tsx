"use client"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductCard from "@/components/product/product-card"
import { useProductsStore } from "@/store";

export default function ShopAll() {
  const { products, addProduct, removeProduct, updateProduct, clearProducts } =
  useProductsStore();
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shop All</h1>

          <div className="flex gap-8">
            {/* Filters */}
            <div className="hidden lg:block w-64 space-y-6">
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {["All", "T-Shirts", "Jackets", "Pants", "Accessories"].map((category) => (
                    <label key={category} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-2">
                  {["$0 - $50", "$50 - $100", "$100 - $200", "$200+"].map((range) => (
                    <label key={range} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


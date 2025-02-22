import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductCard from "@/components/product/product-card"
import { products } from "@/lib/data"

export default function NewIn() {
  // Filter products to show only new arrivals (last 30 days)
  const newProducts = products.slice(0, 8) // Simulated new products

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


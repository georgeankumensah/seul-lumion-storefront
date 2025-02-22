import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${encodeURI("https://sjc.microlink.io/zRctH4H6Z5wn3giYQbL7pJ650JLWnuwoD-g6Inq0ULYxShjhmrD4V2wQEpq0Kganz0J5EPpzr9rQvLniZc7pXw.jpeg")})`,
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 pb-32">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">SPRING 2025</h1>
              <Button
                variant="secondary"
                className="bg-white text-black hover:bg-gray-100 rounded-none px-8 py-6 text-sm tracking-widest"
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Collection Cards */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] relative overflow-hidden group">
                  <img
                    src={`/placeholder.svg?height=600&width=400`}
                    alt={`Collection ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Collection {i}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}


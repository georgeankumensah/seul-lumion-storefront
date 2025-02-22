import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function Loyalty() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Peso Rewards</h1>
            <p className="text-gray-600">
              Join our loyalty program and earn points with every purchase. Redeem your points for exclusive rewards and
              early access to new collections.
            </p>
          </div>

          {/* Tiers Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Silver",
                spend: "0-500",
                perks: ["Earn 1 point per $1", "Birthday reward", "Free shipping"],
              },
              {
                name: "Gold",
                spend: "501-1000",
                perks: ["Earn 1.5 points per $1", "Early access to sales", "Exclusive events"],
              },
              {
                name: "Platinum",
                spend: "1000+",
                perks: ["Earn 2 points per $1", "Priority customer service", "Free alterations"],
              },
            ].map((tier) => (
              <div key={tier.name} className="border p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-500 mb-4">${tier.spend}</p>
                <ul className="space-y-2 mb-6">
                  {tier.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-2">Join the Program</h3>
                  <p className="text-gray-600">
                    Sign up for a Peso account and automatically enroll in our rewards program.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-2">Earn Points</h3>
                  <p className="text-gray-600">Make purchases and earn points based on your tier level.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-2">Redeem Rewards</h3>
                  <p className="text-gray-600">Use your points for discounts, exclusive products, and special perks.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}


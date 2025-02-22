import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <Tabs defaultValue="orders" className="max-w-4xl">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <div className="space-y-6">
                <div className="border p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-medium">Order #12345</p>
                      <p className="text-sm text-gray-500">Placed on Feb 22, 2024</p>
                    </div>
                    <Button variant="outline">View Order</Button>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100">
                      <img src="/placeholder.svg" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Essential T-Shirt</p>
                      <p className="text-sm text-gray-500">Size: M • Quantity: 1</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border p-6">
                  <h3 className="font-medium mb-4">Shipping Address</h3>
                  <p>John Doe</p>
                  <p>123 Main St</p>
                  <p>Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <Button variant="outline" className="mt-4">
                    Edit
                  </Button>
                </div>
                <div className="border p-6">
                  <h3 className="font-medium mb-4">Billing Address</h3>
                  <p>John Doe</p>
                  <p>123 Main St</p>
                  <p>Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <Button variant="outline" className="mt-4">
                    Edit
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="max-w-md space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <p className="text-gray-500">john@example.com</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Newsletter</h3>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Subscribe to our newsletter</span>
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CustomerDetailsProps {
  customer: any
  onClose: () => void
}

export function CustomerDetails({ customer, onClose }: CustomerDetailsProps) {
  if (!customer) return null

  return (
    <Dialog open={!!customer} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium">Contact Information</h3>
                <p className="text-sm text-gray-500">{customer.name}</p>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>

              <div>
                <h3 className="font-medium">Account Statistics</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-lg font-medium">{customer.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-lg font-medium">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-lg font-medium">{format(customer.joinDate, "MMM d, yyyy")}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              {/* Placeholder for order history */}
              <p className="text-sm text-gray-500">No orders found.</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


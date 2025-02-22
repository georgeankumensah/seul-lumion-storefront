export function TopProducts() {
  const products = [
    { name: "Signature Leather Jacket", sales: 124, revenue: 37076.76 },
    { name: "Essential T-Shirt", sales: 89, revenue: 4450.11 },
    { name: "Classic Denim", sales: 65, revenue: 6435.35 },
    { name: "Winter Coat", sales: 54, revenue: 21546.0 },
    { name: "Summer Shorts", sales: 42, revenue: 2089.58 },
  ]

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.name} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.sales} sales</p>
          </div>
          <div className="text-right">
            <p className="font-medium">${product.revenue.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


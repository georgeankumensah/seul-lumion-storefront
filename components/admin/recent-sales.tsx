export function RecentSales() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Customer {i}</p>
            <p className="text-sm text-muted-foreground">customer{i}@example.com</p>
          </div>
          <div className="ml-auto font-medium">+${(Math.random() * 1000).toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}


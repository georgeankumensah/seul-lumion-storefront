import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Skeleton className="h-10 w-48 mb-8" />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 py-6 border-b">
              <Skeleton className="w-24 h-24" />
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-5" />
                </div>
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


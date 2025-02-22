import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/new-in" className="text-lg">
            NEW IN
          </Link>
          <Link href="/shop-all" className="text-lg">
            SHOP ALL
          </Link>
          <Link href="/basics" className="text-lg">
            BASICS
          </Link>
          <Link href="/brand" className="text-lg">
            BRAND
          </Link>
          <Link href="/loyalty" className="text-lg">
            LOYALTY
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}


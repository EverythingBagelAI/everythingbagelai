"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-background px-4">
      <div className="flex items-center gap-6 lg:gap-10">
        <Link href="/" className="font-sans text-xl font-semibold text-blue-600">
          EverythingBagelAI
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <Link
          href="/chat"
          className={cn(
            "font-sans text-sm font-medium transition-colors hover:text-blue-600",
            pathname.startsWith("/chat") ? "text-blue-600" : "text-muted-foreground"
          )}
        >
          Chat
        </Link>
        <Link
          href="/directory"
          className={cn(
            "font-sans text-sm font-medium transition-colors hover:text-blue-600",
            pathname.startsWith("/directory") ? "text-blue-600" : "text-muted-foreground"
          )}
        >
          Directory
        </Link>
      </div>
    </nav>
  )
}


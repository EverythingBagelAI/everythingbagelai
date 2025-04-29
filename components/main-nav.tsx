"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-background px-4">
      <div className="flex items-center gap-6 lg:gap-10">
        <Link href="/" className="font-mono text-xl font-semibold gradient-text">
          EverythingBagelAI
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <Link
          href="/consulting"
          className={cn(
            "font-mono text-sm transition-all hover:font-bold",
            pathname.startsWith("/consulting") ? "font-bold gradient-text" : "text-muted-foreground hover:gradient-text"
          )}
        >
          Consulting
        </Link>
      </div>
    </nav>
  )
}


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-background px-4">
      <div className="flex items-center gap-6 lg:gap-10">
        <Link href="/" className="text-xl font-bold text-primary">
          EverythingBagelAI
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <Link
          href="/chat"
          className={cn(
            "text-sm transition-colors hover:text-primary",
            pathname === "/chat" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          Chat
        </Link>
        <Link
          href="/directory"
          className={cn(
            "text-sm transition-colors hover:text-primary",
            pathname === "/directory" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          Directory
        </Link>
      </div>
    </nav>
  )
}


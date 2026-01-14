"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { AuroraText } from "@/components/ui/aurora-text"

export function MainNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b bg-background px-4 transition-all duration-300",
        isScrolled && "backdrop-blur-md bg-background/80 shadow-sm"
      )}
    >
      <div className="flex items-center gap-6 lg:gap-10">
        <Link
          href="/"
          className="font-mono text-xl font-semibold transition-all duration-300 hover:scale-110 hover:rotate-2"
        >
          <AuroraText
            colors={["#9333EA", "#4F46E5", "#DB2777", "#2DD4BF", "#9333EA"]}
            speed={1.25}
          >
            EverythingBagelAI
          </AuroraText>
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-6">
        <Link
          href="/consulting"
          className={cn(
            "font-mono text-sm transition-all duration-300 hover:font-bold relative group",
            pathname.startsWith("/consulting") ? "font-bold gradient-text" : "text-muted-foreground"
          )}
        >
          Book a Call
          <span
            className={cn(
              "absolute -bottom-1 left-0 h-0.5 w-0 rainbow-animate transition-all duration-300 group-hover:w-full",
              pathname.startsWith("/consulting") && "w-full"
            )}
          />
        </Link>
      </div>
    </nav>
  )
}


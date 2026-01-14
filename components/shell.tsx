"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { Sidebar } from "@/components/sidebar"

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const pathname = usePathname()
  const shouldShowSidebar = !pathname.startsWith("/consulting") &&
                          pathname !== "/" &&
                          !pathname.includes("/coming-soon")
  const isHomepage = pathname === "/"

  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      {shouldShowSidebar && <Sidebar onCollapsedChange={setIsSidebarCollapsed} />}
      <main
        className={cn(
          "transition-all duration-300",
          !isHomepage && "pt-14 flex-1",
          isHomepage && "overflow-y-auto snap-y snap-mandatory h-screen overflow-x-hidden",
          shouldShowSidebar && (isSidebarCollapsed ? "pl-16" : "pl-64")
        )}
      >
        {isHomepage ? (
          children
        ) : (
          <div className="container py-6 h-[calc(100vh-3.5rem)]">{children}</div>
        )}
      </main>
    </div>
  )
}


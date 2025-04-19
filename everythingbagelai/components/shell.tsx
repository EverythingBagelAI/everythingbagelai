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

  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      {shouldShowSidebar && <Sidebar onCollapsedChange={setIsSidebarCollapsed} />}
      <main 
        className={cn(
          "flex-1 pt-14 transition-all duration-300",
          shouldShowSidebar && (isSidebarCollapsed ? "pl-16" : "pl-64")
        )}
      >
        <div className="container py-6 h-[calc(100vh-3.5rem)]">{children}</div>
      </main>
    </div>
  )
}


"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Bot, Code, FileCode, LayoutPanelLeft, PanelLeftClose, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import Link from "next/link"

interface NavItem {
  title: string
  icon: React.ElementType
  href: string
}

interface ChatHistoryItem {
  id: string
  title: string
  chatType: "coding" | "automation" | "prd" | "ai-apps"
  timestamp: string
}

const chatNavItems: NavItem[] = [
  {
    title: "Coding",
    icon: Code,
    href: "/chat/coding",
  },
  {
    title: "Automation",
    icon: Rocket,
    href: "/chat/automation",
  },
  {
    title: "PRD",
    icon: FileCode,
    href: "/chat/prd",
  },
  {
    title: "AI Applications",
    icon: Bot,
    href: "/chat/ai-apps",
  },
]

const directoryNavItems: NavItem[] = [
  {
    title: "AI Applications",
    icon: Bot,
    href: "/directory/applications",
  },
  {
    title: "Automations",
    icon: Rocket,
    href: "/directory/automations",
  },
]

const chatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "React Component Optimization",
    chatType: "coding",
    timestamp: "2h ago",
  },
  {
    id: "2",
    title: "Email Automation Workflow",
    chatType: "automation",
    timestamp: "3h ago",
  },
  {
    id: "3",
    title: "E-commerce App PRD",
    chatType: "prd",
    timestamp: "5h ago",
  },
  {
    id: "4",
    title: "AI Image Generator Integration",
    chatType: "ai-apps",
    timestamp: "1d ago",
  },
]

const getChatTypeIcon = (type: ChatHistoryItem["chatType"]): React.ElementType => {
  const icons = {
    coding: Code,
    automation: Rocket,
    prd: FileCode,
    "ai-apps": Bot,
  }
  return icons[type]
}

interface SidebarProps {
  onCollapsedChange: (collapsed: boolean) => void
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-[11px] outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-[11px]",
        sm: "h-7 text-[11px]",
        lg: "h-10 text-xs group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export function Sidebar({ onCollapsedChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()

  const navItems = pathname.startsWith("/chat") ? chatNavItems : directoryNavItems

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
    onCollapsedChange(!isCollapsed)
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background transition-all duration-300",
        isCollapsed && "w-16",
      )}
    >
      <div className="flex h-12 items-center justify-between border-b px-4">
        <span className={cn("text-sm font-medium", isCollapsed && "hidden")}>
          {pathname.startsWith("/chat") ? "Chat Options" : "Directory"}
        </span>
        <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="h-8 w-8">
          {isCollapsed ? <LayoutPanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-7rem)]">
        <div className="space-y-1 p-2">
          {navItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className={cn(
                sidebarMenuButtonVariants(),
                isCollapsed ? "justify-center" : "justify-start",
                pathname === item.href && "bg-muted",
              )}
            >
              <Link href={item.href}>
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2", isCollapsed && "mx-auto")} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            </Button>
          ))}
        </div>

        {pathname.startsWith("/chat") && (
          <>
            <Separator className="my-2 mx-2" />
            <div className="space-y-1 p-2">
              {chatHistory.map((chat) => {
                const ChatIcon = getChatTypeIcon(chat.chatType)
                return (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className={cn(
                      sidebarMenuButtonVariants(),
                      isCollapsed ? "justify-center" : "justify-start",
                      "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <ChatIcon className={cn("h-4 w-4", !isCollapsed && "mr-2", isCollapsed && "mx-auto")} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start text-left">
                        <span className="truncate w-full text-[11px]">{chat.title}</span>
                        <span className="text-[9px] text-muted-foreground">{chat.timestamp}</span>
                      </div>
                    )}
                  </Button>
                )
              })}
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  )
}


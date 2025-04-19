import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BentoGridProps {
  className?: string
  children?: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn("flex flex-col gap-3 max-w-3xl mx-auto", className)}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  className?: string
  Icon?: React.ElementType
  name: string
  description: string
  features?: string[]
  emoji?: string
  offer?: string
  onClick?: () => void
}

export function BentoCard({
  className,
  Icon,
  name,
  description,
  features,
  emoji,
  offer,
  onClick,
}: BentoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-background transition-all hover:border-primary hover:bg-muted/50 w-full",
        className
      )}
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-6 w-6" />}
              {emoji && <span className="text-xl">{emoji}</span>}
              <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
            </div>
            <span className={cn(
              "text-lg transition-transform",
              isExpanded ? "rotate-180" : ""
            )}>
              ↓
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className={cn(
        "grid transition-all duration-200 ease-in-out",
        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}>
        <div className="overflow-hidden">
          <div className="p-4 pt-0 space-y-4">
            {features && features.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Key Features</h4>
                <ul className="grid gap-1.5 text-sm">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-primary">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {offer && (
              <div className="space-y-2">
                <h4 className="font-medium">Special Offer</h4>
                <p className="text-sm text-muted-foreground">{offer}</p>
              </div>
            )}
            <div className="pt-2">
              <Button variant="rainbow" size="sm" onClick={onClick} className="w-full">
                Schedule Consultation <span className="ml-2">✨</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
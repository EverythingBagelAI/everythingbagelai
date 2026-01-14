import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@heroicons/react/24/outline"
import { GlowingEffect } from "@/components/ui/glowing-effect"

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

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji: string
  title: string
  description: string
  features: string[]
  className?: string
  onClick?: () => void
}

export const BentoCard = ({
  emoji,
  title,
  description,
  features,
  className,
  onClick,
  ...props
}: BentoCardProps) => {
  return (
    <div className="relative rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
      <GlowingEffect
        spread={50}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={4}
      />
      <div
        className={cn(
          "group/bento relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div>
          <div className="mb-4 flex items-center gap-4">
            <span className="text-2xl transition-transform duration-300 group-hover/bento:scale-110">{emoji}</span>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              {title}
            </h3>
          </div>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
          <ul className="mb-4 space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckIcon className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs py-1 transition-all duration-300 group-hover/bento:rainbow-animate group-hover/bento:text-white group-hover/bento:shadow-sm group-hover/bento:hover:shadow-lg group-hover/bento:hover:brightness-110 group-hover/bento:border-none animate-glow-pulse"
          >
            Schedule Consultation <span className="ml-1">✨</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ComingSoonProps {
  title: string
  returnPath?: string
}

export function ComingSoon({ title, returnPath = "/" }: ComingSoonProps) {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center gap-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {title} <span className="inline-block">🚀</span>
          </h1>
          <p className="text-muted-foreground">
            We&apos;re working hard to bring you something amazing.
          </p>
        </div>
        <div className="mt-4">
          <Button asChild variant="rainbow" size="lg">
            <Link href={returnPath}>
              Return Home <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 
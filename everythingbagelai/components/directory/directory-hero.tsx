import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DirectoryHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Discover the Best in AI
          </h1>
          <p className="mx-auto max-w-[700px] text-lg sm:text-xl text-muted-foreground">
            Explore our curated collection of AI applications and automation tools to supercharge your workflow.
          </p>
          <Button asChild variant="rainbow" size="lg" className="mt-6">
            <Link href="/directory/applications">Explore Directory</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


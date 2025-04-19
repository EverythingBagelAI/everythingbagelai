import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const sections = [
  {
    title: "AI Applications",
    description: "Discover and compare cutting-edge AI tools and services",
    emoji: "🤖",
    href: "/directory/applications",
    features: ["Detailed reviews", "Feature comparisons", "Integration guides", "User ratings"],
  },
  {
    title: "Automations",
    description: "Explore ready-to-use automation workflows and templates",
    emoji: "⚡",
    href: "/directory/automations",
    features: ["Step-by-step guides", "Tool compatibility", "Complexity ratings", "Community favorites"],
  },
]

const categories = [
  {
    name: "Productivity",
    description: "Tools to enhance your daily workflow",
    emoji: "⚡",
  },
  {
    name: "Content Creation",
    description: "AI-powered creative assistants",
    emoji: "✍️",
  },
  {
    name: "Data Analysis",
    description: "Intelligent data processing solutions",
    emoji: "📊",
  },
  {
    name: "Development",
    description: "Tools for developers and engineers",
    emoji: "👩‍💻",
  },
]

export default function DirectoryPage() {
  return (
    <div className="container space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          AI Directory <span className="inline-block animate-bounce">🌟</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Your curated gateway to the world of AI applications and automation solutions.
        </p>
        <div className="mt-6">
          <Button asChild variant="rainbow" size="lg">
            <Link href="/directory/applications">
              Explore Directory <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="transition-colors hover:bg-muted/50">
            <Link href={section.href}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{section.emoji}</span>
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription className="mt-2">{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  {section.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-primary">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            How to Use the Directory <span className="inline-block">🎯</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Find the perfect tools for your needs in three simple steps</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="font-mono text-base">Browse & Filter</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use our powerful filters to narrow down your search
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4">
                  <span className="text-3xl">🧠</span>
                </div>
                <h3 className="font-mono text-base">Compare & Evaluate</h3>
                <p className="mt-2 text-sm text-muted-foreground">Review detailed ratings and user feedback</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="font-mono text-base">Implement & Integrate</h3>
                <p className="mt-2 text-sm text-muted-foreground">Follow our guides to get started quickly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Popular Categories <span className="inline-block">🔥</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Explore tools by category</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.name} className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{category.emoji}</span>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


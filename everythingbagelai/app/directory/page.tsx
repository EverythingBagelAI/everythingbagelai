import { ArrowRight, Bot, Brain, Rocket, Search, Target, Zap } from "lucide-react"
import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const sections = [
  {
    title: "AI Applications",
    description: "Discover and compare cutting-edge AI tools and services",
    icon: Bot,
    href: "/directory/applications",
    emoji: "🤖",
    features: ["Detailed reviews", "Feature comparisons", "Integration guides", "User ratings"],
  },
  {
    title: "Automations",
    description: "Explore ready-to-use automation workflows and templates",
    icon: Rocket,
    href: "/directory/automations",
    emoji: "⚡",
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
    <Shell>
      <div className="container space-y-12 py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            AI Directory <span className="inline-block animate-bounce">🌟</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Your curated gateway to the world of AI applications and automation solutions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} className="transition-colors hover:bg-muted/50">
              <Link href={section.href}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <section.icon className="h-5 w-5" />
                    <span className="text-2xl">{section.emoji}</span>
                  </div>
                  <CardTitle className="mt-4">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {section.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
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
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Browse & Filter</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Use our powerful filters to narrow down your search
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Compare & Evaluate</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Review detailed ratings and user feedback</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Implement & Integrate</h3>
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

        <div className="text-center">
          <Button asChild size="lg" className="animate-pulse">
            <Link href="/directory/applications">
              Explore Directory <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Shell>
  )
}


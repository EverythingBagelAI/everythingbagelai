import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    emoji: "🔍",
    title: "Code Review",
    description: "Get detailed feedback on your code quality, style, and potential improvements",
  },
  {
    emoji: "🐛",
    title: "Debugging",
    description: "Identify and fix bugs with step-by-step guidance and explanations",
  },
  {
    emoji: "⚡",
    title: "Optimization",
    description: "Improve code performance and efficiency with targeted recommendations",
  },
  {
    emoji: "📚",
    title: "Learning",
    description: "Understand complex code concepts with clear, detailed explanations",
  },
]

const languages = [
  {
    emoji: "🐍",
    title: "Python",
    description: "Web development, data science, automation, and more",
  },
  {
    emoji: "⚛️",
    title: "JavaScript/TypeScript",
    description: "Frontend, backend, and full-stack development",
  },
  {
    emoji: "☕",
    title: "Java",
    description: "Enterprise applications and Android development",
  },
  {
    emoji: "🦀",
    title: "Rust",
    description: "Systems programming and high-performance applications",
  },
]

export default function CodingChatPage() {
  return (
    <div className="container space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Code Assistant <span className="inline-block">👨‍💻</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Your AI pair programmer for code review, debugging, optimization, and learning.
        </p>
        <div className="mt-6">
          <Button asChild variant="rainbow" size="lg">
            <Link href="/chat">
              Start Coding <span className="ml-2">✨</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Features <span className="inline-block">⚡</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Comprehensive code assistance powered by advanced AI
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{feature.emoji}</span>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Supported Languages <span className="inline-block">🌐</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Get assistance across multiple programming languages
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((language) => (
            <Card key={language.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{language.emoji}</span>
                  <CardTitle className="text-lg">{language.title}</CardTitle>
                </div>
                <CardDescription>{language.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            How It Works <span className="inline-block">⚙️</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Simple steps to get started with code assistance</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl">1</span>
                </div>
                <h3 className="font-semibold">Share Your Code</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paste your code or describe your programming challenge
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl">2</span>
                </div>
                <h3 className="font-semibold">Specify Your Needs</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose the type of assistance you need
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl">3</span>
                </div>
                <h3 className="font-semibold">Get Solutions</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Receive detailed guidance and solutions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


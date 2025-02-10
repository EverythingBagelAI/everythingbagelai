import { Bot, Code, FileCode, Rocket, Sparkles } from "lucide-react"
import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    icon: Code,
    title: "Code Assistant",
    description: "Get help with code review, debugging, optimization, and explanations",
    href: "/chat/coding",
  },
  {
    icon: Rocket,
    title: "Automation Expert",
    description: "Design and troubleshoot automation workflows across various tools",
    href: "/chat/automation",
  },
  {
    icon: FileCode,
    title: "PRD Companion",
    description: "Create comprehensive product requirement documents with structured guidance",
    href: "/chat/prd",
  },
  {
    icon: Bot,
    title: "AI Applications Guide",
    description: "Navigate the AI landscape with personalized recommendations",
    href: "/chat/ai-apps",
  },
]

const benefits = [
  {
    title: "Context-Aware Responses",
    description: "Get tailored assistance based on your specific needs and use case",
    emoji: "🎯",
  },
  {
    title: "Continuous Learning",
    description: "Access an AI that stays updated with the latest industry practices",
    emoji: "📚",
  },
  {
    title: "Time Savings",
    description: "Accelerate your workflow with instant, relevant assistance",
    emoji: "⚡",
  },
  {
    title: "Knowledge Integration",
    description: "Seamlessly combine insights across different domains",
    emoji: "🧩",
  },
]

export default function ChatPage() {
  return (
    <Shell>
      <div className="container space-y-12 py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Your Intelligent Chat Assistant <span className="inline-block animate-bounce">✨</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Specialized AI assistance across multiple domains, designed to enhance your productivity and
            decision-making.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-colors hover:bg-muted/50">
              <Link href={feature.href}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              How It Works <span className="inline-block">⚡</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Simple steps to get started with our chat assistant</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-medium">1</span>
                  </div>
                  <h3 className="font-semibold">Choose Your Domain</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select the specialized assistant that matches your needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-medium">2</span>
                  </div>
                  <h3 className="font-semibold">Select Context</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Choose a specific context to get more relevant responses
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-medium">3</span>
                  </div>
                  <h3 className="font-semibold">Start Chatting</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get instant, tailored assistance for your queries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              Key Benefits <span className="inline-block">✨</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Why our chat assistant stands out</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{benefit.emoji}</span>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="animate-pulse">
            <Link href="/chat/coding">
              Get Started <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Shell>
  );
}


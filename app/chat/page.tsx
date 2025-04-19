import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    emoji: "👨‍💻",
    title: "Code Assistant",
    description: "Get help with code review, debugging, optimization, and explanations",
    href: "/chat/coding",
  },
  {
    emoji: "🚀",
    title: "Automation Expert",
    description: "Design and troubleshoot automation workflows across various tools",
    href: "/chat/automation",
  },
  {
    emoji: "📝",
    title: "PRD Companion",
    description: "Create comprehensive product requirement documents with structured guidance",
    href: "/chat/prd",
  },
  {
    emoji: "🤖",
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
    <div className="container space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Your Intelligent Chat Assistant <span className="inline-block animate-bounce">✨</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Specialized AI assistance across multiple domains, designed to enhance your productivity and
          decision-making.
        </p>
        <div className="mt-6">
          <Button asChild variant="rainbow" size="lg">
            <Link href="/chat/coding">
              Get Started <span className="ml-2">✨</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-colors hover:bg-muted/50">
            <Link href={feature.href}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{feature.emoji}</span>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
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
                  <span className="text-2xl">{benefit.emoji}</span>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


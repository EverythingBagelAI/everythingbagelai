import { Shell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Globe, Heart, Share2, Star, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// This would typically come from an API or database
const application = {
  id: 1,
  name: "AI Writer Pro",
  summary: "Advanced AI-powered content creation tool",
  description: `AI Writer Pro is a cutting-edge content creation tool that leverages advanced AI algorithms to help you produce high-quality, engaging content in minutes. Whether you're a marketer, blogger, or business owner, AI Writer Pro streamlines your writing process and enhances your productivity.

Our tool uses state-of-the-art natural language processing to understand context, maintain consistency, and generate human-like text that resonates with your target audience.`,
  category: "Content Creation",
  subcategory: "Writing",
  type: "Premium",
  pricing: {
    basic: {
      name: "Basic",
      price: "$29/month",
      features: ["Up to 50,000 words per month", "Basic templates", "Email support", "1 user seat"],
    },
    pro: {
      name: "Professional",
      price: "$79/month",
      features: ["Unlimited words", "Advanced templates", "Priority support", "5 user seats", "API access"],
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Custom word limit",
        "Custom templates",
        "Dedicated support",
        "Unlimited seats",
        "Advanced API access",
        "Custom integrations",
      ],
    },
  },
  features: [
    {
      title: "AI-Powered Writing",
      description: "Generate high-quality content using advanced AI algorithms",
    },
    {
      title: "Multiple Languages",
      description: "Support for over 25 languages with native-quality output",
    },
    {
      title: "SEO Optimization",
      description: "Built-in SEO tools to ensure your content ranks well",
    },
    {
      title: "Templates",
      description: "Wide variety of templates for different content types",
    },
    {
      title: "Plagiarism Checker",
      description: "Ensure your content is unique and original",
    },
  ],
  rating: {
    pricing: {
      score: 4,
      reason: "Competitive pricing with flexible plans for different needs",
    },
    functionality: {
      score: 5,
      reason: "Comprehensive feature set with excellent AI capabilities",
    },
    accessibility: {
      score: 4,
      reason: "Intuitive interface with good documentation",
    },
  },
  likes: 342,
  website: "https://aiwriterpro.com",
  logo: "/placeholder.svg?height=80&width=80",
  redditSentiment: {
    overallScore: 0.7,
    breakdown: {
      positive: 70,
      neutral: 20,
      negative: 10,
    },
    representativeComments: [
      {
        text: "AI Writer Pro has significantly improved my content creation workflow. It's a game-changer!",
        sentiment: "positive",
      },
      {
        text: "The tool is good, but the learning curve can be steep for some features.",
        sentiment: "neutral",
      },
      {
        text: "I found some inconsistencies in the generated content. It still requires careful editing.",
        sentiment: "negative",
      },
    ],
  },
  alternatives: [
    {
      id: 2,
      name: "ContentForge AI",
      summary: "AI-powered content creation with a focus on SEO optimization",
      category: "Content Creation",
      subcategory: "Writing",
      type: "Paid",
      logo: "/placeholder.svg?height=40&width=40",
      likes: 256,
    },
    {
      id: 3,
      name: "ScribeGenius",
      summary: "Versatile writing assistant with strong language translation features",
      category: "Content Creation",
      subcategory: "Writing",
      type: "Freemium",
      logo: "/placeholder.svg?height=40&width=40",
      likes: 189,
    },
    {
      id: 4,
      name: "NarrativeFlow",
      summary: "Storytelling-focused AI writer for creative content",
      category: "Content Creation",
      subcategory: "Writing",
      type: "Premium",
      logo: "/placeholder.svg?height=40&width=40",
      likes: 301,
    },
  ],
}

const getGrade = (score: number): { grade: string; color: string } => {
  if (score >= 0.9) return { grade: "A+", color: "text-green-500" }
  if (score >= 0.8) return { grade: "A", color: "text-green-500" }
  if (score >= 0.7) return { grade: "B+", color: "text-green-400" }
  if (score >= 0.6) return { grade: "B", color: "text-green-400" }
  if (score >= 0.5) return { grade: "C+", color: "text-yellow-500" }
  if (score >= 0.4) return { grade: "C", color: "text-yellow-500" }
  if (score >= 0.3) return { grade: "D+", color: "text-orange-500" }
  if (score >= 0.2) return { grade: "D", color: "text-orange-500" }
  return { grade: "F", color: "text-red-500" }
}

export default function ApplicationPage() {
  const { grade, color } = getGrade(application.redditSentiment.overallScore)

  return (
    <Shell>
      <div className="container space-y-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{application.name}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{application.category}</Badge>
              <Badge variant="outline">{application.subcategory}</Badge>
              <Badge>{application.type}</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Globe className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{application.description}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {application.features.map((feature, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(application.rating).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{key}</span>
                    <div className="flex items-center">
                      {Array.from({ length: value.score }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                      {Array.from({ length: 5 - value.score }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-muted-foreground" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{value.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.values(application.pricing).map((plan) => (
                <div key={plan.name} className="space-y-4 rounded-lg border p-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-bold">{plan.price}</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reddit Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Sentiment Grade</span>
              <span className={`text-3xl font-bold ${color}`}>{grade}</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Sentiment Breakdown</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4 text-green-500" />
                  <span>{application.redditSentiment.breakdown.positive}%</span>
                </div>
                <div className="flex items-center">
                  <Minus className="mr-1 h-4 w-4 text-yellow-500" />
                  <span>{application.redditSentiment.breakdown.neutral}%</span>
                </div>
                <div className="flex items-center">
                  <ThumbsDown className="mr-1 h-4 w-4 text-red-500" />
                  <span>{application.redditSentiment.breakdown.negative}%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Representative Comments</h3>
              {application.redditSentiment.representativeComments.map((comment, index) => (
                <div key={index} className="rounded-lg bg-muted p-3">
                  <p className="text-sm">{comment.text}</p>
                  <Badge
                    variant={
                      comment.sentiment === "positive"
                        ? "default"
                        : comment.sentiment === "neutral"
                          ? "secondary"
                          : "destructive"
                    }
                    className="mt-2"
                  >
                    {comment.sentiment}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alternatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {application.alternatives.map((alt) => (
                <Link href={`/directory/applications/${alt.id}`} key={alt.id} className="block">
                  <Card className="overflow-hidden transition-colors hover:bg-muted/50">
                    <CardHeader className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={alt.logo} alt={`${alt.name} logo`} />
                          <AvatarFallback>{alt.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{alt.name}</h3>
                          <Badge>{alt.type}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{alt.summary}</p>
                    </CardContent>
                    <CardFooter className="p-4 flex flex-col items-start gap-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="w-auto">
                          {alt.category}
                        </Badge>
                        <Badge variant="outline" className="w-auto">
                          {alt.subcategory}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="cursor-help">
                          👍 {alt.likes}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}


import { Shell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Heart, Share2, Star } from "lucide-react"

// This would typically come from an API or database
const automation = {
  id: 1,
  name: "Email Marketing Workflow",
  creator: "Marketing Wizards Inc.",
  summary: "Automate your email marketing campaigns with personalized content and scheduled sending",
  description: `This comprehensive email marketing automation workflow streamlines your entire email campaign process. From subscriber segmentation to personalized content delivery and performance tracking, this automation handles it all efficiently.

  Built with best practices in mind, this workflow ensures your emails reach the right audience at the right time, maximizing engagement and conversion rates.`,
  category: "Marketing",
  subcategory: "Email",
  complexity: "Moderate",
  tool: "n8n",
  steps: [
    {
      title: "Subscriber Segmentation",
      description: "Automatically segment your subscribers based on behavior, preferences, and demographics",
      details: [
        "Import subscriber data from your CRM",
        "Apply segmentation rules based on custom criteria",
        "Create dynamic lists that update automatically",
        "Export segmented lists to your email platform",
      ],
    },
    {
      title: "Content Personalization",
      description: "Generate personalized email content for each segment using AI-powered tools",
      details: [
        "Template selection based on segment",
        "Dynamic content insertion",
        "Personalized subject lines",
        "A/B testing setup",
      ],
    },
    {
      title: "Scheduled Sending",
      description: "Set up optimal sending times for each segment to maximize open rates",
      details: [
        "Time zone-based scheduling",
        "Engagement time optimization",
        "Frequency management",
        "Queue management",
      ],
    },
    {
      title: "Performance Tracking",
      description: "Track key metrics like open rates, click-through rates, and conversions",
      details: ["Real-time analytics dashboard", "Custom metric tracking", "Automated reporting", "Performance alerts"],
    },
  ],
  requirements: {
    tools: ["Email marketing platform (e.g., Mailchimp, SendGrid)", "CRM system", "n8n instance"],
    apis: ["Email platform API", "CRM API", "Analytics API"],
    access: ["Admin access to email platform", "API credentials", "Database access"],
  },
  rating: {
    efficiency: {
      score: 5,
      reason: "Significantly reduces manual work and improves campaign timing",
    },
    reliability: {
      score: 4,
      reason: "Stable performance with good error handling and recovery",
    },
    maintainability: {
      score: 4,
      reason: "Well-documented and modular design makes updates easy",
    },
  },
  likes: 256,
}

export default function AutomationPage() {
  return (
    <Shell>
      <div className="container space-y-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{automation.name}</h1>
              <p className="text-muted-foreground">Created by {automation.creator}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{automation.category}</Badge>
              <Badge variant="outline">{automation.subcategory}</Badge>
              <Badge>{automation.tool}</Badge>
              <Badge variant="outline">{automation.complexity}</Badge>
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
              Import Workflow
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{automation.description}</p>
              <div className="space-y-6">
                {automation.steps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm">
                          <span className="mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(automation.rating).map(([key, value]) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(automation.requirements).map(([key, items]) => (
                  <div key={key} className="space-y-2">
                    <h3 className="font-semibold capitalize">{key}</h3>
                    <ul className="space-y-2">
                      {items.map((item, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  )
}


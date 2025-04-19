import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const applications = [
  {
    id: 1,
    name: "AI Writer Pro",
    summary: "Advanced AI-powered content creation tool",
    category: "AI Applications",
    subcategory: "Writing",
    type: "Premium",
    logo: "/placeholder.svg?height=40&width=40",
    rank: 1,
    likes: 342,
    rating: {
      pricing: {
        score: 4,
        reason:
          "Offers a competitive monthly subscription with a free trial, making it accessible for various user needs.",
      },
      functionality: {
        score: 5,
        reason:
          "Provides a comprehensive set of AI-powered writing tools, covering everything from content ideation to final editing.",
      },
      accessibility: {
        score: 4,
        reason:
          "Intuitive interface with good documentation, though some advanced features may require a learning curve.",
      },
    },
  },
  {
    id: 2,
    name: "AutoTask Master",
    summary: "Intelligent task automation for businesses",
    category: "Automations",
    subcategory: "Workflow",
    type: "Paid",
    logo: "/placeholder.svg?height=40&width=40",
    rank: 2,
    likes: 256,
    rating: {
      pricing: {
        score: 3,
        reason: "Slightly higher price point, but offers scalable plans for businesses of different sizes.",
      },
      functionality: {
        score: 5,
        reason: "Extensive automation capabilities with integrations for most popular business tools and platforms.",
      },
      accessibility: {
        score: 4,
        reason:
          "User-friendly interface with drag-and-drop functionality, though some complex automations may require technical knowledge.",
      },
    },
  },
  // Add more mock applications here
]

const ratingEmojis = {
  pricing: "💰",
  functionality: "⚙️",
  accessibility: "♿",
}

const ratingTitles = {
  pricing: "Pricing",
  functionality: "Functionality",
  accessibility: "Accessibility",
}

interface DirectoryGridProps {
  category?: string
  subcategory?: string
  type?: string
}

export function DirectoryGrid({ category, subcategory, type }: DirectoryGridProps) {
  const filteredApplications = applications.filter(
    (app) =>
      (!category || app.category === category) &&
      (!subcategory || app.subcategory === subcategory) &&
      (!type || app.type === type),
  )

  return (
    <TooltipProvider>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((app) => (
            <Link href={`/directory/applications/${app.id}`} key={app.id} className="block">
              <Card className="overflow-hidden transition-colors hover:bg-muted/50">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={app.logo} alt={`${app.name} logo`} />
                      <AvatarFallback>{app.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{app.name}</h3>
                      <Badge>{app.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{app.summary}</p>
                </CardContent>
                <CardFooter className="p-4 flex flex-col items-start gap-2">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="w-auto">
                        {app.category} - Rank #{app.rank}
                      </Badge>
                      <Badge variant="outline" className="w-auto">
                        {app.subcategory}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {Object.entries(app.rating).map(([key, value]) => (
                        <Tooltip key={key}>
                          <TooltipTrigger>
                            <Badge variant="outline" className="cursor-help">
                              {ratingEmojis[key as keyof typeof ratingEmojis]} {value.score}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="w-64 p-0">
                            <div className="p-3">
                              <div className="flex items-center mb-2">
                                <span className="text-lg mr-2">{ratingEmojis[key as keyof typeof ratingEmojis]}</span>
                                <span className="font-semibold">{ratingTitles[key as keyof typeof ratingTitles]}</span>
                              </div>
                              <p className="text-sm">{value.reason}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="cursor-help">
                            👍 {app.likes}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Number of likes</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}


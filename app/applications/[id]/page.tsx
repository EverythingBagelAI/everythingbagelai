import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Globe, Heart, Share2, Star, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Database } from "@/types/supabase"

type Application = Database['public']['Tables']['applications']['Row'] & {
  categories: { name: string }
  sub_categories: { name: string } | null
  reddit_sentiment?: {
    overallScore: number
    breakdown: {
      positive: number
      neutral: number
      negative: number
    }
    representativeComments: Array<{
      text: string
      sentiment: 'positive' | 'neutral' | 'negative'
    }>
  }
  pricing_rating?: number
  functionality_rating?: number
  accessibility_rating?: number
}

type ApplicationPreview = Pick<Application, 'id' | 'name' | 'logo_url' | 'summary' | 'type'> & {
  categories: { name: string }
  sub_categories: { name: string } | null
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

async function getApplication(id: string): Promise<Application | null> {
  const supabase = await createClient()
  const { data: application } = await supabase
    .from("applications")
    .select(`
      *,
      categories:category_id(name),
      sub_categories:sub_category_id(name)
    `)
    .eq("id", id)
    .single()

  return application
}

async function getAlternatives(categoryId: string, currentId: string): Promise<ApplicationPreview[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("applications")
    .select(`
      id,
      name,
      logo_url,
      summary,
      type,
      categories:category_id(name),
      sub_categories:sub_category_id(name)
    `)
    .eq("category_id", categoryId)
    .neq("id", currentId)
    .limit(3)

  return (data || []).map(item => ({
    ...item,
    categories: { name: item.categories?.[0]?.name || 'Uncategorized' },
    sub_categories: item.sub_categories?.[0]?.name ? { name: item.sub_categories[0].name } : null
  })) as ApplicationPreview[]
}

export default async function ApplicationPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)

  if (!application) {
    notFound()
  }

  const alternatives = await getAlternatives(application.category_id, application.id)
  const redditSentiment = application.reddit_sentiment || {
    overallScore: 0.7,
    breakdown: { positive: 70, neutral: 20, negative: 10 },
    representativeComments: [
      {
        text: "This tool has significantly improved my workflow!",
        sentiment: "positive",
      },
      {
        text: "It's good but has a learning curve.",
        sentiment: "neutral",
      },
      {
        text: "Some features need improvement.",
        sentiment: "negative",
      },
    ],
  }

  const { grade, color } = getGrade(redditSentiment.overallScore)

  return (
    <div className="container max-w-7xl space-y-6 py-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={application.logo_url || ""} alt={`${application.name} logo`} />
              <AvatarFallback className="text-2xl">{application.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{application.name}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{application.categories.name}</Badge>
                <Badge variant="outline">{application.sub_categories?.name || 'None'}</Badge>
                <Badge>{application.type}</Badge>
              </div>
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
            {application.website_url && (
              <Button size="sm" asChild>
                <Link href={application.website_url} target="_blank">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* About Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{application.summary}</p>
            {application.key_features && (
              <div>
                <h3 className="mb-3 font-semibold">Key Features</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(application.key_features as string[]).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ratings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { key: "pricing", score: application.pricing_rating },
              { key: "functionality", score: application.functionality_rating },
              { key: "accessibility", score: application.accessibility_rating },
            ].map(({ key, score }) => (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{key}</span>
                  <div className="flex items-center">
                    {Array.from({ length: score || 0 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - (score || 0) }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-muted-foreground" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reddit Sentiment Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reddit Sentiment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium">Overall Sentiment Grade</span>
            <span className={`text-3xl font-bold ${color}`}>{grade}</span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-3 font-semibold">Sentiment Breakdown</h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                  <span>{redditSentiment.breakdown.positive}%</span>
                </div>
                <div className="flex items-center">
                  <Minus className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{redditSentiment.breakdown.neutral}%</span>
                </div>
                <div className="flex items-center">
                  <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                  <span>{redditSentiment.breakdown.negative}%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Representative Comments</h3>
              <div className="grid gap-3">
                {redditSentiment.representativeComments.map((comment: any, index: number) => (
                  <div key={index} className="rounded-lg bg-muted p-4">
                    <p className="text-sm leading-relaxed">{comment.text}</p>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternatives Section */}
      {alternatives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Alternatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alternatives.map((alt) => (
                <Link href={`/applications/${alt.id}`} key={alt.id} className="block">
                  <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={alt.logo_url || ""} alt={`${alt.name} logo`} />
                          <AvatarFallback>{alt.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-1 items-center justify-between">
                          <h3 className="font-semibold line-clamp-1">{alt.name}</h3>
                          <Badge>{alt.type}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground min-h-[2.5rem]">{alt.summary}</p>
                    </CardContent>
                    <CardFooter className="p-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="w-auto">
                          {alt.categories?.name || 'Uncategorized'}
                        </Badge>
                        <Badge variant="outline" className="w-auto">
                          {alt.sub_categories?.name || 'None'}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 
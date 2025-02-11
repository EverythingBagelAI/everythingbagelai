import { Bot, ExternalLink, Youtube } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface Application {
  id: string
  name: string
  logo_url: string | null
  type: string
}

interface Automation {
  id: string
  name: string
  creator: string | null
  functionality: string | null
  video_link: string | null
  recipe: string | null
  youtube_transcript: string | null
  categories: { name: string }
  sub_categories: { name: string }
  applications: Application[]
  category_id: string
}

interface SimilarAutomation {
  id: string
  name: string
  creator: string | null
  functionality: string | null
  categories: { name: string }
  sub_categories: { name: string }
}

interface SupabaseAutomation {
  id: string
  name: string
  creator: string | null
  functionality: string | null
  categories: { name: string }[]
  sub_categories: { name: string }[]
}

async function getAutomation(id: string) {
  const supabase = createClient()
  
  // First, get the automation with its categories
  const { data: automation, error } = await supabase
    .from("automations")
    .select(`
      *,
      categories:category_id(name),
      sub_categories:sub_category_id(name)
    `)
    .eq("id", id)
    .single()

  console.log('Raw automation data:', automation)
  console.log('Error if any:', error)

  if (error || !automation) {
    throw new Error("Automation not found")
  }

  // Then fetch the applications if they exist
  let applications: Application[] = []
  if (automation.applications_utilized && automation.applications_utilized.length > 0) {
    const { data: appsData, error: appsError } = await supabase
      .from("applications")
      .select("id, name, logo_url, type")
      .in("id", automation.applications_utilized)

    console.log('Applications data:', appsData)
    console.log('Applications error if any:', appsError)

    if (!appsError && appsData) {
      applications = appsData
    }
  }

  // Construct the full automation object
  const fullAutomation: Automation = {
    id: automation.id,
    name: automation.name,
    creator: automation.creator,
    functionality: automation.functionality,
    video_link: automation.video_link,
    recipe: automation.recipe,
    youtube_transcript: automation.youtube_transcript,
    categories: automation.categories,
    sub_categories: automation.sub_categories,
    applications: applications,
    category_id: automation.category_id
  }

  console.log('Full automation object:', fullAutomation)
  return fullAutomation
}

async function getSimilarAutomations(categoryId: string, currentId: string) {
  const supabase = createClient()
  const { data: automations, error } = await supabase
    .from("automations")
    .select(`
      id,
      name,
      creator,
      functionality,
      category_id,
      sub_category_id,
      categories:category_id(name),
      sub_categories:sub_category_id(name)
    `)
    .eq("category_id", categoryId)
    .neq("id", currentId)
    .limit(3)

  if (error || !automations) {
    return []
  }

  return automations.map(automation => {
    const categoryName = Array.isArray(automation.categories) 
      ? automation.categories[0]?.name 
      : automation.categories?.name
    
    const subCategoryName = Array.isArray(automation.sub_categories)
      ? automation.sub_categories[0]?.name
      : automation.sub_categories?.name

    return {
      id: automation.id,
      name: automation.name,
      creator: automation.creator,
      functionality: automation.functionality,
      categories: { name: categoryName || "" },
      sub_categories: { name: subCategoryName || "" }
    }
  }) as SimilarAutomation[]
}

export default async function AutomationPage({ params }: { params: { id: string } }) {
  const automation = await getAutomation(params.id)
  const similarAutomations = await getSimilarAutomations(automation.category_id, automation.id)

  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{automation.name}</h1>
            {automation.creator && (
              <p className="text-muted-foreground">Created by {automation.creator}</p>
            )}
          </div>
          {automation.video_link && (
            <Button variant="outline" asChild>
              <a href={automation.video_link} target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-4 w-4" />
                Watch Demo
              </a>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{automation.categories.name}</Badge>
          <Badge variant="outline">{automation.sub_categories.name}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Functionality</CardTitle>
            <CardDescription>What this automation does</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">{automation.functionality}</p>
          </CardContent>
        </Card>

        {automation.applications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Applications Used</CardTitle>
              <CardDescription>Tools required for this automation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automation.applications.map((app) => (
                  <div key={app.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      {app.logo_url ? (
                        <AvatarImage src={app.logo_url} alt={app.name} />
                      ) : (
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{app.name}</h4>
                      <p className="text-sm text-muted-foreground">{app.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {automation.recipe && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Step-by-Step Recipe</CardTitle>
              <CardDescription>Follow these steps to implement the automation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-line rounded-lg bg-muted p-4 font-mono text-sm">
                  {automation.recipe}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {automation.youtube_transcript && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Video Walkthrough</CardTitle>
              <CardDescription>Detailed explanation from the demo video</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {automation.youtube_transcript}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {similarAutomations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Similar Automations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {similarAutomations.map((similar) => (
              <Link key={similar.id} href={`/automations/${similar.id}`}>
                <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{similar.name}</CardTitle>
                    {similar.creator && (
                      <CardDescription>Created by {similar.creator}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {similar.functionality}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{similar.categories.name}</Badge>
                        <Badge variant="outline">{similar.sub_categories.name}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
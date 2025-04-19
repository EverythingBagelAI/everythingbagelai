"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bot } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Application {
  id: string
  name: string
  logo_url: string | null
}

interface DatabaseAutomation {
  id: string
  name: string
  creator: string | null
  functionality: string | null
  video_link: string | null
  category_id: string
  sub_category_id: string
  applications_utilized: string[] | null
  complexity: string
  categories: { name: string }
  sub_categories: { name: string }
}

interface Automation extends Omit<DatabaseAutomation, 'category_id' | 'sub_category_id'> {
  applications: Application[]
}

export function AutomationsGrid() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    async function fetchAutomations() {
      setIsLoading(true)
      try {
        const categories = searchParams.get("categories")?.split(",")
        const subCategories = searchParams.get("subCategories")?.split(",")
        const search = searchParams.get("search")

        let query = supabase
          .from("automations")
          .select(`
            *,
            categories:category_id(name),
            sub_categories:sub_category_id(name)
          `)
          .order("created_at", { ascending: false })

        if (categories && categories.length > 0) {
          query = query.in("category_id", categories)
        }

        if (subCategories && subCategories.length > 0) {
          query = query.in("sub_category_id", subCategories)
        }

        if (search) {
          query = query.ilike("name", `%${search}%`)
        }

        const { data: automationsData, error } = await query

        if (error) {
          console.error("Error fetching automations:", error)
          return
        }

        console.log("Fetched automations:", automationsData)

        // Fetch applications data for the utilized applications
        let applicationsData: Application[] = []
        if (automationsData && automationsData.length > 0) {
          const allAppIds = automationsData.flatMap(a => a.applications_utilized || [])
          if (allAppIds.length > 0) {
            const { data: apps } = await supabase
              .from("applications")
              .select("id, name, logo_url")
              .in("id", allAppIds)
            applicationsData = apps || []
          }
        }

        // Map applications to automations
        const automationsWithApps = (automationsData || []).map((automation: DatabaseAutomation) => ({
          ...automation,
          applications: (automation.applications_utilized || [])
            .map(appId => applicationsData.find(app => app.id === appId))
            .filter((app): app is Application => !!app)
        }))

        console.log("Transformed automations:", automationsWithApps)
        setAutomations(automationsWithApps)
      } catch (error) {
        console.error("Error in fetchAutomations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAutomations()
  }, [searchParams, supabase])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-[200px] animate-pulse" />
        ))}
      </div>
    )
  }

  if (!automations || automations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <Bot className="h-8 w-8 text-muted-foreground" />
        <h3 className="font-semibold">No automations found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {automations.map((automation) => (
        <Link key={automation.id} href={`/automations/${automation.id}`}>
          <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">{automation.name}</h3>
              </div>
              {automation.creator && (
                <p className="text-sm text-muted-foreground">
                  Created by {automation.creator}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {automation.functionality}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{automation.categories.name}</Badge>
                  <Badge variant="outline">{automation.sub_categories.name}</Badge>
                  {automation.complexity && (
                    <Badge variant="outline" className="ml-auto">
                      {automation.complexity}
                    </Badge>
                  )}
                </div>
                {automation.applications && automation.applications.length > 0 && (
                  <div className="flex -space-x-2">
                    {automation.applications.map((app) => (
                      <Avatar key={app.id} className="h-8 w-8 border-2 border-background">
                        {app.logo_url ? (
                          <AvatarImage src={app.logo_url} alt={app.name} />
                        ) : (
                          <AvatarFallback>
                            {app.name.substring(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}


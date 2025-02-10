"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bot } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

interface Automation {
  id: string
  name: string
  creator: string | null
  functionality: string | null
  video_link: string | null
  categories: { name: string }
  sub_categories: { name: string }
  applications_utilized: string[] | null
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
        const category = searchParams.get("category")
        const subCategory = searchParams.get("subCategory")
        const search = searchParams.get("search")

        let query = supabase
          .from("automations")
          .select(`
            *,
            categories:category_id(name),
            sub_categories:sub_category_id(name)
          `)
          .order("created_at", { ascending: false })

        if (category) {
          query = query.eq("category_id", category)
        }
        if (subCategory) {
          query = query.eq("sub_category_id", subCategory)
        }

        const { data, error } = await query.limit(12)

        if (error) {
          console.error("Error fetching automations:", error)
          return
        }

        setAutomations(data)
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="h-[200px] animate-pulse" />
        ))}
      </div>
    )
  }

  if (automations.length === 0) {
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {automations.map((automation) => (
        <Link key={automation.id} href={`/automations/${automation.id}`}>
          <Card className="h-full cursor-pointer p-6 transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-muted-foreground" />
                <h3 className="font-semibold">{automation.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{automation.functionality}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{automation.categories.name}</Badge>
                <Badge variant="outline">{automation.sub_categories.name}</Badge>
              </div>
              {automation.applications_utilized && automation.applications_utilized.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {automation.applications_utilized.map((app, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {app}
                    </Badge>
                  ))}
                </div>
              )}
              {automation.creator && (
                <div className="text-sm text-muted-foreground">
                  Created by {automation.creator}
                </div>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}


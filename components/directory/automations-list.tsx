"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bot } from "lucide-react"
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

export function AutomationsList() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const supabase = createClient()
  const category = searchParams.get('category')

  useEffect(() => {
    async function fetchAutomations() {
      setLoading(true)
      try {
        const subCategory = searchParams.get("subCategory")
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
        setLoading(false)
      }
    }

    fetchAutomations()
  }, [category, supabase])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
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
    <div className="space-y-4">
      {automations.map((automation) => (
        <Link key={automation.id} href={`/automations/${automation.id}`}>
          <div className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
            <Bot className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold">{automation.name}</h3>
                {automation.creator && (
                  <p className="text-sm text-muted-foreground">
                    Created by {automation.creator}
                  </p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{automation.functionality}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{automation.categories.name}</Badge>
                <Badge variant="outline">{automation.sub_categories.name}</Badge>
                {automation.applications_utilized && automation.applications_utilized.length > 0 && (
                  automation.applications_utilized.map((app, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {app}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 
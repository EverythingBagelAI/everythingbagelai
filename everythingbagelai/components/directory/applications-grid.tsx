"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bot } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

interface Application {
  id: string
  name: string
  summary: string
  logo_url: string | null
  type: 'Free' | 'Premium' | 'Paid'
  categories: { name: string }
  sub_categories: { name: string }
  pricing_rating: number | null
  functionality_rating: number | null
  accessibility_rating: number | null
}

export function ApplicationsGrid() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    async function fetchApplications() {
      setIsLoading(true)
      try {
        const category = searchParams.get("category")
        const subCategory = searchParams.get("subCategory")
        const type = searchParams.get("type")
        const search = searchParams.get("search")

        let query = supabase
          .from("applications")
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
        if (type && type !== "all") {
          query = query.eq("type", type)
        }
        if (search) {
          query = query.textSearch("search_text", search)
        }

        const { data, error } = await query.limit(12)

        if (error) {
          console.error("Error fetching applications:", error)
          return
        }

        setApplications(data)
      } catch (error) {
        console.error("Error in fetchApplications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
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

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <Bot className="h-8 w-8 text-muted-foreground" />
        <h3 className="font-semibold">No applications found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {applications.map((app) => (
        <Link key={app.id} href={`/applications/${app.id}`}>
          <Card className="h-full cursor-pointer p-6 transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {app.logo_url ? (
                  <img
                    src={app.logo_url}
                    alt={app.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <Bot className="h-8 w-8 text-muted-foreground" />
                )}
                <h3 className="font-semibold">{app.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{app.summary}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{app.categories.name}</Badge>
                <Badge variant="outline">{app.sub_categories.name}</Badge>
                <Badge variant="outline">{app.type}</Badge>
              </div>
              {(app.pricing_rating || app.functionality_rating || app.accessibility_rating) && (
                <div className="flex gap-2 text-sm text-muted-foreground">
                  {app.pricing_rating && (
                    <span>💰 {app.pricing_rating}/5</span>
                  )}
                  {app.functionality_rating && (
                    <span>⚡ {app.functionality_rating}/5</span>
                  )}
                  {app.accessibility_rating && (
                    <span>🎯 {app.accessibility_rating}/5</span>
                  )}
                </div>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
} 
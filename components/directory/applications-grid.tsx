"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Application } from "@/types"
import { ApplicationCard } from "@/components/cards/application-card"

export function ApplicationsGrid() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from("applications")
        .select(`
          *,
          categories:category_id(name),
          sub_categories:sub_category_id(name)
        `)

      // Apply category filter
      const category = searchParams.get("category")
      if (category) {
        query = query.eq("category_id", category)
      }

      // Apply subcategory filters
      const subCategories = searchParams.get("subCategories")?.split(",")
      if (subCategories && subCategories.length > 0) {
        query = query.in("sub_category_id", subCategories)
      }

      // Apply type filters
      const types = searchParams.get("types")?.split(",")
      if (types && types.length > 0) {
        query = query.in("type", types)
      }

      // Apply search filter
      const search = searchParams.get("search")
      if (search) {
        query = query.ilike("name", `%${search}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching applications:", error)
        setLoading(false)
        return
      }

      // Transform the data to match the Application type
      const transformedData = data?.map(app => ({
        ...app,
        category: app.categories?.name || "",
        sub_category: app.sub_categories?.name || "",
      })) || []

      setApplications(transformedData)
      setLoading(false)
    }

    fetchApplications()
  }, [searchParams])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No applications found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
} 
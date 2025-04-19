import { Suspense } from "react"
import { Shell } from "@/components/shell"
import { ApplicationsClient } from "@/components/directory/applications-client"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/supabase"

type Category = Database['public']['Tables']['categories']['Row']
type SubCategory = Database['public']['Tables']['sub_categories']['Row']

async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, description")
    .order("name")
  return categories || []
}

async function getSubCategories(): Promise<SubCategory[]> {
  const supabase = await createClient()
  const { data: subCategories } = await supabase
    .from("sub_categories")
    .select("id, name, category_id, description")
    .order("name")
  return subCategories || []
}

export default async function ApplicationsPage() {
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubCategories(),
  ])

  return (
    <Shell>
      <ApplicationsClient 
        categories={categories} 
        subCategories={subCategories} 
      />
    </Shell>
  )
} 
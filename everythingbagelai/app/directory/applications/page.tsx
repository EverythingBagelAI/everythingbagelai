import { ApplicationsFilter } from "@/components/directory/applications-filter"
import { ApplicationsGrid } from "@/components/directory/applications-grid"
import { SubCategoryBoxes } from "@/components/directory/subcategory-boxes"
import { createClient } from "@/lib/supabase/server"

async function getCategories() {
  const supabase = createClient()
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name")
  return categories || []
}

async function getSubCategories() {
  const supabase = createClient()
  const { data: subCategories } = await supabase
    .from("sub_categories")
    .select("id, name, category_id")
    .order("name")
  return subCategories || []
}

export default async function ApplicationsPage() {
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubCategories(),
  ])

  return (
    <div className="container py-8 space-y-8">
      <ApplicationsFilter categories={categories} />
      <SubCategoryBoxes categories={categories} subCategories={subCategories} />
      <ApplicationsGrid />
    </div>
  )
}


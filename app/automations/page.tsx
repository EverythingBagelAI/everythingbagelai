import { Suspense } from "react"
import { Shell } from "@/components/shell"
import { Search } from "@/components/directory/search"
import { AutomationsGrid } from "@/components/directory/automations-grid"
import { AutomationsList } from "@/components/directory/automations-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/server"
import { CategorySelect } from "@/components/directory/category-select"
import { SubCategoryBoxes } from "@/components/directory/subcategory-boxes"

async function getCategories() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name")
  return categories || []
}

async function getSubCategories() {
  const supabase = await createClient()
  const { data: subCategories } = await supabase
    .from("sub_categories")
    .select("id, name, category_id")
    .order("name")
  return subCategories || []
}

export default async function AutomationsPage() {
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubCategories(),
  ])

  return (
    <Shell>
      <div className="container space-y-8 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">AI Automations Directory</h1>
            <p className="text-muted-foreground">
              Discover and implement powerful automation workflows
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Search />
            <CategorySelect categories={categories} />
          </div>
        </div>

        <div className="space-y-6">
          <SubCategoryBoxes 
            categories={categories} 
            subCategories={subCategories} 
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Tabs defaultValue="grid" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="grid">
                  <Suspense fallback={<div>Loading automations...</div>}>
                    <AutomationsGrid />
                  </Suspense>
                </TabsContent>
                <TabsContent value="list">
                  <Suspense fallback={<div>Loading automations...</div>}>
                    <AutomationsList />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
} 
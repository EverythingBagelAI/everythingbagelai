"use client"

import { Suspense } from "react"
import { Search } from "@/components/directory/search"
import { ApplicationsGrid } from "@/components/directory/applications-grid"
import { ApplicationsList } from "@/components/directory/applications-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { Database } from "@/types/supabase"

type Category = Database['public']['Tables']['categories']['Row']
type SubCategory = Database['public']['Tables']['sub_categories']['Row']

interface ApplicationsClientProps {
  categories: Category[]
  subCategories: SubCategory[]
}

export function ApplicationsClient({ categories, subCategories }: ApplicationsClientProps) {
  return (
    <div className="container space-y-8 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">AI Applications Directory</h1>
          <p className="text-muted-foreground">
            Discover and compare the latest AI tools and applications
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="w-[300px]">
            <Search />
          </div>
          <div className="flex gap-4">
            <CategorySelect categories={categories} />
            <TypeSelect />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {subCategories.map((subCategory) => (
          <button
            key={subCategory.id}
            className="rounded-lg bg-card p-4 text-center shadow-sm hover:bg-muted/50 transition-colors border"
          >
            <span className="font-medium">{subCategory.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <p className="text-sm text-muted-foreground">
                Showing 0 applications
              </p>
            </div>
            <TabsContent value="grid">
              <Suspense fallback={<div>Loading applications...</div>}>
                <ApplicationsGrid />
              </Suspense>
            </TabsContent>
            <TabsContent value="list">
              <Suspense fallback={<div>Loading applications...</div>}>
                <ApplicationsList />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function CategorySelect({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  function onCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={currentCategory || "all"} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function TypeSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type")

  function onTypeChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("type")
    } else {
      params.set("type", value)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={currentType || "all"} onValueChange={onTypeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Types</SelectItem>
        <SelectItem value="Free">Free</SelectItem>
        <SelectItem value="Premium">Premium</SelectItem>
        <SelectItem value="Paid">Paid</SelectItem>
      </SelectContent>
    </Select>
  )
} 
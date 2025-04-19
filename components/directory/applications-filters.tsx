"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "@/components/directory/search"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Category {
  id: string
  name: string
}

interface ApplicationsFiltersProps {
  categories: Category[]
}

export function ApplicationsFilters({ categories }: ApplicationsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category")
  const currentType = searchParams.get("type")

  function onCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    router.push(`?${params.toString()}`)
  }

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
    <div className="flex flex-wrap gap-4">
      <Select
        value={currentCategory || "all"}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Category" />
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

      <Select
        value={currentType || "all"}
        onValueChange={onTypeChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Free">Free</SelectItem>
          <SelectItem value="Premium">Premium</SelectItem>
          <SelectItem value="Paid">Paid</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1">
        <Search />
      </div>
    </div>
  )
} 
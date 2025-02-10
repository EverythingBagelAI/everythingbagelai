"use client"

import { useRouter, useSearchParams } from "next/navigation"
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

interface CategorySelectProps {
  categories: Category[]
}

export function CategorySelect({ categories }: CategorySelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  function onCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
      params.delete("subCategory") // Reset sub-category when category is cleared
    } else {
      params.set("category", value)
      params.delete("subCategory") // Reset sub-category when category changes
    }
    router.push(`?${params.toString()}`)
  }

  return (
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
  )
} 
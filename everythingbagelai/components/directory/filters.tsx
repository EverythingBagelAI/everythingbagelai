"use client"

import * as React from "react"
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

interface FiltersProps {
  categories: Category[]
  subCategories: Category[]
}

export function Filters({ categories, subCategories }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category")
  const currentSubCategory = searchParams.get("subCategory")

  function onCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
      params.delete("subCategory") // Reset sub-category when category is cleared
    } else {
      params.set("category", value)
    }
    router.push(`?${params.toString()}`)
  }

  function onSubCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("subCategory")
    } else {
      params.set("subCategory", value)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex gap-4">
      <Select
        value={currentCategory || "all"}
        onValueChange={onCategoryChange}
      >
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
      <Select
        value={currentSubCategory || "all"}
        onValueChange={onSubCategoryChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sub-Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sub-Categories</SelectItem>
          {subCategories.map((subCategory) => (
            <SelectItem key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 
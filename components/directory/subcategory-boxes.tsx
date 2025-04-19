"use client"
import * as React from "react"
import { useSearchParams } from "next/navigation"

interface Category {
  id: string
  name: string
}

interface SubCategory {
  id: string
  name: string
  category_id: string
}

interface SubCategoryBoxesProps {
  categories: Category[]
  subCategories: SubCategory[]
}

export function SubCategoryBoxes({ categories, subCategories }: SubCategoryBoxesProps) {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")

  const filteredSubCategories = selectedCategory
    ? subCategories.filter(sub => sub.category_id === selectedCategory)
    : subCategories

  const selectedCategoryName = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)?.name
    : null

  if (selectedCategory && filteredSubCategories.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No subcategories available for {selectedCategoryName || "selected category"}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredSubCategories.map((subCategory) => (
        <button
          key={subCategory.id}
          className="rounded-lg bg-card p-4 text-center shadow-sm hover:bg-muted/50 transition-colors border"
        >
          <span className="font-medium">{subCategory.name}</span>
        </button>
      ))}
    </div>
  )
} 
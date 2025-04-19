"use client"
import * as React from "react"

interface SubCategory {
  id: string
  name: string
  category_id: string
}

interface SubCategoryBoxesProps {
  subCategories: SubCategory[]
}

export function SubCategoryBoxes({ subCategories }: SubCategoryBoxesProps) {
  return (
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
  )
} 
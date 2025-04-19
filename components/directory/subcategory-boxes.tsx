"use client"
import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategories = searchParams.get("categories")?.split(",") || []
  const currentSubCategories = searchParams.get("subCategories")?.split(",") || []

  // Filter subcategories based on selected categories
  const filteredSubCategories = currentCategories.length > 0
    ? subCategories.filter(sub => currentCategories.includes(sub.category_id))
    : subCategories

  const toggleSubCategory = (subCategoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const updatedSubCategories = currentSubCategories.includes(subCategoryId)
      ? currentSubCategories.filter(id => id !== subCategoryId)
      : [...currentSubCategories, subCategoryId]

    if (updatedSubCategories.length > 0) {
      params.set("subCategories", updatedSubCategories.join(","))
    } else {
      params.delete("subCategories")
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filteredSubCategories.map((subCategory) => (
        <motion.div key={subCategory.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={currentSubCategories.includes(subCategory.id) ? "default" : "secondary"}
            onClick={() => toggleSubCategory(subCategory.id)}
            className="text-[11px] py-1 h-7 px-3"
            size="sm"
          >
            {subCategory.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
} 
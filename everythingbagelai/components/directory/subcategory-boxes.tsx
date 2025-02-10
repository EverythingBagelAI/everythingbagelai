"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"

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
  const currentCategory = searchParams.get("category")
  const currentSubCategory = searchParams.get("subCategory")

  // Filter subcategories based on selected category
  const filteredSubCategories = currentCategory
    ? subCategories.filter((sub) => sub.category_id === currentCategory)
    : subCategories

  function onSubCategoryClick(subCategoryId: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (currentSubCategory === subCategoryId) {
      params.delete("subCategory")
    } else {
      params.set("subCategory", subCategoryId)
    }
    router.push(`?${params.toString()}`)
  }

  // Group subcategories by category
  const groupedSubCategories = subCategories.reduce((acc, subCategory) => {
    const category = categories.find(cat => cat.id === subCategory.category_id)
    if (!category) return acc

    if (!acc[category.name]) {
      acc[category.name] = []
    }
    acc[category.name].push(subCategory)
    return acc
  }, {} as Record<string, SubCategory[]>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedSubCategories).map(([categoryName, subs]) => (
        <div key={categoryName} className="space-y-4">
          <h2 className="text-lg font-semibold">{categoryName}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {subs.map((subCategory) => (
              <Card
                key={subCategory.id}
                className={`cursor-pointer p-4 text-center transition-colors hover:bg-muted/50 ${
                  currentSubCategory === subCategory.id ? "bg-muted" : ""
                }`}
                onClick={() => onSubCategoryClick(subCategory.id)}
              >
                <div className="font-medium">{subCategory.name}</div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 
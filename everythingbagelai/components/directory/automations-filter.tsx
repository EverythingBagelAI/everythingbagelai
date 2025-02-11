"use client"
import * as React from "react"
import { Check, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
}

interface AutomationsFilterProps {
  categories: Category[]
}

const complexities = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
]

export function AutomationsFilter({ categories }: AutomationsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(searchParams.get("search") || "")

  // Get current filter values from URL
  const currentComplexities = searchParams.get("complexities")?.split(",") || []
  const currentCategories = searchParams.get("categories")?.split(",") || []
  
  const updateFilters = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (type === "complexities") {
      const complexities = currentComplexities.includes(value)
        ? currentComplexities.filter(c => c !== value)
        : [...currentComplexities, value]
      
      if (complexities.length === 0) {
        params.delete("complexities")
      } else {
        params.set("complexities", complexities.join(","))
      }
    }
    
    if (type === "categories") {
      const updatedCategories = currentCategories.includes(value)
        ? currentCategories.filter(c => c !== value)
        : [...currentCategories, value]
      
      if (updatedCategories.length === 0) {
        params.delete("categories")
        params.delete("subCategories") // Reset sub-categories when categories are cleared
      } else {
        params.set("categories", updatedCategories.join(","))
        params.delete("subCategories") // Reset sub-categories when categories change
      }
    }
    
    router.push(`?${params.toString()}`)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[200px] justify-start">
              {currentComplexities.length > 0 ? (
                <>
                  Complexity
                  <Badge variant="secondary" className="ml-2">
                    {currentComplexities.length}
                  </Badge>
                </>
              ) : (
                "Select Complexity"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No complexity levels found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem 
                    onSelect={() => {
                      const params = new URLSearchParams(searchParams.toString())
                      params.delete("complexities")
                      router.push(`?${params.toString()}`)
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentComplexities.length === 0 ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Complexities
                  </CommandItem>
                  {complexities.map((complexity) => (
                    <CommandItem 
                      key={complexity.value} 
                      onSelect={() => updateFilters("complexities", complexity.value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentComplexities.includes(complexity.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {complexity.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[200px] justify-start">
              {currentCategories.length > 0 ? (
                <>
                  Categories
                  <Badge variant="secondary" className="ml-2">
                    {currentCategories.length}
                  </Badge>
                </>
              ) : (
                "Select Categories"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem 
                    onSelect={() => {
                      const params = new URLSearchParams(searchParams.toString())
                      params.delete("categories")
                      params.delete("subCategories")
                      router.push(`?${params.toString()}`)
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentCategories.length === 0 ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Automations
                  </CommandItem>
                  {categories.map((category) => (
                    <CommandItem 
                      key={category.id} 
                      onSelect={() => updateFilters("categories", category.id)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentCategories.includes(category.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search automations..."
            value={searchValue}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}


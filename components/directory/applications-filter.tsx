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

interface ApplicationsFilterProps {
  categories: Category[]
}

const types = [
  { value: "Free", label: "Free" },
  { value: "Freemium", label: "Freemium" },
  { value: "Paid", label: "Paid" },
]

export function ApplicationsFilter({ categories }: ApplicationsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(searchParams.get("search") || "")

  // Get current filter values from URL
  const currentTypes = searchParams.get("types")?.split(",") || []
  const currentCategory = searchParams.get("category")
  
  const updateFilters = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (type === "types") {
      const types = currentTypes.includes(value)
        ? currentTypes.filter(t => t !== value)
        : [...currentTypes, value]
      
      if (types.length === 0) {
        params.delete("types")
      } else {
        params.set("types", types.join(","))
      }
    }
    
    if (type === "category") {
      if (value === "all") {
        params.delete("category")
        params.delete("subCategories") // Reset sub-categories when category is cleared
      } else {
        params.set("category", value)
        params.delete("subCategories") // Reset sub-categories when category changes
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
              {currentTypes.length > 0 ? (
                <>
                  Types
                  <Badge variant="secondary" className="ml-2">
                    {currentTypes.length}
                  </Badge>
                </>
              ) : (
                "Select Types"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No types found.</CommandEmpty>
                <CommandGroup>
                  {types.map((type) => (
                    <CommandItem 
                      key={type.value} 
                      onSelect={() => updateFilters("types", type.value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentTypes.includes(type.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {type.label}
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
              {currentCategory ? (
                <>
                  Category
                  <Badge variant="secondary" className="ml-2">
                    1
                  </Badge>
                </>
              ) : (
                "Select Category"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem 
                    onSelect={() => updateFilters("category", "all")}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        !currentCategory ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Applications
                  </CommandItem>
                  {categories.map((category) => (
                    <CommandItem 
                      key={category.id} 
                      onSelect={() => updateFilters("category", category.id)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentCategory === category.id ? "opacity-100" : "opacity-0"
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
            placeholder="Search applications..."
            value={searchValue}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
} 

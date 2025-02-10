"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const subcategories = [
  "Workflow",
  "Data Processing",
  "Task Management",
  "Communication",
  "Analytics",
  "Integration",
  "Scheduling",
  "Reporting",
]

const categories = [
  { value: "all", label: "All" },
  { value: "ai-applications", label: "AI Applications" },
  { value: "development-tools", label: "Development Tools" },
  { value: "content-creation", label: "Content Creation" },
]

const types = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "premium", label: "Premium" },
  { value: "paid", label: "Paid" },
]

export function ApplicationsFilter() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([])

  const toggleCategory = (category: string) => {
    if (category === "all") {
      setSelectedCategories([])
      return
    }
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter((t) => t !== category) : [...prev, category]
    )
  }

  const toggleType = (type: string) => {
    if (type === "all") {
      setSelectedTypes([])
      return
    }
    setSelectedTypes((prev) => 
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((item) => item !== subcategory) : [...prev, subcategory],
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[200px] justify-start">
              {selectedCategories.length > 0 ? (
                <>
                  Categories
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length}
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
                  {categories.map((category) => (
                    <CommandItem key={category.value} onSelect={() => toggleCategory(category.value)} className="cursor-pointer">
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedCategories.includes(category.value) ? "opacity-100" : "opacity-0")}
                      />
                      {category.label}
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
              {selectedTypes.length > 0 ? (
                <>
                  Type
                  <Badge variant="secondary" className="ml-2">
                    {selectedTypes.length}
                  </Badge>
                </>
              ) : (
                "Select Type"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No types found.</CommandEmpty>
                <CommandGroup>
                  {types.map((type) => (
                    <CommandItem key={type.value} onSelect={() => toggleType(type.value)} className="cursor-pointer">
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedTypes.includes(type.value) ? "opacity-100" : "opacity-0")}
                      />
                      {type.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative flex-grow">
          <Input placeholder="Search applications..." type="search" />
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-2">
        {subcategories.map((subcategory) => (
          <motion.div key={subcategory} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant={selectedSubcategories.includes(subcategory) ? "default" : "secondary"}
              onClick={() => toggleSubcategory(subcategory)}
              className="transition-colors text-[11px] py-1 h-7 px-3"
              size="sm"
            >
              {subcategory}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 

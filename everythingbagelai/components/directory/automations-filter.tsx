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

const tools = [
  { value: "all", label: "All" },
  { value: "n8n", label: "n8n" },
  { value: "make", label: "Make.com" },
  { value: "gumloop", label: "Gumloop" },
]

const complexities = [
  { value: "all", label: "All" },
  { value: "simple", label: "Simple" },
  { value: "moderate", label: "Moderate" },
  { value: "complex", label: "Complex" },
]

export function AutomationsFilter() {
  const [selectedTools, setSelectedTools] = React.useState<string[]>([])
  const [selectedComplexities, setSelectedComplexities] = React.useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([])

  const toggleTool = (tool: string) => {
    if (tool === "all") {
      setSelectedTools([])
      return
    }
    setSelectedTools((prev) => 
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    )
  }

  const toggleComplexity = (complexity: string) => {
    if (complexity === "all") {
      setSelectedComplexities([])
      return
    }
    setSelectedComplexities((prev) => 
      prev.includes(complexity) ? prev.filter((c) => c !== complexity) : [...prev, complexity]
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
              {selectedTools.length > 0 ? (
                <>
                  Tools
                  <Badge variant="secondary" className="ml-2">
                    {selectedTools.length}
                  </Badge>
                </>
              ) : (
                "Select Tools"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No tools found.</CommandEmpty>
                <CommandGroup>
                  {tools.map((tool) => (
                    <CommandItem key={tool.value} onSelect={() => toggleTool(tool.value)} className="cursor-pointer">
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedTools.includes(tool.value) ? "opacity-100" : "opacity-0")}
                      />
                      {tool.label}
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
              {selectedComplexities.length > 0 ? (
                <>
                  Complexity
                  <Badge variant="secondary" className="ml-2">
                    {selectedComplexities.length}
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
                  {complexities.map((complexity) => (
                    <CommandItem key={complexity.value} onSelect={() => toggleComplexity(complexity.value)} className="cursor-pointer">
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedComplexities.includes(complexity.value) ? "opacity-100" : "opacity-0")}
                      />
                      {complexity.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative flex-grow">
          <Input placeholder="Search automations..." type="search" />
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


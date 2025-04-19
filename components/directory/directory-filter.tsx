"use client"
import { motion } from "framer-motion"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const subcategories = [
  "Chatbots",
  "Image Generation",
  "Text Analysis",
  "Workflow",
  "Data Processing",
  "Machine Learning",
  "Natural Language Processing",
  "Computer Vision",
]

export function DirectoryFilter() {
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([])

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((item) => item !== subcategory) : [...prev, subcategory],
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ai-applications">AI Applications</SelectItem>
            <SelectItem value="automation">Automation</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
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


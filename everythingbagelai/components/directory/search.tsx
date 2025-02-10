"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search as SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"

export function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = React.useState(searchParams.get("search") || "")
  const debouncedValue = useDebounce(value, 500)

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedValue) {
      params.set("search", debouncedValue)
    } else {
      params.delete("search")
    }
    router.push(`?${params.toString()}`)
  }, [debouncedValue, router, searchParams])

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search applications..."
        className="pl-10 h-11"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
} 
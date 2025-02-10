import { Shell } from "@/components/shell"
import { AutomationsFilter } from "@/components/directory/automations-filter"
import { AutomationsGrid } from "@/components/directory/automations-grid"

export default function AutomationsPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <AutomationsFilter />
        <AutomationsGrid />
      </div>
    </Shell>
  )
}


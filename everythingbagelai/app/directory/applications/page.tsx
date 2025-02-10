import { Shell } from "@/components/shell"
import { ApplicationsFilter } from "@/components/directory/applications-filter"
import { ApplicationsGrid } from "@/components/directory/applications-grid"

export default function ApplicationsPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <ApplicationsFilter />
        <ApplicationsGrid />
      </div>
    </Shell>
  )
}


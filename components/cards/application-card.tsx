import Link from "next/link"
import { Bot } from "lucide-react"
import { Application } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Link href={`/applications/${application.id}`}>
      <Card className="h-full cursor-pointer p-6 transition-shadow hover:shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              {application.logo_url ? (
                <img
                  src={application.logo_url}
                  alt={application.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <Bot className="h-8 w-8 text-muted-foreground" />
              )}
              <h3 className="font-semibold line-clamp-1">{application.name}</h3>
            </div>
            <Badge>{application.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{application.summary}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            <Badge variant="secondary">{application.category}</Badge>
            <Badge variant="outline">{application.sub_category}</Badge>
          </div>
          {(application.pricing_rating || application.functionality_rating || application.accessibility_rating) && (
            <div className="flex gap-2">
              {application.pricing_rating && (
                <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm">
                  💰 {application.pricing_rating}
                </div>
              )}
              {application.functionality_rating && (
                <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm">
                  ⚡ {application.functionality_rating}
                </div>
              )}
              {application.accessibility_rating && (
                <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-sm">
                  🎯 {application.accessibility_rating}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
} 
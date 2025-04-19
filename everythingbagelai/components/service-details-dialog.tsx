import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ServiceDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  service: {
    emoji: string
    title: string
    description: string
    features: string[]
    offer?: string
  }
}

export function ServiceDetailsDialog({ isOpen, onClose, service }: ServiceDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span>{service.emoji}</span>
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-base">{service.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Key Features</h4>
            <ul className="grid gap-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-primary">→</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {service.offer && (
            <div className="space-y-4">
              <h4 className="font-medium">Special Offer</h4>
              <p className="text-muted-foreground">{service.offer}</p>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="rainbow" onClick={onClose}>
              Schedule Consultation <span className="ml-2">✨</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
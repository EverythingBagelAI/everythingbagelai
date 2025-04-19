"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import RecaptchaWrapper from "@/components/recaptcha-wrapper"
import { Confetti, type ConfettiRef } from "@/components/ui/confetti"

interface ConsultationFormProps {
  isOpen: boolean
  onClose: () => void
}

const services = [
  {
    id: "ai-strategy",
    title: "AI Strategy & Tool Advisory",
    description: "Understand what AI can actually do for your business",
    offer: "I'll audit your current workflows and send you a free 1-page AI Tool Map showing which automations and tools could save you 10+ hours a week — tailored to your business."
  },
  {
    id: "lead-gen",
    title: "Hyper-Personalised Lead Generation",
    description: "Build lead-gen machines that don't sound like spam",
    offer: "Send me a list of your top 10 dream clients — I'll build and send you 3 fully personalised cold emails (plus the scraping method I used to find the data). Free. No strings. This demonstrates our scraping system, hyper-personalisation quality, and writing + strategy finesse."
  },
  {
    id: "sales-automation",
    title: "Sales & CRM Automations",
    description: "Turn your CRM into a closer, not just a tracker",
    offer: "I'll set up 1 AI-powered follow-up sequence in your CRM for free — one that nurtures cold leads automatically using ChatGPT and past interaction data. Just tell me your CRM + one use case (e.g., ghosted demo leads)."
  },
  {
    id: "content-systems",
    title: "Content Systems",
    description: "Get a full-blown creative team in your pocket",
    offer: "I'll give you a fully AI-generated content campaign brief (including ideas, hooks, competitor gap map, and 3 scripts) — completely free. Just tell me your niche or audience."
  },
  {
    id: "customer-support",
    title: "AI Customer Support",
    description: "Delight your customers without drowning in tickets",
    offer: "I'll build you a free, branded AI chatbot demo trained on your FAQs and website. Just send me your website URL — I'll do the rest. See it work live with your tone, product, and support flow."
  }
]

const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

export function ConsultationForm({ isOpen, onClose }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    services: [] as string[],
    message: ""
  })
  const [isVerified, setIsVerified] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const confettiRef = useRef<ConfettiRef>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isVerified) {
      alert("Please complete the reCAPTCHA verification")
      return
    }

    try {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData)
      setShowSuccess(true)
      confettiRef.current?.fire()
      
      // Close the form after showing success message
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 5000) // Show success message for 5 seconds
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleRecaptchaChange = (token: string | null) => {
    setIsVerified(!!token)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Confetti ref={confettiRef} className="fixed inset-0 pointer-events-none" />
      <DialogContent className="sm:max-w-[650px] overflow-visible p-0">
        <div className="relative p-6">
          <div className="relative">
            <div className="absolute inset-0 border-beam pointer-events-none" />
            <div className="relative bg-background rounded-lg z-10">
              <div className="max-h-[calc(85vh-4rem)] overflow-y-auto p-6 mt-8">
                {showSuccess ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="text-4xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold gradient-text">
                      Congratulations on Taking the First Step!
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      You're on your way to transforming your business with AI automation.
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        We'll review your requirements and get back to you within 24 hours with
                        a personalized plan for implementing AI solutions in your business.
                      </p>
                      <p>
                        Get ready to streamline your operations and unlock new possibilities!
                      </p>
                    </div>
                    <div className="mt-6 text-sm text-muted-foreground">
                      Redirecting you shortly...
                    </div>
                  </div>
                ) : (
                  <div>
                    <DialogHeader className="mb-8">
                      <DialogTitle className="text-2xl">Schedule a Consultation</DialogTitle>
                      <DialogDescription>
                        Tell us about your business and we'll get back to you within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium" htmlFor="name">
                            Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="relative z-20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium" htmlFor="email">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="relative z-20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium" htmlFor="mobile">
                            Mobile Number
                          </label>
                          <Input
                            id="mobile"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                            className="relative z-20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium" htmlFor="company">
                            Company
                          </label>
                          <Input
                            id="company"
                            placeholder="Your company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            required
                            className="relative z-20"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-sm font-medium">
                          Services of Interest (Select all that apply)
                        </label>
                        <div className="grid gap-3">
                          {services.map((service) => (
                            <div key={service.id} className="relative flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex h-6 items-center">
                                <input
                                  type="checkbox"
                                  id={service.id}
                                  checked={formData.services.includes(service.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormData(prev => ({
                                        ...prev,
                                        services: [...prev.services, service.id]
                                      }))
                                    } else {
                                      setFormData(prev => ({
                                        ...prev,
                                        services: prev.services.filter(id => id !== service.id)
                                      }))
                                    }
                                  }}
                                  className="custom-checkbox"
                                />
                              </div>
                              <label htmlFor={service.id} className="flex-1 cursor-pointer">
                                <div className="font-medium">{service.title}</div>
                                <div className="text-sm text-muted-foreground">{service.description}</div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium" htmlFor="message">
                          Additional Details
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your specific needs..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="min-h-[100px] relative z-20"
                        />
                      </div>
                      <div className="flex justify-center relative z-20">
                        <div className="bg-background p-2 rounded-lg">
                          <RecaptchaWrapper
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptchaChange}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          variant="rainbow" 
                          disabled={!isVerified}
                        >
                          Submit <span className="ml-2">✨</span>
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
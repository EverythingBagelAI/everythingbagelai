"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRecaptchaV3 } from "@/hooks/use-recaptcha-v3"
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
    offer: "I&apos;ll audit your current workflows and send you a free 1-page AI Tool Map showing which automations and tools could save you 10+ hours a week — tailored to your business."
  },
  {
    id: "lead-gen",
    title: "Hyper-Personalised Lead Generation",
    description: "Build lead-gen machines that don&apos;t sound like spam",
    offer: "Send me a list of your top 10 dream clients — I&apos;ll build and send you 3 fully personalised cold emails (plus the scraping method I used to find the data). Free. No strings. This demonstrates our scraping system, hyper-personalisation quality, and writing + strategy finesse."
  },
  {
    id: "sales-automation",
    title: "Sales & CRM Automations",
    description: "Turn your CRM into a closer, not just a tracker",
    offer: "I&apos;ll set up 1 AI-powered follow-up sequence in your CRM for free — one that nurtures cold leads automatically using ChatGPT and past interaction data. Just tell me your CRM + one use case (e.g., ghosted demo leads)."
  },
  {
    id: "content-systems",
    title: "Content Systems",
    description: "Get a full-blown creative team in your pocket",
    offer: "I&apos;ll give you a fully AI-generated content campaign brief (including ideas, hooks, competitor gap map, and 3 scripts) — completely free. Just tell me your niche or audience."
  },
  {
    id: "customer-support",
    title: "AI Customer Support",
    description: "Delight your customers without drowning in tickets",
    offer: "I&apos;ll build you a free, branded AI chatbot demo trained on your FAQs and website. Just send me your website URL — I&apos;ll do the rest. See it work live with your tone, product, and support flow."
  }
]

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

export function ConsultationForm({ isOpen, onClose }: ConsultationFormProps) {
  const { executeRecaptcha, isLoaded } = useRecaptchaV3(RECAPTCHA_SITE_KEY)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    services: [] as string[],
    message: ""
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const confettiRef = useRef<ConfettiRef>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('consultation_form_submit')

      if (!recaptchaToken) {
        alert("reCAPTCHA verification failed. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Submit to our API
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed')
      }

      setShowSuccess(true)
      confettiRef.current?.fire()

      // Reset form data
      setFormData({
        name: "",
        email: "",
        mobile: "",
        company: "",
        services: [],
        message: ""
      })

      // Close the form after showing success message
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 5000) // Show success message for 5 seconds
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(error instanceof Error ? error.message : "There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Confetti ref={confettiRef} className="fixed inset-0 pointer-events-none" />
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto border-0 p-0">
        <div className="border-beam">
          <div className="bg-background p-4 sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Schedule a Consultation</h2>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s discuss how we can help your business leverage AI effectively.
                </p>
              </div>
              {showSuccess ? (
                <div className="p-6 text-center space-y-3">
                  <div className="text-4xl mb-2">🎉</div>
                  <h2 className="text-xl font-bold gradient-text">
                    Congratulations on Taking the First Step!
                  </h2>
                  <p className="text-base text-muted-foreground">
                    You&apos;re on your way to transforming your business with AI automation.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      We&apos;ll review your requirements and get back to you within 24 hours with
                      a personalized plan for implementing AI solutions in your business.
                    </p>
                    <p>
                      Get ready to streamline your operations and unlock new possibilities!
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Redirecting you shortly...
                  </div>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div className="space-y-3">
                      <label className="block text-sm font-medium">
                        Services of Interest (Select all that apply)
                      </label>
                      <div className="grid gap-2 max-h-[200px] overflow-y-auto pr-2">
                        {services.map((service) => (
                          <div key={service.id} className="relative flex items-start space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                            <div className="flex h-5 items-center">
                              <input
                                type="checkbox"
                                id={service.id}
                                checked={formData.services.includes(service.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      services: [...formData.services, service.id],
                                    })
                                  } else {
                                    setFormData({
                                      ...formData,
                                      services: formData.services.filter((id) => id !== service.id),
                                    })
                                  }
                                }}
                                className="custom-checkbox"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <label
                                htmlFor={service.id}
                                className="text-sm font-medium cursor-pointer"
                              >
                                {service.title}
                              </label>
                              <p className="text-xs text-muted-foreground">
                                {service.description}
                              </p>
                            </div>
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
                        className="h-24 relative z-20"
                      />
                    </div>
                    <div className="space-y-4">
                      <Button type="submit" variant="rainbow" className="w-full" disabled={!isLoaded || isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Schedule Consultation"} <span className="ml-2">✨</span>
                      </Button>
                      {!isLoaded && (
                        <p className="text-xs text-center text-muted-foreground">
                          Loading security verification...
                        </p>
                      )}
                    </div>
                  </form>
                  <div className="mt-6 pt-4 border-t text-center">
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll get back to you within 24 hours with a personalized plan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRecaptchaV3 } from "@/hooks/use-recaptcha-v3"
import { Confetti, type ConfettiRef } from "@/components/ui/confetti"
import { motion } from "framer-motion"

const services = [
  {
    id: "ai-strategy",
    title: "AI Strategy & Tool Advisory",
    emoji: "🧠"
  },
  {
    id: "lead-gen",
    title: "Lead Generation Systems",
    emoji: "🎯"
  },
  {
    id: "sales-automation",
    title: "Sales & CRM Automations",
    emoji: "💼"
  },
  {
    id: "content-systems",
    title: "Content Creation Engine",
    emoji: "✍️"
  },
  {
    id: "customer-support",
    title: "AI Customer Support",
    emoji: "🤖"
  }
]

export function BookingForm() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
  const { executeRecaptcha, isLoaded } = useRecaptchaV3(recaptchaSiteKey)

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
      const recaptchaToken = await executeRecaptcha('booking_form_submit')

      if (!recaptchaToken) {
        alert("reCAPTCHA verification failed. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Get the webhook URL from environment variable
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

      if (webhookUrl) {
        // Send form data to n8n webhook
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            company: formData.company,
            services: formData.services,
            message: formData.message,
            recaptchaToken: recaptchaToken,
            submittedAt: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to submit form")
        }
      }

      setShowSuccess(true)
      confettiRef.current?.fire()
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <>
        <Confetti ref={confettiRef} className="fixed inset-0 pointer-events-none z-50" />
        <motion.div
          className="p-8 text-center space-y-4 bg-white rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text">
            You&apos;re All Set!
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We&apos;ll review your information and reach out within 24 hours to schedule your consultation.
          </p>
          <div className="pt-4 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <span>✓</span> Check your email for confirmation
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>✓</span> We&apos;ll send calendar invite options
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>✓</span> Get ready to transform your business
            </p>
          </div>
        </motion.div>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
        <div className="space-y-0.5 sm:space-y-1">
          <label className="block text-[10px] sm:text-xs font-medium" htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-white/50 backdrop-blur-sm text-xs sm:text-sm h-9 sm:h-10"
          />
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <label className="block text-[10px] sm:text-xs font-medium" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-white/50 backdrop-blur-sm text-xs sm:text-sm h-9 sm:h-10"
          />
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <label className="block text-[10px] sm:text-xs font-medium" htmlFor="mobile">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="mobile"
            type="tel"
            placeholder="+44 7700 900000"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
            className="bg-white/50 backdrop-blur-sm text-xs sm:text-sm h-9 sm:h-10"
          />
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <label className="block text-[10px] sm:text-xs font-medium" htmlFor="company">
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="bg-white/50 backdrop-blur-sm text-xs sm:text-sm h-9 sm:h-10"
          />
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="block text-[10px] sm:text-xs font-medium">
          What are you interested in? <span className="text-[9px] sm:text-[10px] text-muted-foreground">(Select all that apply)</span>
        </label>
        <div className="grid gap-1 sm:gap-1.5 max-h-40 sm:max-h-48 overflow-y-auto pr-1 sm:pr-2">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center space-x-1.5 sm:space-x-2 rounded-lg border bg-white/50 backdrop-blur-sm p-1.5 sm:p-2 cursor-pointer hover:bg-white/80 transition-colors"
            >
              <input
                type="checkbox"
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
              <span className="text-sm sm:text-base">{service.emoji}</span>
              <span className="text-[10px] sm:text-xs font-medium">{service.title}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-0.5 sm:space-y-1">
        <label className="block text-[10px] sm:text-xs font-medium" htmlFor="message">
          Tell us about your project <span className="text-[9px] sm:text-[10px] text-muted-foreground">(Optional)</span>
        </label>
        <Textarea
          id="message"
          placeholder="What challenges are you looking to solve with AI?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="h-16 sm:h-20 bg-white/50 backdrop-blur-sm resize-none text-xs sm:text-sm"
        />
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Button
          type="submit"
          variant="rainbow"
          size="default"
          className="w-full text-xs sm:text-sm py-4 sm:py-5"
          disabled={!isLoaded || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Book Your Free Consultation"}
          {!isSubmitting && <span className="ml-1 sm:ml-2">→</span>}
        </Button>
        {!isLoaded && (
          <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
            Loading security verification...
          </p>
        )}
      </div>

      <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground">
        By submitting this form, you agree to receive communication from EverythingBagel AI.
      </p>
    </form>
  )
}

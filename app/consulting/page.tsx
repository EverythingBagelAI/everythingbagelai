"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ConsultationForm } from "@/components/consultation-form"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"

const services = [
  {
    emoji: "🧠",
    title: "AI Strategy & Tool Advisory",
    description: "Confused by all the AI hype? We cut through the noise.",
    features: [
      "Understand what AI can actually do for your business",
      "Discover tools that match your goals and budget",
      "Avoid shiny-object syndrome by focusing on ROI-driven solutions"
    ],
    offer: "I'll audit your current workflows and send you a free 1-page AI Tool Map showing which automations and tools could save you 10+ hours a week — tailored to your business. Just send me a quick voice note or Loom walking through what you do day-to-day.",
    className: "w-full"
  },
  {
    emoji: "🎯",
    title: "Hyper-Personalised Lead Generation",
    description: "We build lead-gen machines that don't sound like spam.",
    features: [
      "Smart scraping to find your ideal prospects",
      "AI-powered personalisation (no two messages are alike)",
      "Automated outreach systems that run 24/7"
    ],
    offer: "Send me a list of your top 10 dream clients — I'll build and send you 3 fully personalised cold emails (plus the scraping method I used to find the data). Free. No strings. This demonstrates our scraping system, hyper-personalisation quality, and writing + strategy finesse.",
    className: "w-full"
  },
  {
    emoji: "🛠️",
    title: "Sales & CRM Automations",
    description: "Turn your CRM into a closer, not just a tracker.",
    features: [
      "AI-written follow-ups based on conversation history",
      "Lead nurturing flows tailored to each stage of your funnel",
      "Deal tracking systems that surface warm leads automatically"
    ],
    offer: "I'll set up 1 AI-powered follow-up sequence in your CRM for free — one that nurtures cold leads automatically using ChatGPT and past interaction data. Just tell me your CRM + one use case (e.g., ghosted demo leads).",
    className: "w-full"
  },
  {
    emoji: "🎥",
    title: "Content Systems",
    description: "Content is king — we give you a full-blown creative team in your pocket.",
    features: [
      "Generating brand avatars (visual + tone of voice)",
      "Mapping what your competitors are posting — and where you can stand out",
      "Generating ideas, outlines, and scripts for video, social, email, or blog"
    ],
    offer: "I'll give you a fully AI-generated content campaign brief (including ideas, hooks, competitor gap map, and 3 scripts) — completely free. Just tell me your niche or audience. Perfect for founders, personal brands, creators, or agencies.",
    className: "w-full"
  },
  {
    emoji: "🤖",
    title: "AI Customer Support",
    description: "Delight your customers without drowning in tickets.",
    features: [
      "AI-powered chatbots that actually help (not frustrate)",
      "AI agents that triage, escalate, and resolve tickets",
      "Systems that get smarter over time by learning from past interactions"
    ],
    offer: "I'll build you a free, branded AI chatbot demo trained on your FAQs and website. Just send me your website URL — I'll do the rest. See it work live with your tone, product, and support flow.",
    className: "w-full"
  }
]

export default function ConsultingPage() {
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  return (
    <div className="container space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Welcome to EverythingBagel AI Consulting <span className="inline-block">👋</span>
        </h1>
        <p className="mx-auto max-w-[900px] text-base text-muted-foreground">
          Don&apos;t need extensive AI infrastructure? We&apos;ll help you find the right tools and strategies.
        </p>
        <p className="mx-auto max-w-[900px] text-base text-muted-foreground">
          We&apos;ll help you understand AI&apos;s potential for your business.
        </p>
        <p className="mx-auto max-w-[900px] text-base text-muted-foreground">
          We&apos;ll create personalized systems that bring leads to you.
        </p>
        <div className="mt-6">
          <Button variant="rainbow" size="lg" onClick={() => setShowConsultationForm(true)}>
            Schedule Consultation <span className="ml-2">✨</span>
          </Button>
        </div>
      </div>

      <BentoGrid>
        {services.map((service) => (
          <BentoCard
            key={service.title}
            emoji={service.emoji}
            name={service.title}
            description={service.description}
            features={service.features}
            offer={service.offer}
            className={service.className}
            onClick={() => setShowConsultationForm(true)}
          />
        ))}
      </BentoGrid>

      <div className="text-center text-muted-foreground">
        <p className="text-sm">I'll build you a free custom AI system that saves you time or money — could be leads, content, chatbots, or internal automation. Just send me a 2-minute voice note explaining your workflow, and I'll take care of the rest.</p>
      </div>

      <ConsultationForm 
        isOpen={showConsultationForm} 
        onClose={() => setShowConsultationForm(false)} 
      />
    </div>
  )
} 
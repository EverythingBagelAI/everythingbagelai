"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const faqs = [
    {
      question: "How long does implementation take?",
      answer:
        "Most projects deploy in 2-4 weeks. We start with quick wins while building comprehensive solutions. You'll see initial results within the first week.",
    },
    {
      question: "What if we're not technical?",
      answer:
        "Perfect! We handle all technical complexity. You focus on your business, we handle the AI. We provide training and ongoing support to ensure your team is confident using the new systems.",
    },
    {
      question: "Do you work with our existing tools?",
      answer:
        "Yes. We integrate with your current tech stack—CRM, marketing tools, databases, and more. Our solutions enhance what you already have rather than replacing it.",
    },
    {
      question: "What's included in support?",
      answer:
        "Unlimited email support, monthly optimization calls, and system updates included for all clients. We're your long-term AI partner, not just a one-time vendor.",
    },
    {
      question: "How do you price projects?",
      answer:
        "Custom pricing based on scope. Most clients invest $10K-50K for comprehensive AI transformation. We provide detailed proposals after understanding your needs.",
    },
    {
      question: "Can we start small?",
      answer:
        "Absolutely. We recommend starting with one high-impact use case, then scaling from there. This approach minimizes risk and proves value quickly.",
    },
  ]

  return (
    <div className="w-full px-4" ref={ref}>
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Common <span className="gradient-text">Questions</span>
        </motion.h2>
        <motion.p
          className="text-base text-center text-muted-foreground mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Everything you need to know about working with us
        </motion.p>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.08,
                ease: "easeOut"
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 transition-colors hover:bg-muted/50"
              >
                <span className="font-semibold text-base">{faq.question}</span>
                <div className={cn(
                  "text-xl transition-transform duration-300",
                  openIndex === index && "rotate-180"
                )}>
                  <span className="gradient-text">↓</span>
                </div>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-48" : "max-h-0"
                )}
              >
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

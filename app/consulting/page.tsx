"use client"

import { BookingForm } from "@/components/booking-form"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function BookingPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const trustBadges = [
    { icon: "⚡", text: "30-Min Free Call" },
    { icon: "📅", text: "Flexible Scheduling" },
    { icon: "✉️", text: "Response in 24h" },
    { icon: "🎯", text: "Custom Solutions" }
  ]

  return (
    <div className="h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          <div className="absolute bottom-8 right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000" />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 h-full flex items-center" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column - Hero Content */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-xs font-semibold gradient-text">
                  Free Consultation
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let&apos;s Build Something
                <span className="block gradient-text">Extraordinary</span>
              </motion.h1>

              <motion.p
                className="text-base text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Book a free 30-minute consultation to discuss how AI can transform your business.
                No sales pitch, just honest advice and a clear roadmap.
              </motion.p>
            </div>

            {/* Trust Badges */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge.text}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-xs font-semibold">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* What to Expect */}
            <motion.div
              className="space-y-2 p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-sm font-bold">What to Expect on the Call</h3>
              <ul className="space-y-1.5">
                {[
                  "Deep dive into your workflows and pain points",
                  "Identify quick wins for immediate impact",
                  "Get a custom roadmap with clear next steps"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="space-y-1 mb-4">
                <h2 className="text-xl font-bold">Book Your Call</h2>
                <p className="text-xs text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

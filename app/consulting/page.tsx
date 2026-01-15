"use client"

import { BookingForm } from "@/components/booking-form"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect } from "react"

export default function BookingPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Disable scroll snap for this page
  useEffect(() => {
    const html = document.documentElement
    const originalScrollSnapType = html.style.scrollSnapType
    html.style.scrollSnapType = 'none'

    return () => {
      html.style.scrollSnapType = originalScrollSnapType
    }
  }, [])

  const trustBadges = [
    { icon: "⚡", text: "30-Min Free Call" },
    { icon: "📅", text: "Flexible Scheduling" },
    { icon: "✉️", text: "Response in 24h" },
    { icon: "🎯", text: "Custom Solutions" }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden py-8 sm:py-12 md:py-0 no-scroll-snap">
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

      <div className="container max-w-7xl mx-auto px-3 sm:px-4 min-h-screen flex items-center py-6 sm:py-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center w-full">
          {/* Left Column - Hero Content */}
          <motion.div
            className="space-y-4 sm:space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-[10px] sm:text-xs font-semibold gradient-text">
                  Free Consultation
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let&apos;s Build Something
                <span className="block gradient-text">Extraordinary</span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base text-muted-foreground leading-relaxed"
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
              className="grid grid-cols-2 gap-2 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-white/70 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-xl hover:border-purple-200/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <span className="text-lg sm:text-2xl">{badge.icon}</span>
                  <span className="text-[10px] sm:text-xs font-semibold">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* What to Expect */}
            <motion.div
              className="space-y-2 sm:space-y-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-sm sm:text-base font-bold">What to Expect on the Call</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  "Deep dive into your workflows and pain points",
                  "Identify quick wins for immediate impact",
                  "Get a custom roadmap with clear next steps"
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <span className="text-green-500 text-sm sm:text-base mt-0.5 flex-shrink-0">✓</span>
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
            className="lg:sticky lg:top-20"
          >
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-300">
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Book Your Call</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
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

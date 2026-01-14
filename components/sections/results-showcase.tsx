"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function ResultsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const results = [
    {
      metric: "3x",
      label: "Qualified Leads",
      description: "AI lead gen outperforms traditional methods",
      icon: "📈",
    },
    {
      metric: "15",
      label: "Hours Saved Weekly",
      description: "Automation frees up your team",
      icon: "⏱️",
    },
    {
      metric: "$50K+",
      label: "Cost Savings",
      description: "Eliminate manual processes",
      icon: "💰",
    },
    {
      metric: "48hr",
      label: "Turnaround",
      description: "From idea to working prototype",
      icon: "⚡",
    },
  ]

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="container max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        >
          The <span className="gradient-text">Impact</span>
        </motion.h2>
        <motion.p
          className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.15, type: "spring", bounce: 0.4 }}
        >
          Real results from businesses that chose to scale with AI
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              className="relative p-8 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.1,
                type: "spring",
                bounce: 0.5
              }}
            >
              <div className="text-5xl mb-4">{result.icon}</div>
              <div className="text-5xl font-bold gradient-text mb-2">
                {result.metric}
              </div>
              <div className="text-xl font-semibold mb-3">{result.label}</div>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

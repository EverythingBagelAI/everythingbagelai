"use client"

import { GlowingEffect } from "@/components/ui/glowing-effect"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Advantages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const advantages = [
    {
      icon: "⚡",
      title: "Lightning Fast Implementation",
      description:
        "Deploy AI solutions in weeks, not months. Our streamlined process means you start seeing results while competitors are still in planning phases.",
      highlight: "Results in weeks, not months",
    },
    {
      icon: "🎯",
      title: "Built For You",
      description:
        "No cookie-cutter solutions. Every AI system we build is custom-tailored to your specific business needs, workflows, and goals.",
      highlight: "Zero cookie-cutter solutions",
    },
    {
      icon: "📊",
      title: "Real Results, No Hype",
      description:
        "We cut through AI buzzwords and focus on what matters: measurable ROI. Practical solutions that drive actual business value.",
      highlight: "ROI-focused approach",
    },
    {
      icon: "🔄",
      title: "We Handle Everything",
      description:
        "From initial strategy to ongoing optimization, we're your complete AI partner. Training, implementation, support—all included.",
      highlight: "From zero to AI-powered",
    },
  ]

  return (
    <div className="px-4" ref={ref}>
      <div className="container max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-center mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="gradient-text">EverythingBagel AI</span>?
        </motion.h2>
        <motion.p
          className="text-base text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          We combine speed, expertise, and results-driven focus to transform your business with AI
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              className="relative rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
              }}
              animate={isInView ? {
                opacity: 1,
                x: 0
              } : {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
              }}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.1,
                ease: "easeOut"
              }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative p-6 rounded-xl border bg-card group h-full">
                <div className="text-4xl mb-3">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {advantage.description}
                </p>
                <div className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <span className="text-xs font-semibold gradient-text">
                    {advantage.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

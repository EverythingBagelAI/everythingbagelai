"use client"

import { WavyBackground } from "@/components/ui/wavy-background"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const stats = [
    {
      number: "87%",
      label: "Faster",
      description: "Lightning-fast implementation",
      icon: "⚡",
    },
    {
      number: "100%",
      label: "Custom",
      description: "Built specifically for you",
      icon: "🎯",
    },
    {
      number: "Zero",
      label: "Fluff",
      description: "Real results, no buzzwords",
      icon: "📊",
    },
    {
      number: "Full",
      label: "Service",
      description: "End-to-end support included",
      icon: "🔄",
    },
  ]

  return (
    <WavyBackground
      containerClassName="min-h-screen"
      colors={["#a855f7", "#818cf8", "#ec4899", "#22d3ee", "#a78bfa"]}
      backgroundFill="white"
      waveOpacity={0.3}
      blur={15}
      speed="slow"
      waveWidth={30}
      className="w-full"
    >
      <div className="px-4 py-20" ref={ref}>
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative text-center p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-border shadow-lg"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold gradient-text mb-1">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}

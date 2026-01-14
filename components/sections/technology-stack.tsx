"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function TechnologyStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const technologies = [
    {
      category: "AI Platforms",
      glowColor: "rgba(168, 85, 247, 0.4)",
      items: [
        { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai" },
        { name: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic" },
        { name: "Google AI", logo: "https://cdn.simpleicons.org/googlegemini" },
      ],
    },
    {
      category: "Automation",
      glowColor: "rgba(129, 140, 248, 0.4)",
      items: [
        { name: "n8n", logo: "https://cdn.simpleicons.org/n8n" },
        { name: "Make", logo: "https://cdn.simpleicons.org/make" },
        { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier" },
      ],
    },
    {
      category: "Integrations",
      glowColor: "rgba(236, 72, 153, 0.4)",
      items: [
        { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce" },
        { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot" },
        { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify" },
      ],
    },
    {
      category: "Development",
      glowColor: "rgba(34, 211, 238, 0.4)",
      items: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python" },
        { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
        { name: "APIs", logo: "https://cdn.simpleicons.org/fastapi" },
      ],
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20" ref={ref}>
      <div className="container max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          Powered by the <span className="gradient-text">Best</span>
        </motion.h2>
        <motion.p
          className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We work with industry-leading AI platforms and tools to build your custom solutions
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, categoryIndex) => (
            <motion.div
              key={tech.category}
              className="space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + categoryIndex * 0.1,
                ease: "easeOut"
              }}
            >
              <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide text-center">
                {tech.category}
              </h3>
              <div className="space-y-3">
                {tech.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${tech.glowColor} 0%, transparent 70%)`,
                        filter: "blur(40px)",
                      }}
                    />

                    <div
                      className="relative flex items-center gap-3 p-4 rounded-lg border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:bg-card"
                      style={{ animationDelay: `${300 + categoryIndex * 100 + itemIndex * 50}ms` }}
                    >
                      <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={item.logo}
                          alt={`${item.name} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Plus dozens more tools and integrations tailored to your specific needs
        </motion.p>
      </div>
    </section>
  )
}

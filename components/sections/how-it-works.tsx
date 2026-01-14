"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      number: "01",
      title: "Discover",
      subtitle: "30-min free consultation",
      description: "We learn your business, challenges, and goals",
      icon: "🔍",
      gradient: "from-purple-500 via-indigo-500 to-purple-600",
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
      number: "02",
      title: "Design",
      subtitle: "Custom AI strategy (1 week)",
      description: "Tailored roadmap with clear deliverables and timeline",
      icon: "🎨",
      gradient: "from-indigo-500 via-pink-500 to-indigo-600",
      glowColor: "rgba(129, 140, 248, 0.4)",
    },
    {
      number: "03",
      title: "Deploy",
      subtitle: "Rapid implementation (2-4 weeks)",
      description: "We build, test, and launch your AI systems",
      icon: "🚀",
      gradient: "from-pink-500 via-rose-500 to-pink-600",
      glowColor: "rgba(236, 72, 153, 0.4)",
    },
    {
      number: "04",
      title: "Dominate",
      subtitle: "Ongoing optimization",
      description: "Continuous improvement and expert support",
      icon: "📈",
      gradient: "from-cyan-500 via-blue-500 to-cyan-600",
      glowColor: "rgba(34, 211, 238, 0.4)",
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background" ref={ref}>
      <div className="container max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Your Path to <span className="gradient-text">AI-Powered Growth</span>
        </motion.h2>
        <motion.p
          className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From first call to full deployment in weeks, not months
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Animated connection line */}
          <motion.div
            className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-30"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative text-center group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${step.glowColor} 0%, transparent 70%)`,
                }}
              />

              {/* Step number circle with pulsing gradient */}
              <motion.div
                className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} text-white font-bold text-2xl mb-6 shadow-xl mx-auto overflow-hidden`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10">{step.number}</span>
              </motion.div>

              {/* Step icon with floating animation */}
              <motion.div
                className="text-5xl mb-6"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {step.icon}
              </motion.div>

              {/* Step content with hover reveal */}
              <motion.div
                className="space-y-3 px-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  {step.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Progress indicator dots */}
                <motion.div
                  className="flex justify-center gap-1.5 pt-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.2 + index * 0.15 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === index ? 'bg-gradient-to-r ' + step.gradient : 'bg-muted'
                      }`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                      whileHover={{ scale: 1.5 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

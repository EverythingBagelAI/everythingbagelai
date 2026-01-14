"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="w-full px-4" ref={ref}>
      <div className="container max-w-5xl mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-gradient-shift" />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Scale with <span className="gradient-text">AI</span>?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Start with a free 30-minute consultation. No commitments, just clarity on what&apos;s
              possible for your business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 }}
            >
              <Button
                asChild
                variant="rainbow"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform animate-glow-pulse"
              >
                <Link href="/consulting">
                  Book Your Free Consultation
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </motion.div>

            <motion.p
              className="mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Or email us at{" "}
              <a
                href="mailto:hello@everythingbagel.ai"
                className="gradient-text font-semibold hover:underline"
              >
                hello@everythingbagel.ai
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

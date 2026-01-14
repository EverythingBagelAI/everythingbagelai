"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const allServices = [
  {
    title: 'AI Strategy & Tool Advisory',
    description: 'Cut through the noise and implement the right AI tools for your business.',
    emoji: '🧠',
    color: 'from-purple-500/20 to-indigo-500/20',
    features: [
      'Technology stack assessment',
      'Custom AI roadmap development',
      'Tool selection and integration planning',
      'ROI projection and timeline',
    ],
  },
  {
    title: 'Lead Generation Systems',
    description: 'AI-powered systems that find and engage the right prospects — automatically.',
    emoji: '🎯',
    color: 'from-pink-500/20 to-rose-500/20',
    features: [
      'Intelligent prospect identification',
      'Hyper-personalized outreach automation',
      'Multi-channel engagement flows',
      'Real-time lead scoring',
    ],
  },
  {
    title: 'Sales Automation',
    description: 'Turn your CRM into a machine that closes deals without constant oversight.',
    emoji: '💼',
    color: 'from-cyan-500/20 to-blue-500/20',
    features: [
      'CRM enhancement and integration',
      'Automated follow-up sequences',
      'Deal tracking and insights',
      'Pipeline optimization',
    ],
  },
  {
    title: 'Content Creation Engine',
    description: 'Your AI creative team — generating quality content across all channels.',
    emoji: '✍️',
    color: 'from-indigo-500/20 to-purple-500/20',
    features: [
      'Brand voice AI training',
      'Multi-format content generation',
      'Social media automation',
      'Content calendar optimization',
    ],
  },
]

export function ServicesShowcase({ serviceIndices }: { serviceIndices: number[] }) {
  const services = serviceIndices.map(i => allServices[i])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="relative w-full px-4 overflow-hidden" ref={ref}>
      {/* Background Beams Layer */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Content Layer */}
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
                y: 30
              }}
              animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0
              } : {
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
                y: 30
              }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: "easeOut"
              }}
            >
              {/* Animation/Visual Side */}
              <div className="flex-1 w-full">
                <div className="relative aspect-square max-w-xs mx-auto">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl blur-3xl opacity-50 animate-pulse`} />

                  {/* Main Visual Container */}
                  <div className="relative h-full flex items-center justify-center">
                    {/* Rotating Border Effect */}
                    <div className="absolute inset-8 border-2 border-dashed rounded-full animate-spin-slow opacity-20"
                      style={{
                        borderColor: 'currentColor',
                        animationDuration: '20s'
                      }}
                    />
                    <div className="absolute inset-16 border-2 border-dashed rounded-full animate-spin-slow opacity-30"
                      style={{
                        borderColor: 'currentColor',
                        animationDuration: '15s',
                        animationDirection: 'reverse'
                      }}
                    />

                    {/* Center Emoji */}
                    <div className="relative z-10">
                      <div className="text-6xl animate-float">
                        {service.emoji}
                      </div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40 animate-float"
                          style={{
                            left: `${20 + i * 20}%`,
                            top: `${10 + (i % 3) * 30}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + i * 0.5}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 w-full">
                <div className="space-y-2 bg-background/80 backdrop-blur-sm rounded-2xl p-6">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-muted-foreground animate-fade-in-up"
                        style={{ animationDelay: `${400 + index * 150 + featureIndex * 50}ms` }}
                      >
                        <span className="text-green-500 text-sm mt-0.5">✓</span>
                        <span className="text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="group hover:border-purple-500/50"
                    >
                      <Link href="/consulting">
                        Learn more
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

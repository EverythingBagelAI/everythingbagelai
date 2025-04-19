"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import confetti from "canvas-confetti"

export interface ConfettiRef {
  fire: () => void
}

interface ConfettiProps {
  className?: string
}

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useImperativeHandle(ref, () => ({
    fire: () => {
      const canvas = canvasRef.current
      if (canvas) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }
  }))

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  )
})

Confetti.displayName = "Confetti" 
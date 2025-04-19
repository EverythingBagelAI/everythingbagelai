"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import confetti from "canvas-confetti"

export interface ConfettiRef {
  fire: () => void
}

export const Confetti = forwardRef<ConfettiRef>((_, ref) => {
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
      className="pointer-events-none fixed inset-0 z-50"
    />
  )
})

Confetti.displayName = "Confetti" 
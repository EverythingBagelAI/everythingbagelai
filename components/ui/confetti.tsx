"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import confetti from "canvas-confetti"

export interface ConfettiRef {
  fire: (options?: confetti.Options) => void
}

interface ConfettiProps {
  className?: string
}

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  ({ className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useImperativeHandle(ref, () => ({
      fire: (options = {}) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const myConfetti = confetti.create(canvas, {
          resize: true,
          useWorker: true,
        })

        const duration = 4000
        const end = Date.now() + duration

        const colors = ["#E92A67", "#A853BA", "#2A8AF6", "#FFD700", "#FF69B4"]

        function frame() {
          const timeLeft = end - Date.now()

          const particleCount = 3 * (timeLeft / duration)

          // Launch confetti from the sides
          myConfetti({
            particleCount: particleCount,
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.7 },
            colors: colors,
            startVelocity: 45,
            gravity: 1,
            drift: 0,
            ticks: 300,
            shapes: ['square', 'circle'],
            scalar: 1.2
          })

          myConfetti({
            particleCount: particleCount,
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 0.7 },
            colors: colors,
            startVelocity: 45,
            gravity: 1,
            drift: 0,
            ticks: 300,
            shapes: ['square', 'circle'],
            scalar: 1.2
          })

          // Launch some confetti from the bottom
          myConfetti({
            particleCount: Math.floor(particleCount/2),
            angle: 90,
            spread: 120,
            origin: { x: 0.5, y: 1 },
            colors: colors,
            startVelocity: 55,
            gravity: 1,
            drift: 0,
            ticks: 300,
            shapes: ['square', 'circle'],
            scalar: 1.2
          })

          if (timeLeft > 0) {
            requestAnimationFrame(frame)
          }
        }

        frame()
      },
    }))

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 100
        }}
      />
    )
  }
)

Confetti.displayName = "Confetti" 
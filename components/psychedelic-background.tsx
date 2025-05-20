"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface PsychedelicBackgroundProps {
  mousePosition: { x: number; y: number }
}

export function PsychedelicBackground({ mousePosition }: PsychedelicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスサイズをウィンドウサイズに合わせる
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // サイケデリックなパターンを描画
    let time = 0
    let animationFrameId: number

    const drawPsychedelicPattern = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 背景グラデーション
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // 時間によって変化する色
      const hue1 = (time * 20) % 360
      const hue2 = (hue1 + 120) % 360
      const hue3 = (hue1 + 240) % 360

      gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, 0.2)`)
      gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 50%, 0.2)`)
      gradient.addColorStop(1, `hsla(${hue3}, 100%, 50%, 0.2)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 波紋パターン
      for (let i = 0; i < 5; i++) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxRadius = Math.max(canvas.width, canvas.height) * 1.5
        const frequency = 0.05 + i * 0.01
        const amplitude = 20 + i * 5
        const phase = time * (0.5 + i * 0.1)

        ctx.beginPath()

        for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
          const radius = maxRadius * (0.1 + 0.4 * Math.sin(angle * 8 + phase)) * (i / 5 + 0.2)
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()

        const ringGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius)
        const ringHue1 = (hue1 + i * 30) % 360
        const ringHue2 = (ringHue1 + 180) % 360

        ringGradient.addColorStop(0, `hsla(${ringHue1}, 100%, 60%, 0.1)`)
        ringGradient.addColorStop(0.5, `hsla(${ringHue2}, 100%, 60%, 0.05)`)
        ringGradient.addColorStop(1, `hsla(${ringHue1}, 100%, 60%, 0)`)

        ctx.fillStyle = ringGradient
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(drawPsychedelicPattern)
    }

    drawPsychedelicPattern()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <motion.div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 255, 0.8), rgba(255, 255, 0, 0.8), rgba(0, 255, 255, 0.8))`,
          filter: "blur(100px)",
        }}
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 255, 0.8), rgba(255, 255, 0, 0.8), rgba(0, 255, 255, 0.8))`,
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.8), rgba(255, 0, 255, 0.8), rgba(255, 255, 0, 0.8))`,
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 0, 0.8), rgba(0, 255, 255, 0.8), rgba(255, 0, 255, 0.8))`,
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 255, 0.8), rgba(255, 255, 0, 0.8), rgba(0, 255, 255, 0.8))`,
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
    </>
  )
}

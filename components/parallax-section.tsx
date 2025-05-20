"use client"

import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  id?: string
  speed?: number
}

export function ParallaxSection({ children, className = "", id, speed = 0.5 }: ParallaxSectionProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <section id={id} className={`relative ${className}`}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* この空のdivはIDのアンカーポイントとして機能し、ヘッダーの下に正しく配置されるようにします */}
      </div>
      <motion.div style={{ y }} className="relative z-10 pt-16 md:pt-20">
        {children}
      </motion.div>
    </section>
  )
}

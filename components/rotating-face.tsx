"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function RotatingFace() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative w-[60vw] h-[60vw] max-w-[600px] max-h-[600px]"
        animate={{
          rotate: [0, 360],
          filter: [
            "hue-rotate(0deg) saturate(150%) brightness(120%)",
            "hue-rotate(90deg) saturate(200%) brightness(150%)",
            "hue-rotate(180deg) saturate(250%) brightness(130%)",
            "hue-rotate(270deg) saturate(200%) brightness(140%)",
            "hue-rotate(360deg) saturate(150%) brightness(120%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Image
          src="/images/顔_背景透過.svg"
          alt="サイケデリックな顔"
          fill
          className="object-contain opacity-30"
          priority
        />
      </motion.div>

      {/* 追加の装飾的な要素 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-yellow-500/10 to-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

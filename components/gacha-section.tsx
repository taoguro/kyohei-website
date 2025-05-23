"use client"

import { motion } from "framer-motion"
import { GachaMachine } from "./gacha-machine"
import { Gift, Sparkles } from "lucide-react"

export function GachaSection() {
  return (
    <section id="collection" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(255, 0, 255, 0.4), transparent 70%)",
              "radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.4), transparent 70%)",
              "radial-gradient(circle at 30% 70%, rgba(255, 255, 0, 0.4), transparent 70%)",
              "radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 0.4), transparent 70%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Gift className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display inline-flex items-center"
              animate={{
                textShadow: [
                  "0 0 5px #ff00ff, 0 0 10px #ff00ff",
                  "0 0 5px #00ffff, 0 0 10px #00ffff",
                  "0 0 5px #ffff00, 0 0 10px #ffff00",
                  "0 0 5px #ff00ff, 0 0 10px #ff00ff",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              GACHA MACHINE
            </motion.h2>
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            全てフィクションです
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* 光るエフェクト */}
          <motion.div
            className="absolute -inset-4 rounded-2xl opacity-50 z-0"
            style={{
              background: "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)",
              backgroundSize: "400% 400%",
              filter: "blur(15px)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10">
            <GachaMachine />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

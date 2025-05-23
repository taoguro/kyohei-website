"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { Instagram, Youtube, Twitch, Twitter, Music, User, MessageCircle, Sparkles, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PsychedelicBackground } from "@/components/psychedelic-background"
import { RotatingFace } from "@/components/rotating-face"
import { ParallaxSection } from "@/components/parallax-section"
import { GachaSection } from "@/components/gacha-section"

export default function Home() {
  const mousePosition = useMousePosition()
  const [activeAvatar, setActiveAvatar] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const avatars = [
    "/images/うざ眼鏡.svg",
    "/images/パーカー.svg",
    "/images/全身_みかん_ホスト風.svg",
    "/images/チャラ男.svg",
  ]
  // テキストシャドウアニメーションの設定
  const textShadowAnimation = {
    textShadow: [
      "0 0 5px #ff00ff, 0 0 10px #ff00ff",
      "0 0 5px #00ffff, 0 0 10px #00ffff",
      "0 0 5px #ffff00, 0 0 10px #ffff00",
      "0 0 5px #ff00ff, 0 0 10px #ff00ff",
    ],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY },
  }

  // ギャラリータイトル用の特別なアニメーション
  const galleryTitleAnimation = {
    textShadow: [
      "0 0 10px #ff00ff, 0 0 20px #ff00ff",
      "0 0 10px #00ffff, 0 0 20px #00ffff",
      "0 0 10px #ffff00, 0 0 20px #ffff00",
      "0 0 10px #ff00ff, 0 0 20px #ff00ff",
    ],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveAvatar((prev) => (prev + 1) % avatars.length)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isHovering, avatars.length])

  // メニュー項目の定義
  const menuItems = [
    { id: "home", ja: "ホーム", en: "HOME" },
    { id: "profile", ja: "プロフィール", en: "PROFILE" },
    { id: "streams", ja: "配信", en: "STREAMS" },
    { id: "gallery", ja: "ギャラリー", en: "GALLERY" },
    { id: "collection", ja: "コレクション", en: "COLLECTION" },
    { id: "contact", ja: "コンタクト", en: "CONTACT" },
  ]

  // アクティブなセクションを検出
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.id)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [menuItems])

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white font-psychedelic relative">
      {/* サイケデリック背景 */}
      <PsychedelicBackground mousePosition={mousePosition} />

      {/* 回転する顔の背景 */}
      <RotatingFace />

      {/* 新しいヘッダー */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20"
        style={{ opacity: headerOpacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* ネオンライン上部 */}
        <motion.div
          className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: { duration: 10, repeat: Number.POSITIVE_INFINITY },
          }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-between">
          {/* ロゴ部分 */}
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500"
              animate={textShadowAnimation}
            >
              KyoHey
            </motion.h1>
          </motion.div>

          {/* ナビゲーション - モバイルでも表示 */}
          <nav className="flex items-center">
            <div className="overflow-x-auto hide-scrollbar py-1 max-w-[calc(100vw-120px)]">
              <ul className="flex space-x-1 sm:space-x-3 md:space-x-6 whitespace-nowrap px-1">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "relative text-xs sm:text-sm md:text-base transition-colors duration-300 group font-bold px-1 sm:px-2 py-1",
                        activeSection === item.id
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500"
                          : "text-gray-300 hover:text-white",
                      )}
                    >
                      {item.en}
                      {activeSection === item.id && (
                        <motion.span
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500"
                          layoutId="activeSection"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* ネオンライン下部 */}
        <motion.div
          className="h-1 w-full bg-gradient-to-r from-cyan-500 via-yellow-500 to-pink-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 0.5 },
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
      </motion.header>

      {/* ヒーローセクション */}
      <ParallaxSection
        id="home"
        className="h-screen flex flex-col items-center justify-center px-4 pt-16 md:pt-0"
        speed={0.2}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display"
              animate={textShadowAnimation}
            >
              KyoHey
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 font-bold"
              animate={{
                scale: [1, 1.05, 1],
                transition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
              }}
            >
              KyoHey NO HOME PEGI DESU
            </motion.p>
            <p className="text-base md:text-lg mb-6 md:mb-8 max-w-lg text-gray-300">
              ゲーム実況、トーク、音楽など多彩なコンテンツを配信中！ あなたの日常に刺激と興奮をお届けします。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <Button
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold relative overflow-hidden group"
                onClick={() => document.getElementById("streams")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="relative z-10">CHECK STREAMS</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
              <Button
                variant="outline"
                className="border-pink-500 text-pink-500 hover:bg-pink-500/10 font-bold"
                onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}
              >
                VIEW PROFILE
              </Button>
            </div>
          </div>

          <motion.div
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 mt-4 md:mt-0"
            style={{ rotate: rotation }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 opacity-50 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                transition: { duration: 10, repeat: Number.POSITIVE_INFINITY },
              }}
            />
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-500 cursor-pointer",
                  activeAvatar === index ? "opacity-100 scale-100" : "opacity-0 scale-95",
                )}
                onMouseEnter={() => {
                  setIsHovering(true)
                  setActiveAvatar(index)
                }}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt={`きょうへいのアバター ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.div
            className="animate-bounce"
            animate={{
              y: [0, 10, 0],
              filter: ["drop-shadow(0 0 5px #ff00ff)", "drop-shadow(0 0 5px #00ffff)", "drop-shadow(0 0 5px #ff00ff)"],
              transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </ParallaxSection>

      {/* プロフィールセクション */}
      <ParallaxSection id="profile" className="min-h-screen py-20 px-4" speed={0.4}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            animate={textShadowAnimation}
          >
            PROFILE
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-80 md:h-96"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 opacity-50 blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  transition: { duration: 10, repeat: Number.POSITIVE_INFINITY },
                }}
              />
              <Image
                src="/images/全身_みかん_ホスト風.svg"
                alt="きょうへいのプロフィール画像"
                fill
                className="object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-lg backdrop-blur-md border border-purple-500/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <User className="w-6 h-6 text-pink-400 mr-2" />
                    <h3 className="text-xl font-bold text-pink-400 font-display">BASIC INFO</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <span className="font-bold text-white">名前:</span> KyoHey
                    </li>
                    <li>
                      <span className="font-bold text-white">活動開始:</span> 2019年10月1日
                    </li>
                    <li>
                      <span className="font-bold text-white">ジャンル:</span> ライブ配信（雑談、歌、ゲーム）
                    </li>
                    <li>
                      <span className="font-bold text-white">特徴:</span> ハッピーな世界観と独特のキャラクター
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-6 rounded-lg backdrop-blur-md border border-cyan-500/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <Music className="w-6 h-6 text-cyan-400 mr-2" />
                    <h3 className="text-xl font-bold text-cyan-400 font-display">FAVORITES</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>音楽制作</li>
                    <li>ゲーム</li>
                    <li>視聴者との交流</li>
                    <li>新しい配信スタイルの実験</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* 配信スケジュールセクション - 更新版 */}
      <ParallaxSection id="streams" className="min-h-screen py-20 px-4" speed={0.6}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            animate={textShadowAnimation}
          >
            STREAMS
          </motion.h2>

          {/* 新しい配信時間表示 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* 背景エフェクト */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-30 z-0"
              style={{
                background: "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3))",
                filter: "blur(20px)",
              }}
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3))",
                  "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 255, 0, 0.3))",
                  "linear-gradient(135deg, rgba(255, 255, 0, 0.3), rgba(255, 0, 255, 0.3))",
                ],
                transition: { duration: 10, repeat: Number.POSITIVE_INFINITY },
              }}
            />

            <div className="bg-black/50 backdrop-blur-md rounded-3xl border border-purple-500/30 p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Clock className="h-8 w-8 text-pink-400" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                      毎日配信
                    </h3>
                  </div>
                </div>

                <motion.div
                  className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-5 rounded-full flex items-center justify-center relative"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 0, 255, 0.5)",
                      "0 0 30px rgba(255, 0, 255, 0.7)",
                      "0 0 20px rgba(255, 0, 255, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px dashed rgba(255, 0, 255, 0.5)" }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <div className="text-center p-6">
                    <motion.div
                      className="text-4xl md:text-5xl font-bold text-white mb-1"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(255, 0, 255, 0.8)",
                          "0 0 15px rgba(255, 0, 255, 0.8)",
                          "0 0 10px rgba(255, 0, 255, 0.8)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      LIVE
                    </motion.div>
                    <div className="text-pink-300 text-sm">毎日開催</div>
                  </div>
                </motion.div>
              </div>

              {/* 配信時間の詳細 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-xl border border-purple-500/30 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  />

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-purple-300 mb-2">配信時間</h4>
                      <div className="space-y-2 text-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                            23:00〜24:00
                          </span>
                          <span className="text-gray-400">開始</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            2:00〜2:30
                          </span>
                          <span className="text-gray-400">終了</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-pink-900/30 to-red-900/30 p-6 rounded-xl border border-pink-500/30 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-500/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-pink-300 mb-2">特別配信</h4>
                      <p className="text-gray-300 mb-3">たまに朝方までのロング配信や、特別企画も実施！お見逃しなく！</p>
                      <div className="flex flex-wrap gap-2">
                        {["ゲーム実況", "雑談", "音楽", "コラボ", "視聴者参加"].map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-pink-500/20 to-red-500/20 px-3 py-1 rounded-full text-sm text-pink-200 border border-pink-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* プラットフォーム */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 text-center"
              >
                <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-6">
                  配信プラットフォーム
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { icon: <Twitch className="h-6 w-6" />, name: "Twitch", color: "from-purple-600 to-pink-600" },
                    { icon: <Youtube className="h-6 w-6" />, name: "YouTube", color: "from-red-600 to-orange-600" },
                  ].map((platform, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className={`flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${platform.color} text-white font-bold relative overflow-hidden`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        animate={{
                          opacity: [0, 0.2, 0],
                          transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
                        }}
                      />
                      {platform.icon}
                      <span>{platform.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* 注意書き */}
              <p className="text-gray-400 text-center mt-8 text-sm">
                ※配信時間は変更になる場合があります。最新情報はSNSをチェック！
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 hover:from-purple-700 hover:via-pink-700 hover:to-yellow-700 text-white font-bold relative overflow-hidden group">
              <span className="relative z-10">SUBSCRIBE TO CHANNEL</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ギャラリーセクション - 縦長の新デザイン */}
      <section id="gallery" className="relative min-h-[300vh] overflow-hidden">
        {/* タイトル */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display sticky top-32 z-30 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          animate={galleryTitleAnimation}
        >
          GALLERY
        </motion.h2>

        {/* 背景エフェクト */}
        <div className="absolute inset-0 z-0">
          {/* 上部のグラデーション（前のセクションとの境界） */}
          <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-background to-transparent z-10"></div>

          {/* メインの背景 */}
          <div className="absolute inset-0 bg-black/80">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(255, 0, 255, 0.6), transparent 70%)",
                  "radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.6), transparent 70%)",
                  "radial-gradient(circle at 30% 70%, rgba(255, 255, 0, 0.6), transparent 70%)",
                  "radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 0.6), transparent 70%)",
                ],
                transition: { duration: 15, repeat: Number.POSITIVE_INFINITY },
              }}
            />
          </div>

          {/* 下部のグラデーション（次のセクションとの境界） */}
          <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-background to-transparent z-10"></div>
        </div>

        {/* 縦に流れる光の線 */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute top-0 w-[1px] h-full z-10"
            style={{
              left: `${10 + i * 8}%`,
              background: `linear-gradient(to bottom, 
                transparent, 
                ${i % 3 === 0 ? "#ff00ff" : i % 3 === 1 ? "#00ffff" : "#ffff00"}80, 
                transparent)`,
              opacity: 0.4,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              height: ["0%", "100%", "0%"],
              top: ["0%", "0%", "100%"],
              transition: {
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              },
            }}
          />
        ))}

        {/* キャラクター1 - 左上から右下へ */}
        <motion.div
          className="sticky top-[20vh] left-0 w-full h-screen flex items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-20% 0px" }}
        >
          <motion.div
            className="absolute w-[80vw] max-w-3xl h-[80vh] max-h-[600px]"
            initial={{ x: "-100%", y: "-50%", rotate: -20 }}
            whileInView={{ x: "0%", y: "0%", rotate: 0 }}
            viewport={{ once: false, margin: "-20% 0px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3))",
                  filter: "blur(20px)",
                }}
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3))",
                    "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 255, 0, 0.3))",
                    "linear-gradient(135deg, rgba(255, 255, 0, 0.3), rgba(255, 0, 255, 0.3))",
                  ],
                  transition: { duration: 10, repeat: Number.POSITIVE_INFINITY },
                }}
              />
              <Image src="/images/うざ眼鏡.svg" alt="キャラクター1" fill className="object-contain p-8" />
            </div>
          </motion.div>
        </motion.div>

        {/* キャラクター2 - 右から左へ */}
        <motion.div
          className="sticky top-[30vh] left-0 w-full h-screen flex items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-10% 0px" }}
        >
          <motion.div
            className="absolute w-[90vw] max-w-3xl h-[90vh] max-h-[700px]"
            initial={{ x: "100%", rotate: 20 }}
            whileInView={{ x: "0%", rotate: 0 }}
            viewport={{ once: false, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 255, 0, 0.3))",
                  filter: "blur(20px)",
                }}
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 255, 0, 0.3))",
                    "linear-gradient(135deg, rgba(255, 255, 0, 0.3), rgba(255, 0, 255, 0.3))",
                    "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3))",
                  ],
                  transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 },
                }}
              />
              <Image src="/images/パーカー.svg" alt="キャラクター2" fill className="object-contain p-8" />
            </div>
          </motion.div>
        </motion.div>

        {/* キャラクター3 - 中央から拡大 */}
        <motion.div
          className="sticky top-[40vh] left-0 w-full h-screen flex items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "0% 0px" }}
        >
          <motion.div
            className="absolute w-[100vw] max-w-4xl h-[100vh] max-h-[800px]"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, margin: "0% 0px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255, 255, 0, 0.4), transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(255, 255, 0, 0.4), transparent 70%)",
                    "radial-gradient(circle, rgba(255, 0, 255, 0.4), transparent 70%)",
                    "radial-gradient(circle, rgba(0, 255, 255, 0.4), transparent 70%)",
                  ],
                  scale: [1, 1.1, 1],
                  transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 4 },
                }}
              />
              <Image src="/images/全身_みかん_ホスト風.svg" alt="キャラクター3" fill className="object-contain p-8" />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "4px solid rgba(255, 255, 0, 0.3)" }}
                animate={{
                  borderColor: ["rgba(255, 255, 0, 0.3)", "rgba(255, 0, 255, 0.3)", "rgba(0, 255, 255, 0.3)"],
                  rotate: [0, 360],
                  transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* キャラクター4 - 下から上へ */}
        <motion.div
          className="sticky top-[50vh] left-0 w-full h-screen flex items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "10% 0px" }}
        >
          <motion.div
            className="absolute w-[85vw] max-w-3xl h-[85vh] max-h-[650px]"
            initial={{ x: "50%", y: "30%", rotate: 15, scale: 0.8 }}
            whileInView={{ x: "0%", y: "0%", rotate: 0, scale: 1 }}
            viewport={{ once: false, margin: "10% 0px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(255, 255, 0, 0.3))",
                  filter: "blur(20px)",
                }}
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(255, 255, 0, 0.3))",
                    "linear-gradient(135deg, rgba(255, 255, 0, 0.3), rgba(0, 255, 255, 0.3))",
                    "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3))",
                  ],
                  transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 6 },
                }}
              />
              <Image src="/images/チャラ男.svg" alt="キャラクター4" fill className="object-contain p-8" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ガチャセクション */}
      <GachaSection />

      {/* コンタクトセクション */}
      <ParallaxSection id="contact" className="min-h-screen py-20 px-4" speed={0.5}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            animate={textShadowAnimation}
          >
            CONTACT
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg backdrop-blur-md border border-purple-500/30"
              whileHover={{
                boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)",
              }}
            >
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 text-pink-400 mr-2" />
                <h3 className="text-xl font-bold text-pink-400 font-display">CONTACT INFO</h3>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-300 mb-4">お問い合わせは以下のメールアドレスまでお願いします。</p>

                  <motion.div
                    className="relative group cursor-pointer mx-auto max-w-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText("kyohey.contact@gmail.com")
                      alert("メールアドレスをコピーしました！")
                    }}
                  >
                    <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                      <p className="font-mono text-lg md:text-xl text-white break-all">kyohey.contact@gmail.com</p>
                      <p className="text-xs text-gray-400 mt-2">クリックでコピー</p>
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-lg"
                      animate={{
                        opacity: [0, 0.5, 0],
                        background: [
                          "linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))",
                          "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))",
                          "linear-gradient(to right, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))",
                        ],
                        transition: { duration: 5, repeat: Number.POSITIVE_INFINITY },
                      }}
                    />
                  </motion.div>
                </div>

                <div className="text-center">
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-px rounded-full">
                      <div className="bg-black/50 rounded-full p-3">
                        <MessageCircle className="w-8 h-8 text-pink-400" />
                      </div>
                    </div>
                  </motion.div>
                  <p className="mt-4 text-gray-300">24時間以内に返信いたします</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg backdrop-blur-md mb-8 border border-blue-500/30"
                whileHover={{
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                }}
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-4 font-display">FOLLOW ON SNS</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Twitch className="w-5 h-5" />,
                      name: "Twitch",
                      color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                    },
                    {
                      icon: <Youtube className="w-5 h-5" />,
                      name: "YouTube",
                      color: "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700",
                    },
                    {
                      icon: <Twitter className="w-5 h-5" />,
                      name: "Twitter",
                      color: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
                    },
                    {
                      icon: <Instagram className="w-5 h-5" />,
                      name: "Instagram",
                      color: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className={`flex items-center justify-center gap-2 p-3 rounded-md text-white ${social.color} transition-colors duration-300 relative overflow-hidden`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        animate={{
                          opacity: [0, 0.2, 0],
                          transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                        }}
                      />
                      {social.icon}
                      <span>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-900/30 to-yellow-900/30 p-6 rounded-lg backdrop-blur-md border border-green-500/30"
                whileHover={{
                  boxShadow: "0 0 20px rgba(255, 255, 0, 0.3)",
                }}
              >
                <h3 className="text-xl font-bold text-green-400 mb-4 font-display">SUPPORT</h3>
                <p className="text-gray-300 mb-4">
                  KyoHeyの活動を応援してくれる方は、以下のリンクからサポートすることができます。
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-bold relative overflow-hidden group">
                    <span className="relative z-10">JOIN MEMBERSHIP</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <motion.span
                      className="absolute -top-1 -right-1"
                      animate={{
                        rotate: [0, 10, 0, -10, 0],
                        transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-500 hover:bg-green-500/10 font-bold"
                  >
                    DONATE
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* フッター */}
      <footer className="py-8 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            KyoHey
          </motion.h2>
          <p className="text-gray-400 mb-6">KyoHey NO HOME PEGI DESU</p>
          <div className="flex justify-center space-x-4 mb-6">
            {[
              <Twitch key="twitch" className="w-5 h-5" />,
              <Youtube key="youtube" className="w-5 h-5" />,
              <Twitter key="twitter" className="w-5 h-5" />,
              <Instagram key="instagram" className="w-5 h-5" />,
            ].map((icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  filter: [
                    "drop-shadow(0 0 3px #ff00ff)",
                    "drop-shadow(0 0 3px #00ffff)",
                    "drop-shadow(0 0 3px #ffff00)",
                  ],
                  transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} KYOHEI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

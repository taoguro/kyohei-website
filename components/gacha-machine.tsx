"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Star, X, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ガチャアイテムの定義
type GachaItem = {
  id: number
  name: string
  description: string
  image: string
  rarity: "common" | "rare" | "super-rare" | "ultra-rare"
}

// コレクションアイテムの型（数量を含む）
type CollectionItem = GachaItem & {
  quantity: number
}

// ガチャアイテムのデータ
const GACHA_ITEMS: GachaItem[] = [
  {
    id: 1,
    name: "きょうへいステッカー",
    description: "定番のきょうへいステッカー。配信でよく使われるリアクション顔です。",
    image: "/images/anime-streamer-sticker.png",
    rarity: "common",
  },
  {
    id: 2,
    name: "へいへいズバッジ",
    description: "ファンクラブ公式バッジ。胸に付ければあなたもへいへいズの一員！",
    image: "/images/placeholder-1uni9.png",
    rarity: "common",
  },
  {
    id: 3,
    name: "きょうへいぬいぐるみ",
    description: "小さくてかわいいきょうへいのぬいぐるみ。デスクに置いて癒されよう。",
    image: "/images/cute-anime-plushie.png",
    rarity: "rare",
  },
  {
    id: 4,
    name: "サイン入りチェキ",
    description: "きょうへい直筆サイン入りのチェキ写真。貴重なコレクションアイテム！",
    image: "/images/placeholder-ayh2v.png",
    rarity: "rare",
  },
  {
    id: 5,
    name: "限定コスプレフォト",
    description: "あの伝説の配信で着用した衣装のきょうへい。ファン垂涎のレアショット！",
    image: "/images/anime-cosplay.png",
    rarity: "super-rare",
  },
  {
    id: 6,
    name: "ゴールデンマイク",
    description: "初の歌配信で使用したマイクのレプリカ。金色に輝く逸品。",
    image: "/images/golden-microphone.png",
    rarity: "super-rare",
  },
  {
    id: 7,
    name: "伝説の配信瞬間",
    description: "視聴者数10万人を突破した伝説の配信の決定的瞬間。歴史的価値あり！",
    image: "/images/streamer-celebration.png",
    rarity: "ultra-rare",
  },
]

// レア度に応じた確率設定
const RARITY_PROBABILITY = {
  common: 60, // 60%
  rare: 25, // 25%
  "super-rare": 10, // 10%
  "ultra-rare": 5, // 5%
}

// レア度に応じた色とエフェクト
const RARITY_STYLES = {
  common: {
    bgColor: "bg-blue-900/50",
    textColor: "text-blue-300",
    borderColor: "border-blue-500/70",
    icon: <Star className="h-4 w-4" />,
  },
  rare: {
    bgColor: "bg-purple-900/50",
    textColor: "text-purple-300",
    borderColor: "border-purple-500/70",
    icon: <Star className="h-4 w-4" />,
  },
  "super-rare": {
    bgColor: "bg-yellow-900/50",
    textColor: "text-yellow-300",
    borderColor: "border-yellow-500/70",
    icon: <Trophy className="h-4 w-4" />,
  },
  "ultra-rare": {
    bgColor: "bg-pink-900/50",
    textColor: "text-pink-300",
    borderColor: "border-pink-500/70",
    icon: <Sparkles className="h-4 w-4" />,
  },
}

export function GachaMachine() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [currentItem, setCurrentItem] = useState<GachaItem | null>(null)
  const [collection, setCollection] = useState<GachaItem[]>([])
  const [showCollection, setShowCollection] = useState(false)

  // コレクションアイテムをグループ化して数量を追加
  const groupedCollection = useMemo(() => {
    const grouped: { [key: number]: CollectionItem } = {}

    collection.forEach((item) => {
      if (!grouped[item.id]) {
        grouped[item.id] = { ...item, quantity: 1 }
      } else {
        grouped[item.id].quantity += 1
      }
    })

    return Object.values(grouped)
  }, [collection])

  // ユニークなアイテム数を計算
  const uniqueItemsCount = useMemo(() => {
    return groupedCollection.length
  }, [groupedCollection])

  // 全アイテム種類数
  const totalItemTypes = GACHA_ITEMS.length

  // コレクションをローカルストレージから読み込む
  useEffect(() => {
    const savedCollection = localStorage.getItem("kyohei-gacha-collection")
    if (savedCollection) {
      try {
        setCollection(JSON.parse(savedCollection))
      } catch (e) {
        console.error("コレクションの読み込みに失敗しました", e)
      }
    }
  }, [])

  // コレクションをローカルストレージに保存
  useEffect(() => {
    if (collection.length > 0) {
      localStorage.setItem("kyohei-gacha-collection", JSON.stringify(collection))
    }
  }, [collection])

  // ガチャを回す処理
  const spinGacha = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // ガチャの演出時間（ミリ秒）
    const spinDuration = 2000

    // 確率に基づいてレア度を決定
    const rarityRoll = Math.random() * 100
    let selectedRarity: GachaItem["rarity"] = "common"

    if (rarityRoll < RARITY_PROBABILITY["ultra-rare"]) {
      selectedRarity = "ultra-rare"
    } else if (rarityRoll < RARITY_PROBABILITY["ultra-rare"] + RARITY_PROBABILITY["super-rare"]) {
      selectedRarity = "super-rare"
    } else if (
      rarityRoll <
      RARITY_PROBABILITY["ultra-rare"] + RARITY_PROBABILITY["super-rare"] + RARITY_PROBABILITY["rare"]
    ) {
      selectedRarity = "rare"
    }

    // 選択されたレア度のアイテムをフィルタリング
    const possibleItems = GACHA_ITEMS.filter((item) => item.rarity === selectedRarity)

    // ランダムにアイテムを選択
    const selectedItem = possibleItems[Math.floor(Math.random() * possibleItems.length)]

    // 演出後に結果を表示
    setTimeout(() => {
      setCurrentItem(selectedItem)
      setIsSpinning(false)
      setShowResult(true)

      // コレクションに追加（重複は許可）
      setCollection((prev) => [...prev, selectedItem])
    }, spinDuration)
  }

  // 結果モーダルを閉じる
  const closeResult = () => {
    setShowResult(false)
    setCurrentItem(null)
  }

  // コレクションモーダルの切り替え
  const toggleCollection = () => {
    setShowCollection(!showCollection)
  }

  // コレクションアイテムをクリックしたときの処理
  const showItemDetail = (item: GachaItem) => {
    setCurrentItem(item)
    setShowResult(true)
    setShowCollection(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* ガチャガチャ本体 */}
      <div
        className="relative bg-gradient-to-b from-red-900/70 to-red-700/70 backdrop-blur-md rounded-t-3xl rounded-b-xl p-6 shadow-xl border-4 border-yellow-500/70"
        style={{ boxShadow: "0 0 30px rgba(255,0,0,0.3)" }}
      >
        {/* ガチャガチャのトップ部分 */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-500/90 rounded-full flex items-center justify-center border-4 border-yellow-600/90"
          style={{ boxShadow: "0 0 15px rgba(255,215,0,0.5)" }}
        >
          <Gift className="h-8 w-8 text-red-500" />
        </div>

        {/* ガラスドーム */}
        <div
          className="bg-blue-900/30 backdrop-blur-md rounded-full w-48 h-48 mx-auto mb-6 border-8 border-blue-500/50 flex items-center justify-center overflow-hidden relative"
          style={{ boxShadow: "0 0 20px rgba(0,0,255,0.3), inset 0 0 30px rgba(0,0,255,0.2)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>

          {/* サイケデリックな背景効果 */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(circle at center, rgba(255,105,180,0.3), rgba(147,112,219,0.3))",
            }}
            animate={{
              background: [
                "radial-gradient(circle at center, rgba(255,105,180,0.3), rgba(147,112,219,0.3))",
                "radial-gradient(circle at center, rgba(147,112,219,0.3), rgba(255,215,0,0.3))",
                "radial-gradient(circle at center, rgba(255,215,0,0.3), rgba(255,105,180,0.3))",
              ],
              rotate: [0, 360],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* カプセル */}
          <motion.div
            animate={
              isSpinning
                ? {
                    y: [0, -20, 0, -15, 0, -10, 0],
                    rotate: [0, 10, -10, 8, -8, 5, -5, 0],
                    scale: [1, 1.05, 0.95, 1],
                    filter: [
                      "hue-rotate(0deg) brightness(1)",
                      "hue-rotate(90deg) brightness(1.2)",
                      "hue-rotate(180deg) brightness(1)",
                      "hue-rotate(270deg) brightness(1.2)",
                      "hue-rotate(360deg) brightness(1)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: isSpinning ? Number.POSITIVE_INFINITY : 0 }}
            className="w-24 h-24 bg-gradient-to-b from-pink-500/80 to-pink-700/80 rounded-full flex items-center justify-center border-4 border-pink-400/80"
            style={{ boxShadow: "0 0 15px rgba(255,105,180,0.5)" }}
          >
            <div className="w-full h-1/2 bg-pink-300/80 rounded-t-full"></div>
          </motion.div>
        </div>

        {/* コントロール部分 */}
        <div
          className="bg-black/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center"
          style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}
        >
          <Button
            onClick={spinGacha}
            disabled={isSpinning}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-6 px-8 rounded-full shadow-lg transform transition-transform active:scale-95 disabled:opacity-50"
            style={{ boxShadow: "0 0 15px rgba(255,215,0,0.5)" }}
          >
            {isSpinning ? "回転中..." : "ガチャを回す！"}
          </Button>

          <div className="mt-4 flex justify-between w-full">
            <Button
              variant="outline"
              onClick={toggleCollection}
              className="text-yellow-300 border-yellow-500/50 hover:bg-yellow-900/30"
              style={{ boxShadow: "0 0 10px rgba(255,215,0,0.3)" }}
            >
              コレクション
            </Button>
            <div className="text-white text-sm flex flex-col items-end">
              <div>
                <span className="font-bold text-yellow-300">{collection.length}</span>{" "}
                <span className="text-yellow-100">個獲得</span>
              </div>
              <div>
                <span className="font-bold text-yellow-300">{uniqueItemsCount}</span>
                <span className="text-yellow-100">/{totalItemTypes} 種類</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ガチャ結果モーダル */}
      <AnimatePresence>
        {showResult && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeResult}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-black/70 backdrop-blur-md rounded-xl p-6 max-w-sm w-full shadow-2xl"
              style={{
                boxShadow:
                  currentItem.rarity === "common"
                    ? "0 0 30px rgba(0,0,255,0.5)"
                    : currentItem.rarity === "rare"
                      ? "0 0 30px rgba(147,112,219,0.5)"
                      : currentItem.rarity === "super-rare"
                        ? "0 0 30px rgba(255,215,0,0.5)"
                        : "0 0 30px rgba(255,105,180,0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1",
                    RARITY_STYLES[currentItem.rarity].bgColor,
                    RARITY_STYLES[currentItem.rarity].textColor,
                  )}
                  style={{
                    boxShadow:
                      currentItem.rarity === "common"
                        ? "0 0 10px rgba(0,0,255,0.5)"
                        : currentItem.rarity === "rare"
                          ? "0 0 10px rgba(147,112,219,0.5)"
                          : currentItem.rarity === "super-rare"
                            ? "0 0 10px rgba(255,215,0,0.5)"
                            : "0 0 10px rgba(255,105,180,0.5)",
                  }}
                >
                  {RARITY_STYLES[currentItem.rarity].icon}
                  {currentItem.rarity === "common"
                    ? "ノーマル"
                    : currentItem.rarity === "rare"
                      ? "レア"
                      : currentItem.rarity === "super-rare"
                        ? "スーパーレア"
                        : "ウルトラレア"}
                </div>
                <button onClick={closeResult} className="text-gray-400 hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div
                  className={cn(
                    "relative w-40 h-40 rounded-lg overflow-hidden mb-4 border-4",
                    RARITY_STYLES[currentItem.rarity].borderColor,
                  )}
                  style={{
                    boxShadow:
                      currentItem.rarity === "common"
                        ? "0 0 15px rgba(0,0,255,0.5)"
                        : currentItem.rarity === "rare"
                          ? "0 0 15px rgba(147,112,219,0.5)"
                          : currentItem.rarity === "super-rare"
                            ? "0 0 15px rgba(255,215,0,0.5)"
                            : "0 0 15px rgba(255,105,180,0.5)",
                  }}
                >
                  <Image
                    src={currentItem.image || "/placeholder.svg"}
                    alt={currentItem.name}
                    fill
                    className="object-cover"
                  />

                  {/* キラキラエフェクト（レア以上の場合） */}
                  {currentItem.rarity !== "common" && (
                    <motion.div
                      animate={{
                        background: [
                          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                          "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)",
                          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                        ],
                        filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0 pointer-events-none"
                    />
                  )}
                </div>

                <h3 className={cn("text-xl font-bold mb-2", RARITY_STYLES[currentItem.rarity].textColor)}>
                  {currentItem.name}
                </h3>
                <p className="text-gray-300 text-center text-sm">{currentItem.description}</p>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="mt-6"
                >
                  <Button
                    onClick={closeResult}
                    className={cn(
                      "bg-gradient-to-r",
                      currentItem.rarity === "common"
                        ? "from-blue-600 to-blue-700"
                        : currentItem.rarity === "rare"
                          ? "from-purple-600 to-purple-700"
                          : currentItem.rarity === "super-rare"
                            ? "from-yellow-600 to-yellow-700"
                            : "from-pink-600 to-pink-700",
                    )}
                    style={{
                      boxShadow:
                        currentItem.rarity === "common"
                          ? "0 0 10px rgba(0,0,255,0.5)"
                          : currentItem.rarity === "rare"
                            ? "0 0 10px rgba(147,112,219,0.5)"
                            : currentItem.rarity === "super-rare"
                              ? "0 0 10px rgba(255,215,0,0.5)"
                              : "0 0 10px rgba(255,105,180,0.5)",
                    }}
                  >
                    OK
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* コレクションモーダル */}
      <AnimatePresence>
        {showCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowCollection(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-black/70 backdrop-blur-md rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              style={{ boxShadow: "0 0 30px rgba(255,215,0,0.4)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className="text-2xl font-bold text-yellow-300 font-mono tracking-wider uppercase"
                  style={{ textShadow: "0 0 10px rgba(255,215,0,0.5)" }}
                >
                  KYOHEI COLLECTION
                </h2>
                <button onClick={() => setShowCollection(false)} className="text-gray-400 hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {collection.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <Gift className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>まだアイテムを獲得していません。ガチャを回してコレクションを増やしましょう！</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {groupedCollection.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "rounded-lg p-3 border-2 cursor-pointer relative",
                        RARITY_STYLES[item.rarity].borderColor,
                        RARITY_STYLES[item.rarity].bgColor,
                      )}
                      style={{
                        boxShadow:
                          item.rarity === "common"
                            ? "0 0 10px rgba(0,0,255,0.3)"
                            : item.rarity === "rare"
                              ? "0 0 10px rgba(147,112,219,0.3)"
                              : item.rarity === "super-rare"
                                ? "0 0 10px rgba(255,215,0,0.3)"
                                : "0 0 10px rgba(255,105,180,0.3)",
                      }}
                      onClick={() => showItemDetail(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-full aspect-square rounded overflow-hidden mb-2">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              "linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0) 100%)",
                              "linear-gradient(45deg, rgba(0,0,0,0) 100%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0) 0%)",
                            ],
                          }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        />
                      </div>
                      <div className="flex items-start justify-between">
                        <h4 className={cn("text-sm font-bold", RARITY_STYLES[item.rarity].textColor)}>{item.name}</h4>
                        <div className={cn("flex items-center gap-1", RARITY_STYLES[item.rarity].textColor)}>
                          {RARITY_STYLES[item.rarity].icon}
                          {item.quantity > 1 && (
                            <span className="text-xs font-bold bg-black/30 px-1.5 py-0.5 rounded-full">
                              ×{item.quantity}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* クリック可能を示すヒント */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">詳細を見る</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

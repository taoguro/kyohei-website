import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// メタデータを更新して、ガチャ機能を含むことを示す
export const metadata = {
  title: "KyoHey - ライブ配信者",
  description: "KyoHeyの公式ウェブサイト。限定アイテムのガチャも！",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

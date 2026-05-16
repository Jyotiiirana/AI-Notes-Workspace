"use client"

import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      
      <button
        onClick={() => setTheme("light")}
        className={`rounded-xl p-2 transition ${
          theme === "light"
            ? "bg-black text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        <Sun size={18} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`rounded-xl p-2 transition ${
          theme === "dark"
            ? "bg-white text-black"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        <Moon size={18} />
      </button>

      <button
        onClick={() => setTheme("pink")}
        className={`rounded-xl p-2 transition ${
          theme === "pink"
            ? "bg-pink-500 text-white"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        <Sparkles size={18} />
      </button>

    </div>
  )
}
"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface MetricTileProps {
  title: string
  value: number
  icon: LucideIcon
  color: string
  delay?: number
}

export function MetricTile({ title, value, icon: Icon, color, delay = 0 }: MetricTileProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const increment = value / 20
      const counter = setInterval(() => {
        start += increment
        if (start >= value) {
          setDisplayValue(value)
          clearInterval(counter)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 50)
      return () => clearInterval(counter)
    }, delay * 100)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-white mt-1">{displayValue}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

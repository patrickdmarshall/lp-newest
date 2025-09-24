"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface GrowthChartProps {
  data: Array<{
    month: string
    applications?: number
    opportunities?: number
    applicants?: number
    shows?: number
  }>
  title: string
}

export function GrowthChart({ data, title }: GrowthChartProps) {
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.applications || 0, d.opportunities || 0, d.applicants || 0, d.shows || 0)),
  )

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const value = item.applications || item.opportunities || item.applicants || item.shows || 0
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0

          return (
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{item.month}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

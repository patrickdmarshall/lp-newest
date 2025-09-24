"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface HeroCardProps {
  name: string
  role: "artist" | "venue" | "admin"
  avatar?: string
  primaryStat: { label: string; value: number }
  secondaryStat: { label: string; value: number }
}

export function HeroCard({ name, role, avatar, primaryStat, secondaryStat }: HeroCardProps) {
  const roleColors = {
    artist: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    venue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    admin: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  }

  const roleTextColors = {
    artist: "text-orange-400",
    venue: "text-blue-400",
    admin: "text-purple-400",
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className={`bg-gradient-to-r ${roleColors[role]} backdrop-blur-sm border p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="bg-slate-700 text-white text-lg">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-white">{name}</h2>
              <p className={`text-sm font-medium capitalize ${roleTextColors[role]}`}>{role}</p>
            </div>
          </div>

          <div className="flex space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{primaryStat.value}</div>
              <div className="text-sm text-slate-400">{primaryStat.label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{secondaryStat.value}</div>
              <div className="text-sm text-slate-400">{secondaryStat.label}</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

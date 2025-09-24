"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Music, Instagram, Youtube } from "lucide-react"

interface AboutProps {
  bio?: string
  shows?: string[]
  socialLinks?: {
    spotify?: string
    instagram?: string
    youtube?: string
  }
}

export default function About({ bio, shows, socialLinks }: AboutProps) {
  return (
    <div className="space-y-8">
      {bio && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">About</h2>
            <p className="text-slate-300 leading-relaxed">{bio}</p>
          </Card>
        </motion.div>
      )}

      {shows && shows.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Notable Shows</h3>
            <ul className="space-y-2">
              {shows.map((show, index) => (
                <li key={index} className="text-slate-300 flex items-center">
                  <span className="text-orange-400 mr-3">•</span>
                  {show}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {socialLinks && Object.keys(socialLinks).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.spotify && (
                <Button
                  asChild
                  variant="outline"
                  className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                >
                  <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer">
                    <Music className="w-4 h-4 mr-2" />
                    Spotify
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              {socialLinks.instagram && (
                <Button
                  asChild
                  variant="outline"
                  className="bg-pink-500/10 border-pink-500/30 text-pink-400 hover:bg-pink-500/20"
                >
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              {socialLinks.youtube && (
                <Button
                  asChild
                  variant="outline"
                  className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

"use client"

import { motion } from "framer-motion"

interface HeroProps {
  name: string
  location?: string
  genres?: string[]
  image?: string
}

export default function Hero({ name, location, genres, image }: HeroProps) {
  return (
    <div className="relative h-96 overflow-hidden">
      {image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">{name}</h1>
          {location && <p className="text-xl text-slate-300">{location}</p>}
          {genres && genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {genres.map((genre, index) => (
                <motion.span
                  key={genre}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium border border-orange-500/30"
                >
                  {genre}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

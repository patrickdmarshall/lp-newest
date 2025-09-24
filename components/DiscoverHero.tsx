"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Search, Filter, Music, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface DiscoverHeroProps {
  title?: string
  subtitle?: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  onFilterChange?: (filters: string[]) => void
  showFilters?: boolean
}

export function DiscoverHero({
  title = "Discover Venues",
  subtitle = "Find the perfect stage for your next performance",
  searchPlaceholder = "Search venues...",
  onSearch,
  onFilterChange,
  showFilters = true,
}: DiscoverHeroProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const filterOptions = [
    "Rock",
    "Alternative",
    "Pop",
    "Hip-Hop",
    "Electronic",
    "Jazz",
    "Country",
    "Metal",
    "Indie",
    "Blues",
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter]

    setSelectedFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <div className="relative bg-gradient-to-br from-navy-dark via-navy to-black py-20 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 text-orange-400 opacity-30"
        >
          <Music size={40} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-32 text-blue-400 opacity-30"
        >
          <Users size={35} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 left-1/4 text-purple-400 opacity-30"
        >
          <Calendar size={30} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title.split(" ").map((word, index) => (
              <span key={index} className={index === 0 ? "text-gradient" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Filters */}
          {showFilters && (
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
              </Button>

              {showFilterMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {filterOptions.map((filter) => (
                      <Badge
                        key={filter}
                        variant={selectedFilters.includes(filter) ? "default" : "outline"}
                        className={`cursor-pointer transition-all rounded-full px-4 py-2 ${
                          selectedFilters.includes(filter)
                            ? "bg-orange-500 text-white border-orange-500"
                            : "border-white/30 text-white hover:bg-white/10"
                        }`}
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DiscoverHero

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Users, Star, Calendar, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface Venue {
  id: string
  name: string
  location: string
  capacity: string
  image: string
  rating: number
  genres: string[]
  upcomingShows: number
  description: string
}

const venues: Venue[] = [
  {
    id: "newport-music-hall",
    name: "Newport Music Hall",
    location: "Columbus, OH",
    capacity: "1,700",
    image: "/images/newport-music-hall-new.jpg",
    rating: 4.8,
    genres: ["Rock", "Alternative", "Metal"],
    upcomingShows: 12,
    description: "Historic venue in the heart of Columbus",
  },
  {
    id: "ar-music-bar",
    name: "A&R Music Bar",
    location: "Columbus, OH",
    capacity: "400",
    image: "/images/ar-music-bar-new.jpg",
    rating: 4.6,
    genres: ["Rock", "Punk", "Alternative"],
    upcomingShows: 8,
    description: "Intimate venue perfect for emerging artists",
  },
  {
    id: "the-basement",
    name: "The Basement",
    location: "Columbus, OH",
    capacity: "300",
    image: "/images/the-basement-new.jpg",
    rating: 4.7,
    genres: ["Indie", "Alternative", "Folk"],
    upcomingShows: 15,
    description: "Underground venue with authentic atmosphere",
  },
  {
    id: "kemba-live",
    name: "KEMBA Live!",
    location: "Columbus, OH",
    capacity: "5,500",
    image: "/images/kemba-live-new.jpg",
    rating: 4.9,
    genres: ["Pop", "Rock", "Hip-Hop"],
    upcomingShows: 6,
    description: "Premier outdoor amphitheater experience",
  },
]

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(venues)
  const [showFilters, setShowFilters] = useState(false)

  const allGenres = Array.from(new Set(venues.flatMap((venue) => venue.genres)))

  useEffect(() => {
    let filtered = venues

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by selected genres
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((venue) => venue.genres.some((genre) => selectedGenres.includes(genre)))
    }

    setFilteredVenues(filtered)
  }, [searchQuery, selectedGenres])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filters: string[]) => {
    setSelectedGenres(filters)
  }

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-black">
      {/* Hero Section */}
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
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Discover{" "}
              </span>
              Venues
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Find the perfect stage for your next performance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {selectedGenres.length > 0 && `(${selectedGenres.length})`}
              </Button>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {allGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={selectedGenres.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer transition-all rounded-full px-4 py-2 ${
                          selectedGenres.includes(genre)
                            ? "bg-orange-500 text-white border-orange-500"
                            : "border-white/30 text-white hover:bg-white/10"
                        }`}
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/venues/${venue.id}`}>
                <Card className="group bg-navy-light/50 backdrop-blur-sm border-white/10 hover:border-orange-500/50 transition-all duration-300 overflow-hidden rounded-2xl cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={venue.image || "/placeholder.svg"}
                      alt={venue.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500/90 text-white border-0 backdrop-blur-sm">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {venue.rating}
                      </Badge>
                    </div>

                    {/* Shows Badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-blue-500/90 text-white border-0 backdrop-blur-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {venue.upcomingShows} shows
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                          {venue.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{venue.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm">{venue.description}</p>

                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{venue.capacity} capacity</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {venue.genres.map((genre) => (
                          <Badge
                            key={genre}
                            variant="outline"
                            className="border-orange-400/30 text-orange-400 text-xs rounded-full"
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredVenues.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-400 text-lg">No venues found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedGenres([])
              }}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

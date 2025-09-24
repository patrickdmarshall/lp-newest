"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Music, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { VenueOpportunities } from "@/components/venue-opportunities"
import { useAuth } from "@/contexts/auth-context"

interface Venue {
  id: string
  name: string
  description: string
  location: string
  capacity: number | string
  image: string
  genres: string[]
  amenities: string[]
  opportunities?: any[]
}

interface VenueProfileLayoutProps {
  venue: Venue
  opportunities?: any[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export function VenueProfileLayout({ venue, opportunities = [] }: VenueProfileLayoutProps) {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="aspect-[21/9] relative">
          <Image src={venue.image || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <motion.div variants={fadeInUp} className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-orange text-navy hover:bg-orange font-semibold">
                  <Star className="w-4 h-4 mr-1" />
                  Featured Venue
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">{venue.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange" />
                  <span className="text-lg">{venue.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange" />
                  <span className="text-lg">Capacity: {venue.capacity}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Description Section - Below Image */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="bg-navy-light border-navy">
          <CardHeader>
            <CardTitle className="text-white text-xl">About {venue.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">{venue.description}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Venue Details */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-8">
        {/* Genres */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-navy-light border-navy h-full">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Music className="h-5 w-5 text-orange" />
                Genres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {venue.genres.map((genre) => (
                  <Badge
                    key={genre}
                    className="bg-orange/20 text-orange border-orange/30 hover:bg-orange/30 text-sm py-1 px-3"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Amenities */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-navy-light border-navy h-full">
            <CardHeader>
              <CardTitle className="text-white text-xl">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {venue.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 bg-orange rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Opportunities Section - Only show if user is signed in */}
      {user && (
        <motion.div id="opportunities" variants={fadeInUp} initial="hidden" animate="visible" className="scroll-mt-24">
          <VenueOpportunities venueSlug={venue.id} />
        </motion.div>
      )}

      {/* Sign In Prompt for Non-Authenticated Users */}
      {!user && (
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="bg-navy-light border-navy">
            <CardHeader>
              <CardTitle className="text-white text-xl">Want to See Performance Opportunities?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Sign in to view current performance opportunities at {venue.name} and apply directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-orange hover:bg-orange/90 text-navy font-semibold flex-1">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-orange text-orange hover:bg-orange/10 bg-transparent flex-1"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

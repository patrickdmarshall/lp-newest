"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Music, ChevronLeft, ChevronRight } from "lucide-react"

const venues = [
  {
    id: "the-basement",
    name: "The Basement",
    location: "Columbus, OH",
    capacity: 300,
    image: "/images/the-basement-new.jpg",
    genres: ["Indie", "Alternative", "Folk"],
    description: "An intimate underground venue perfect for emerging artists.",
  },
  {
    id: "ar-music-bar",
    name: "A&R Music Bar",
    location: "Columbus, OH",
    capacity: 400,
    image: "/images/ar-music-bar-new.jpg",
    genres: ["Rock", "Pop", "R&B"],
    description: "Premier destination for live music and craft cocktails.",
  },
  {
    id: "newport-music-hall",
    name: "Newport Music Hall",
    location: "Columbus, OH",
    capacity: 1400,
    image: "/images/newport-music-hall-new.jpg",
    genres: ["Rock", "Metal", "Alternative"],
    description: "Historic venue with decades of musical heritage.",
  },
  {
    id: "kemba-live",
    name: "KEMBA Live!",
    location: "Columbus, OH",
    capacity: "2,100 Indoor / 4,500 Outdoor",
    image: "/images/kemba-live-new.jpg",
    genres: ["All Genres", "Festival"],
    description: "Premier indoor/outdoor amphitheater experience.",
  },
]

export function DiscoverVenues() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextVenue = () => {
    setCurrentIndex((prev) => (prev + 1) % venues.length)
  }

  const prevVenue = () => {
    setCurrentIndex((prev) => (prev - 1 + venues.length) % venues.length)
  }

  const currentVenue = venues[currentIndex]

  return (
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Discover Venues</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore Columbus's premier music venues and find the perfect stage for your sound
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-navy-light border-navy overflow-hidden">
            <div className="relative">
              <div className="relative h-80 md:h-96">
                <Image
                  src={currentVenue.image || "/placeholder.svg"}
                  alt={currentVenue.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevVenue}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous venue"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextVenue}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next venue"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Venue Info Overlay */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{currentVenue.name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-orange" />
                      <span>{currentVenue.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-orange" />
                      <span>{currentVenue.capacity} capacity</span>
                    </div>
                  </div>
                  <p className="text-gray-200 mb-4 max-w-md">{currentVenue.description}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Music className="h-5 w-5 text-orange" />
                      <span className="text-white font-semibold">Genres</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentVenue.genres.map((genre) => (
                        <Badge key={genre} className="bg-orange/20 text-orange border-none">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/venues/${currentVenue.id}`}>
                      <Button
                        variant="outline"
                        className="border-orange text-orange hover:bg-orange hover:text-navy bg-transparent"
                      >
                        Learn More
                      </Button>
                    </Link>
                    <Link href="/opportunities">
                      <Button className="bg-orange hover:bg-orange/90 text-navy">View Opportunities</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Venue Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {venues.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index === currentIndex ? "bg-orange" : "bg-gray-600"
                }`}
                aria-label={`Go to venue ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/venues">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-navy">
              Explore All Venues
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

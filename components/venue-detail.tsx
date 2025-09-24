"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star } from "lucide-react"
import Image from "next/image"

interface VenueDetailProps {
  name: string
  description: string
  address: string
  capacity: string
  amenities: string[]
  imageSrc: string
  slug: string
  genres?: string[]
  rating?: number
}

export function VenueDetail({
  name,
  description,
  address,
  capacity,
  amenities,
  imageSrc,
  slug,
  genres = [],
  rating = 4.5,
}: VenueDetailProps) {
  return (
    <>
      <MainNav />

      <main className="flex-1 pt-32">
        <div className="container px-4 md:px-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 md:items-end mb-8">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-navy-light overflow-hidden relative">
              <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-orange" />
                    <span className="text-gray-300">{address}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4 text-orange" />
                    <span className="text-gray-300">Capacity: {capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 text-orange fill-orange" />
                    <span className="text-gray-300">{rating}/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-navy-light rounded-xl overflow-hidden">
            <div className="flex border-b border-navy">
              <div className="px-6 py-3 text-white font-medium border-b-2 border-orange">Overview</div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">About {name}</h2>
                    <p className="text-gray-300">{description}</p>
                  </div>

                  {genres.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Preferred Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                          <Badge key={genre} className="bg-orange/20 text-orange border-none">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-orange mr-2"></div>
                          <span className="text-gray-300">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-navy rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-gray-400 text-sm">Address</h4>
                        <p className="text-white">{address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

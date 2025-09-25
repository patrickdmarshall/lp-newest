/** @jsxImportSource react */
"use client"

import React, { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Users, AlertCircle, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { SignInWall } from "@/components/sign-in-wall"
import DiscoverHero from "@/components/DiscoverHero"

const allOpportunities = [
  {
    id: "hunter-metts",
    title: "Hunter Metts",
    venue: "A&R Music Bar",
    venueSlug: "ar-music-bar",
    image: "/images/ar-music-bar-new.jpg",
    location: "Columbus, OH",
    date: "November 2, 2025",
    time: "6:00 PM",
    type: "Supporting",
    genre: ["Folk"],
    setLength: "30 min",
    description:
      "Singer-songwriter / producer from Franklin, TN. He cites artists like Bon Iver, Fleet Foxes and Novo Amor as influences.",
    urgent: false,
    featured: false,
    applicationDeadline: "September 28, 2025",
    status: "open",
  },
  {
    id: "marlon-funaki",
    title: "Marlon Funaki",
    venue: "A&R Music Bar",
    venueSlug: "ar-music-bar",
    image: "/images/ar-music-bar-new.jpg",
    location: "Columbus, OH",
    date: "September 4, 2025",
    time: "7:00 PM",
    type: "Supporting",
    genre: ["Alternative", "Indie"],
    setLength: "30 min",
    description:
      'Listen to his song "Red Hearts" and you\'ll become a fan of this young talent! Looking for support that matches sonically.',
    urgent: true,
    featured: true,
    applicationDeadline: "August 7, 2025",
    status: "open",
  },
  {
    id: "hayden-coffman",
    title: "Hayden Coffman",
    venue: "A&R Music Bar",
    venueSlug: "ar-music-bar",
    image: "/images/ar-music-bar-new.jpg",
    location: "Columbus, OH",
    date: "August 29, 2025",
    time: "8:00 PM",
    type: "Supporting",
    genre: ["Country"],
    setLength: "30 min",
    description:
      "A rising star in the world of country music that infuses his own unique flair and authenticity into every song he creates.",
    urgent: true,
    featured: true,
    applicationDeadline: "August 1, 2025",
    status: "open",
  },
  {
    id: "headliner-ar-music-bar",
    title: "Headliner Opportunity – A&R Music Bar",
    venue: "A&R Music Bar",
    venueSlug: "ar-music-bar",
    image: "/images/ar-music-bar-new.jpg",
    location: "Columbus, OH",
    date: "September 19, 2025",
    time: "7:00 PM",
    type: "Headliner",
    genre: ["All Genres"],
    setLength: "60 min",
    description: "Looking for acts of any genre looking to promote their music or art.",
    urgent: false,
    featured: false,
    applicationDeadline: "July 25, 2025",
    status: "open",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function OpportunitiesClientPage() {
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredOpportunities = allOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenre = selectedGenre === "All" || opportunity.genre.includes(selectedGenre)
    const matchesType = selectedType === "All" || opportunity.type === selectedType

    return matchesSearch && matchesGenre && matchesType && opportunity.status === "open"
  })

  const genres = ["All", ...Array.from(new Set(allOpportunities.flatMap((opp) => opp.genre)))];
  const types = ["All", "Supporting", "Headliner"];

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
          <p className="text-white">Loading opportunities...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <SignInWall />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />
      
      <div className="bg-navy pt-24">
        <DiscoverHero
          title="Performance Opportunities"
          subtitle="Discover live music opportunities at Columbus's premier venues. Apply for gigs, find supporting slots, and advance your music career."
          searchPlaceholder="Search opportunities..."
          className="fixed-hero-bg"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base bg-navy/50 border-navy-dark text-white placeholder-gray-400 rounded-full backdrop-blur-sm focus:border-orange focus:ring-orange/20 transition-all duration-300 w-full"
                />
              </div>
            </div>
          </div>
        </DiscoverHero>

        <div className="container px-4 md:px-6 py-12">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>

          {/* Filters */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center">
            <div className="flex gap-2">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-2 bg-navy-light border border-navy-dark text-white rounded-md"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-navy-light border border-navy-dark text-white rounded-md"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-navy-light border-gray-700 overflow-hidden hover:border-orange transition-colors group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={opportunity.image || "/images/venue-placeholder.jpg"}
                      alt={opportunity.venue}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {opportunity.urgent && (
                        <Badge className="bg-red-500 text-white animate-pulse">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                      {opportunity.featured && (
                        <Badge className="bg-orange text-navy">
                          <span className="font-semibold">Featured</span>
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={opportunity.type === "Headliner" ? "bg-orange text-navy" : "bg-blue-500 text-white"}
                      >
                        {opportunity.type}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold text-lg mb-2">{opportunity.title}</h3>
                    <p className="text-orange font-medium mb-4">{opportunity.venue}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange" />
                        <span>{opportunity.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange" />
                        <span>{opportunity.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange" />
                        <span>{opportunity.setLength}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.genre.map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs border-orange/30 text-orange">
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{opportunity.description}</p>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 border-orange text-orange hover:bg-orange hover:text-navy bg-transparent"
                      >
                        <Link href={`/opportunities/${opportunity.id}`}>Details</Link>
                      </Button>
                      <Button asChild size="sm" className="flex-1 bg-orange hover:bg-orange/90 text-navy">
                        <Link href={`/opportunities/${opportunity.id}/apply`}>Apply</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No opportunities found</h3>
              <p className="text-gray-400">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </div>
          )}
          </motion.div>
        </div>
        </div>
        
        <Footer />
      </div>
    </div>
  )
}

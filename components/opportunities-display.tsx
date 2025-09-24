"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Music, Search, Filter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Opportunity {
  id: string
  title: string
  venue_name: string
  venue_slug: string
  event_date: string
  event_time: string
  location: string
  type: string
  genre: string
  description: string
  application_deadline: string
  status: string
}

export function OpportunitiesDisplay() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data for now - replace with actual API call
  const mockOpportunities: Opportunity[] = [
    {
      id: "2",
      title: "Supporting Act Opportunity",
      venue_name: "A&R Music Bar",
      venue_slug: "ar-music-bar",
      event_date: "2025-10-15",
      event_time: "20:00",
      location: "Columbus, OH",
      type: "Supporting",
      genre: "Rock",
      description: "Looking for a supporting act for our monthly rock showcase.",
      application_deadline: "2025-09-30",
      status: "open",
    },
    {
      id: "3",
      title: "Open Mic Night",
      venue_name: "The Basement",
      venue_slug: "the-basement",
      event_date: "2025-09-28",
      event_time: "19:00",
      location: "Columbus, OH",
      type: "Open Mic",
      genre: "All Genres",
      description: "Weekly open mic night for all genres and skill levels.",
      application_deadline: "2025-09-25",
      status: "open",
    },
    {
      id: "4",
      title: "Electronic Music Night",
      venue_name: "KEMBA Live!",
      venue_slug: "kemba-live",
      event_date: "2025-11-20",
      event_time: "21:00",
      location: "Columbus, OH",
      type: "Headliner",
      genre: "Electronic",
      description: "Special electronic music event featuring local and touring acts.",
      application_deadline: "2025-10-15",
      status: "open",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOpportunities(mockOpportunities)
      setFilteredOpportunities(mockOpportunities)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = opportunities

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.venue_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.genre.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by genre
    if (genreFilter !== "all") {
      filtered = filtered.filter((opp) => opp.genre.toLowerCase() === genreFilter.toLowerCase())
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((opp) => opp.type.toLowerCase() === typeFilter.toLowerCase())
    }

    setFilteredOpportunities(filtered)
  }, [opportunities, searchTerm, genreFilter, typeFilter])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "headliner":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "supporting":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "open mic":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="h-10 bg-navy-light rounded-lg animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-navy-light rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-navy-light rounded-lg animate-pulse" />
          </div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-navy-light rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-navy-light border-navy text-white placeholder-gray-400"
          />
        </div>
        <div className="flex gap-2">
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="w-32 bg-navy-light border-navy text-white">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-navy-light border-navy">
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="all genres">All Genres</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 bg-navy-light border-navy text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-navy-light border-navy">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="headliner">Headliner</SelectItem>
              <SelectItem value="supporting">Supporting</SelectItem>
              <SelectItem value="open mic">Open Mic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid gap-6">
        {filteredOpportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-navy-light border-navy hover:border-orange/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{opportunity.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-lg font-medium">
                      {opportunity.venue_name}
                    </CardDescription>
                  </div>
                  <Badge className={getTypeColor(opportunity.type)}>{opportunity.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-orange" />
                    <span className="text-sm">{formatDate(opportunity.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4 text-orange" />
                    <span className="text-sm">{formatTime(opportunity.event_time)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4 text-orange" />
                    <span className="text-sm">{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Music className="h-4 w-4 text-orange" />
                    <span className="text-sm">{opportunity.genre}</span>
                  </div>
                </div>

                <p className="text-gray-300">{opportunity.description}</p>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-400">Apply by: {formatDate(opportunity.application_deadline)}</div>
                  <div className="flex gap-2">
                    <Link href={`/opportunities/${opportunity.id}`}>
                      <Button
                        variant="outline"
                        className="border-orange text-orange hover:bg-orange hover:text-navy bg-transparent"
                      >
                        Details
                      </Button>
                    </Link>
                    <Link href={`/opportunities/${opportunity.id}/apply`}>
                      <Button className="bg-orange hover:bg-orange/90 text-navy">Apply</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No opportunities found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

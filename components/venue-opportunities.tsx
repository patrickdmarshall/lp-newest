"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, Star, Zap } from "lucide-react"
import Link from "next/link"

const opportunities = [
  {
    id: "hunter-metts",
    title: "Hunter Metts Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "November 2, 2025",
    time: "6:00 PM",
    type: "Supporting",
    genre: ["Folk"],
    setLength: "30 min",
    description:
      "Singer-songwriter / producer from Franklin, TN. He cites artists like Bon Iver, Fleet Foxes and Novo Amor as influences.",
    urgent: false,
    featured: true,
    applicationDeadline: "September 28, 2025",
  },
  {
    id: "marlon-funaki",
    title: "Marlon Funaki Support",
    venue: "A&R Music Bar",
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
  },
  {
    id: "hayden-coffman",
    title: "Hayden Coffman Support",
    venue: "A&R Music Bar",
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
  },
  {
    id: "headliner-ar-music-bar",
    title: "Headliner Opportunity – A&R Music Bar",
    venue: "A&R Music Bar",
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
  },
]

interface VenueOpportunitiesProps {
  venueSlug?: string
}

export function VenueOpportunities({ venueSlug }: VenueOpportunitiesProps) {
  // Filter opportunities by venue if venueSlug is provided
  const filteredOpportunities = venueSlug
    ? opportunities.filter((opp) => opp.venue.toLowerCase().replace(/\s+/g, "-").includes(venueSlug))
    : opportunities

  if (filteredOpportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No current opportunities available.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {filteredOpportunities.map((opportunity) => (
        <Card key={opportunity.id} className="bg-navy-light border-navy-dark hover:border-orange/30 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-white text-lg">{opportunity.venue}</CardTitle>
                  {opportunity.featured && (
                    <Badge className="bg-orange text-navy hover:bg-orange font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {opportunity.urgent && (
                    <Badge className="bg-red-500 text-white hover:bg-red-500 font-semibold animate-pulse">
                      <Zap className="w-3 h-3 mr-1" />
                      URGENT
                    </Badge>
                  )}
                </div>
                <h3 className="text-orange font-semibold">{opportunity.title}</h3>
              </div>
              <Badge
                variant={opportunity.type === "Headliner" ? "default" : "secondary"}
                className={`font-semibold ${
                  opportunity.type === "Headliner"
                    ? "bg-gradient-to-r from-orange to-amber-500 text-navy"
                    : "bg-blue-500 text-white"
                }`}
              >
                {opportunity.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 text-orange" />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-orange" />
                <span>{opportunity.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4 text-orange" />
                <span>{opportunity.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="h-4 w-4 text-orange" />
                <span>{opportunity.setLength}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {opportunity.genre.map((genre) => (
                <Badge key={genre} variant="outline" className="border-orange/30 text-orange text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300 text-sm line-clamp-2">{opportunity.description}</p>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-gray-400">
                Apply by: <span className="text-orange">{opportunity.applicationDeadline}</span>
              </div>
              <Link href={`/opportunities/${opportunity.id}`}>
                <Button size="sm" className="bg-orange hover:bg-orange/90 text-navy font-semibold">
                  Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

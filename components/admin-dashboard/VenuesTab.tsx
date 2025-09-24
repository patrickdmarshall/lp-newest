"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Building, MapPin, Users, Calendar, MoreHorizontal, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

interface Venue {
  id: string
  name: string
  city: string
  state: string
  capacity: number
  venue_type: string
  created_at: string
  profile_picture?: string
  bio?: string
}

export function VenuesTab() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadVenues()
  }, [])

  useEffect(() => {
    filterVenues()
  }, [venues, searchTerm])

  const loadVenues = async () => {
    try {
      const { data, error } = await supabase.from("venues").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setVenues(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load venues",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterVenues = () => {
    if (!searchTerm) {
      setFilteredVenues(venues)
      return
    }

    const filtered = venues.filter(
      (venue) =>
        venue.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.venue_type?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredVenues(filtered)
  }

  const getVenueTypeBadge = (type: string) => {
    const typeConfig = {
      "music-venue": { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Music Venue" },
      bar: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "Bar" },
      club: { color: "bg-pink-500/20 text-pink-400 border-pink-500/30", label: "Club" },
      restaurant: { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Restaurant" },
      other: { color: "bg-gray-500/20 text-gray-400 border-gray-500/30", label: "Other" },
    }

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.other
    return <Badge className={`${config.color} border`}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff6b35]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Venues</h2>
          <p className="text-gray-400">Manage venue profiles and information</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{filteredVenues.length} Venues</Badge>
      </div>

      {/* Search */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search venues by name, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#2a2f46] border-[#3a3f56] text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Venues List */}
      <div className="grid gap-4">
        {filteredVenues.length === 0 ? (
          <Card className="bg-[#1a1f36] border-[#2a2f46]">
            <CardContent className="p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Venues Found</h3>
              <p className="text-gray-400">
                {searchTerm ? "No venues match your search criteria." : "No venues have been registered yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredVenues.map((venue) => (
            <Card key={venue.id} className="bg-[#1a1f36] border-[#2a2f46]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={venue.profile_picture || "/images/venue-placeholder.jpg"} />
                      <AvatarFallback>
                        {venue.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "V"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{venue.name || "Unnamed Venue"}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {venue.city}, {venue.state}
                          </span>
                          {venue.capacity && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {venue.capacity} capacity
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {new Date(venue.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {venue.bio && <p className="text-sm text-gray-300 max-w-2xl">{venue.bio}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getVenueTypeBadge(venue.venue_type)}
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default VenuesTab

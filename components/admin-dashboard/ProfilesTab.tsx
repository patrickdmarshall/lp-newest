"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User, Mail, Calendar, MoreHorizontal } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Profile {
  id: string
  email: string
  name: string
  role: string
  created_at: string
  profile_picture?: string
  city?: string
  state?: string
  bio?: string
}

export function ProfilesTab() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    filterProfiles()
  }, [profiles, searchTerm, roleFilter])

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, name, role, created_at, profile_picture, city, state, bio")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching profiles:", error)
        setProfiles([])
      } else {
        setProfiles(data || [])
      }
    } catch (error) {
      console.error("Error fetching profiles:", error)
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const filterProfiles = () => {
    let filtered = profiles

    // Filter by role
    if (roleFilter !== "all") {
      filtered = filtered.filter((profile) => profile.role === roleFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.state?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProfiles(filtered)
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      artist: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Artist" },
      venue: { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "Venue" },
      admin: { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "Admin" },
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.artist
    return <Badge className={`${config.color} border`}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b35]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Profiles</h2>
          <p className="text-gray-400">Manage all user profiles</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          {filteredProfiles.length} Profiles
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search profiles by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#2a2f46] border-[#3a3f56] text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={roleFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter("all")}
                className={
                  roleFilter === "all"
                    ? "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                All
              </Button>
              <Button
                variant={roleFilter === "artist" ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter("artist")}
                className={
                  roleFilter === "artist"
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                Artists
              </Button>
              <Button
                variant={roleFilter === "venue" ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter("venue")}
                className={
                  roleFilter === "venue"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                Venues
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profiles List */}
      <div className="grid gap-4">
        {filteredProfiles.length === 0 ? (
          <Card className="bg-[#1a1f36] border-[#2a2f46]">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Profiles Found</h3>
              <p className="text-gray-400">
                {searchTerm || roleFilter !== "all"
                  ? "No profiles match your search criteria."
                  : "No profiles have been created yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProfiles.map((profile) => (
            <Card key={profile.id} className="bg-[#1a1f36] border-[#2a2f46]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.profile_picture || "/placeholder.svg"} />
                      <AvatarFallback>
                        {profile.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{profile.name || "Unnamed User"}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {profile.email}
                          </span>
                          {profile.city && profile.state && (
                            <span>
                              {profile.city}, {profile.state}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Joined {new Date(profile.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {profile.bio && <p className="text-sm text-gray-300 max-w-2xl">{profile.bio}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getRoleBadge(profile.role)}
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

export default ProfilesTab

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Music, Clock, CheckCircle, Star, Calendar, MapPin, Eye, User, Loader2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface ArtistStats {
  totalApplications: number
  pendingReview: number
  approved: number
  upcomingShows: number
}

interface Application {
  id: string
  status: "pending" | "approved" | "declined"
  applied_at: string
  opportunity: {
    id: string
    title: string
    event_date: string
    venues: {
      venue_name: string
    }
  }
}

interface SuggestedOpportunity {
  id: string
  title: string
  event_date: string
  event_time: string
  opportunity_type: string
  genres: string[]
  match_score: number
  venues: {
    venue_name: string
    city: string
    state: string
  }
}

export default function ArtistDashboard() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ArtistStats>({
    totalApplications: 0,
    pendingReview: 0,
    approved: 0,
    upcomingShows: 0,
  })
  const [applications, setApplications] = useState<Application[]>([])
  const [suggestedOpportunities, setSuggestedOpportunities] = useState<SuggestedOpportunity[]>([])

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/sign-in")
        return
      }
      if (profile?.role !== "artist") {
        router.push("/dashboard")
        return
      }
      loadDashboardData()
    }
  }, [user, profile, authLoading, router])

  const loadDashboardData = async () => {
    if (!user?.id) return

    try {
      // Load applications
      const { data: applicationsData, error: appsError } = await supabase
        .from("opportunity_applications")
        .select(`
          id,
          status,
          applied_at,
          opportunities (
            id,
            title,
            event_date,
            venues (
              venue_name
            )
          )
        `)
        .eq("artist_id", user.id)
        .order("applied_at", { ascending: false })

      if (appsError) throw appsError

      const formattedApplications =
        applicationsData?.map((app: any) => ({
          id: app.id,
          status: app.status,
          applied_at: app.applied_at,
          opportunity: {
            id: app.opportunities?.id || "",
            title: app.opportunities?.title || "Unknown Opportunity",
            event_date: app.opportunities?.event_date || "",
            venues: {
              venue_name: app.opportunities?.venues?.venue_name || "Unknown Venue",
            },
          },
        })) || []

      // Calculate stats
      const totalApplications = formattedApplications.length
      const pendingReview = formattedApplications.filter((app) => app.status === "pending").length
      const approved = formattedApplications.filter((app) => app.status === "approved").length
      const upcomingShows = approved // For now, approved = upcoming shows

      setStats({
        totalApplications,
        pendingReview,
        approved,
        upcomingShows,
      })

      setApplications(formattedApplications.slice(0, 5))

      // Load suggested opportunities based on genre matching
      if (profile?.genres && profile.genres.length > 0) {
        const appliedOpportunityIds = formattedApplications.map((app) => app.opportunity.id)

        const { data: opportunitiesData, error: oppsError } = await supabase
          .from("opportunities")
          .select(`
            id,
            title,
            event_date,
            event_time,
            opportunity_type,
            genres,
            venues (
              venue_name,
              city,
              state
            )
          `)
          .eq("status", "active")
          .gte("event_date", new Date().toISOString().split("T")[0])
          .not("id", "in", `(${appliedOpportunityIds.join(",") || "null"})`)
          .order("created_at", { ascending: false })
          .limit(10)

        if (!oppsError && opportunitiesData) {
          // Calculate match scores
          const scoredOpportunities = opportunitiesData
            .map((opp: any) => {
              const oppGenres = opp.genres || []
              const userGenres = profile.genres || []
              const matchCount = oppGenres.filter((genre: string) =>
                userGenres.some(
                  (userGenre: string) =>
                    userGenre.toLowerCase().includes(genre.toLowerCase()) ||
                    genre.toLowerCase().includes(userGenre.toLowerCase()),
                ),
              ).length
              const matchScore = oppGenres.length > 0 ? (matchCount / oppGenres.length) * 100 : 0

              return {
                id: opp.id,
                title: opp.title,
                event_date: opp.event_date,
                event_time: opp.event_time,
                opportunity_type: opp.opportunity_type,
                genres: opp.genres,
                match_score: matchScore,
                venues: {
                  venue_name: opp.venues?.venue_name || "Unknown Venue",
                  city: opp.venues?.city || "",
                  state: opp.venues?.state || "",
                },
              }
            })
            .filter((opp) => opp.match_score > 0)
            .sort((a, b) => b.match_score - a.match_score)
            .slice(0, 6)

          setSuggestedOpportunities(scoredOpportunities)
        }
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">⏳ Pending</Badge>
      case "approved":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✅ Approved</Badge>
      case "declined":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">❌ Declined</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">{status}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        </div>
      </div>
    )
  }

  if (!user || profile?.role !== "artist") return null

  const displayName = profile?.name || user?.email?.split("@")[0] || "Artist"

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-orange-500/20">
              <AvatarImage src={profile?.profile_picture || "/placeholder.svg"} alt={displayName} />
              <AvatarFallback className="bg-orange-500/20 text-orange-300 text-lg font-semibold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {displayName}!</h1>
              <p className="text-slate-400">Here's your performance dashboard</p>
            </div>
          </div>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">🎤 Artist</Badge>
        </motion.div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Applications</p>
                    <p className="text-3xl font-bold text-white">{stats.totalApplications}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Music className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Pending Review</p>
                    <p className="text-3xl font-bold text-white">{stats.pendingReview}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Approved</p>
                    <p className="text-3xl font-bold text-white">{stats.approved}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Upcoming Shows</p>
                    <p className="text-3xl font-bold text-white">{stats.upcomingShows}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Applied Gigs Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">🎵 Applied Gigs</CardTitle>
                <Link href="/dashboard/applications">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-500/30 text-orange-300 hover:bg-orange-500/10 bg-transparent"
                  >
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Music className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Applications Yet</h3>
                    <p className="text-slate-400 mb-4">Start applying to opportunities to see them here.</p>
                    <Link href="/opportunities">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Opportunities</Button>
                    </Link>
                  </div>
                ) : (
                  applications.map((application, index) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div>
                        <h4 className="text-white font-medium">{application.opportunity.title}</h4>
                        <p className="text-slate-400 text-sm">{application.opportunity.venues.venue_name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Applied {new Date(application.applied_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">{getStatusBadge(application.status)}</div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Suggested Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">🎯 Suggested for You</CardTitle>
                <Link href="/opportunities">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-500/30 text-orange-300 hover:bg-orange-500/10 bg-transparent"
                  >
                    Browse All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedOpportunities.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Matches Found</h3>
                    <p className="text-slate-400 mb-4">
                      Update your profile genres to get personalized recommendations.
                    </p>
                    <Link href="/dashboard/profile">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Profile</Button>
                    </Link>
                  </div>
                ) : (
                  suggestedOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">{opportunity.title}</h4>
                          <p className="text-orange-400 text-sm">{opportunity.venues.venue_name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {opportunity.venues.city}, {opportunity.venues.state}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          {Math.round(opportunity.match_score)}% match
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-400">
                          {new Date(opportunity.event_date).toLocaleDateString()} • {opportunity.event_time}
                        </div>
                        <Link href={`/opportunities/${opportunity.id}`}>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                            Apply Now
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/opportunities">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg">
                    <Eye className="mr-2 h-5 w-5" />
                    Browse Opportunities
                  </Button>
                </Link>
                <Link href="/dashboard/profile">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent font-semibold py-6 text-lg"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Update Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

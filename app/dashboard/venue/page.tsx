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
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Building2,
  Plus,
  Music,
  Mail,
  Phone,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

interface VenueStats {
  totalOpportunities: number
  totalApplicants: number
  pendingReview: number
  confirmedShows: number
}

interface Application {
  id: string
  status: "pending" | "approved" | "declined"
  applied_at: string
  message?: string
  profiles: {
    id: string
    name: string
    email: string
    phone?: string
    profile_picture?: string
    genres?: string[]
    bio?: string
  }
  opportunities: {
    id: string
    title: string
    event_date: string
  }
}

interface VenueOpportunity {
  id: string
  title: string
  event_date: string
  event_time: string
  status: string
  opportunity_type: string
  created_at: string
  application_count: number
  is_valid: boolean
}

export default function VenueDashboard() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<VenueStats>({
    totalOpportunities: 0,
    totalApplicants: 0,
    pendingReview: 0,
    confirmedShows: 0,
  })
  const [applications, setApplications] = useState<Application[]>([])
  const [opportunities, setOpportunities] = useState<VenueOpportunity[]>([])

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/sign-in")
        return
      }
      if (profile?.role !== "venue") {
        router.push("/dashboard")
        return
      }
      loadDashboardData()
    }
  }, [user, profile, authLoading, router])

  const loadDashboardData = async () => {
    if (!user?.id) return

    try {
      // Load venue's opportunities
      const { data: opportunitiesData, error: oppsError } = await supabase
        .from("opportunities")
        .select(`
          id,
          title,
          event_date,
          event_time,
          status,
          opportunity_type,
          created_at
        `)
        .eq("created_by_profile_id", user.id)
        .order("created_at", { ascending: false })

      if (oppsError) throw oppsError

      // Get application counts for each opportunity
      const opportunityIds = opportunitiesData?.map((opp) => opp.id) || []
      const { data: applicationCounts } = await supabase
        .from("opportunity_applications")
        .select("opportunity_id")
        .in("opportunity_id", opportunityIds)

      // Format opportunities with application counts and 90-day validation
      const now = new Date()
      const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

      const formattedOpportunities =
        opportunitiesData?.map((opp) => {
          const eventDate = new Date(opp.event_date)
          const isValid = eventDate >= now && eventDate <= ninetyDaysFromNow
          const appCount = applicationCounts?.filter((app) => app.opportunity_id === opp.id).length || 0

          return {
            id: opp.id,
            title: opp.title,
            event_date: opp.event_date,
            event_time: opp.event_time,
            status: opp.status,
            opportunity_type: opp.opportunity_type,
            created_at: opp.created_at,
            application_count: appCount,
            is_valid: isValid,
          }
        }) || []

      // Load applications to venue's opportunities
      const { data: applicationsData, error: appsError } = await supabase
        .from("opportunity_applications")
        .select(`
          id,
          status,
          applied_at,
          message,
          profiles (
            id,
            name,
            email,
            phone,
            profile_picture,
            genres,
            bio
          ),
          opportunities (
            id,
            title,
            event_date
          )
        `)
        .in("opportunity_id", opportunityIds)
        .order("applied_at", { ascending: false })

      if (appsError) throw appsError

      // Calculate stats
      const totalOpportunities = formattedOpportunities.length
      const totalApplicants = applicationsData?.length || 0
      const pendingReview = applicationsData?.filter((app) => app.status === "pending").length || 0
      const confirmedShows = applicationsData?.filter((app) => app.status === "approved").length || 0

      setStats({
        totalOpportunities,
        totalApplicants,
        pendingReview,
        confirmedShows,
      })

      setApplications(applicationsData?.slice(0, 6) || [])
      setOpportunities(formattedOpportunities.slice(0, 6))
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

  const handleApplicationAction = async (applicationId: string, action: "approved" | "declined") => {
    try {
      const { error } = await supabase
        .from("opportunity_applications")
        .update({ status: action })
        .eq("id", applicationId)

      if (error) throw error

      // Update local state
      setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: action } : app)))

      // Update stats
      setStats((prev) => ({
        ...prev,
        pendingReview: prev.pendingReview - 1,
        confirmedShows: action === "approved" ? prev.confirmedShows + 1 : prev.confirmedShows,
      }))

      toast({
        title: "Success",
        description: `Application ${action} successfully`,
      })
    } catch (error) {
      console.error("Error updating application:", error)
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      })
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

  if (!user || profile?.role !== "venue") return null

  const displayName = profile?.name || user?.email?.split("@")[0] || "Venue"

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
              <p className="text-slate-400">Manage your venue and bookings</p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">🏢 Venue</Badge>
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
                    <p className="text-sm text-slate-400 mb-1">Total Opportunities</p>
                    <p className="text-3xl font-bold text-white">{stats.totalOpportunities}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-400" />
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
                    <p className="text-sm text-slate-400 mb-1">Total Applicants</p>
                    <p className="text-3xl font-bold text-white">{stats.totalApplicants}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-400" />
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
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Confirmed Shows</p>
                    <p className="text-3xl font-bold text-white">{stats.confirmedShows}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Applications to Review */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">👥 Applications to Review</CardTitle>
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
                {applications.filter((app) => app.status === "pending").length === 0 ? (
                  <div className="text-center py-8">
                    <Music className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Pending Applications</h3>
                    <p className="text-slate-400">Applications will appear here when artists apply.</p>
                  </div>
                ) : (
                  applications
                    .filter((app) => app.status === "pending")
                    .map((application, index) => (
                      <motion.div
                        key={application.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 bg-slate-700/30 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={application.profiles.profile_picture || "/placeholder.svg"} />
                              <AvatarFallback className="bg-orange-500/20 text-orange-300 text-sm">
                                {getInitials(application.profiles.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-white font-medium">{application.profiles.name}</h4>
                              <p className="text-slate-400 text-sm">{application.opportunities.title}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {application.profiles.email}
                                </span>
                                {application.profiles.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {application.profiles.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {application.profiles.genres && application.profiles.genres.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {application.profiles.genres.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs border-slate-600 text-slate-400">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {application.message && (
                          <div className="mb-3">
                            <p className="text-slate-300 text-sm bg-slate-800/50 p-2 rounded">
                              "{application.message}"
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApplicationAction(application.id, "declined")}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10 bg-transparent text-xs"
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApplicationAction(application.id, "approved")}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs"
                          >
                            Approve
                          </Button>
                        </div>
                      </motion.div>
                    ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">🎯 Your Opportunities</CardTitle>
                <Link href="/venue/opportunities/new">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunities.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No Opportunities Yet</h3>
                    <p className="text-slate-400 mb-4">
                      Create your first opportunity to start receiving applications.
                    </p>
                    <Link href="/venue/opportunities/new">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Opportunity
                      </Button>
                    </Link>
                  </div>
                ) : (
                  opportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">{opportunity.title}</h4>
                          <p className="text-slate-400 text-sm">
                            {new Date(opportunity.event_date).toLocaleDateString()} • {opportunity.event_time}
                          </p>
                          <p className="text-xs text-slate-500">
                            {opportunity.application_count} applicant{opportunity.application_count !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            className={`${
                              opportunity.opportunity_type === "Headliner"
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            } text-xs`}
                          >
                            {opportunity.opportunity_type === "Headliner" ? "🎤" : "🎵"} {opportunity.opportunity_type}
                          </Badge>
                          {!opportunity.is_valid && (
                            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Invalid Date
                            </Badge>
                          )}
                        </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/venue/opportunities/new">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Create Opportunity
                  </Button>
                </Link>
                <Link href="/dashboard/applications">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent font-semibold py-6 text-lg"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    View All Applications
                  </Button>
                </Link>
                <Link href="/dashboard/venue-profile">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent font-semibold py-6 text-lg"
                  >
                    <Building2 className="mr-2 h-5 w-5" />
                    Venue Settings
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

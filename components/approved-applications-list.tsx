"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, FileText, CheckCircle, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

interface Application {
  id: string
  artist_name: string
  email: string
  status: string
  deal_memo_url: string | null
  applied_at: string
  opportunity: {
    id: string
    title: string
    venue_name: string
    event_date: string
    event_time?: string
  }
}

export function ApprovedApplicationsList() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id) return

      const { data, error } = await supabase
        .from("opportunity_applications")
        .select(`
          id,
          artist_name,
          email,
          status,
          deal_memo_url,
          applied_at,
          opportunity:opportunities (
            id,
            title,
            venue_name,
            event_date,
            event_time
          )
        `)
        .eq("artist_id", user.id)
        .in("status", ["approved", "pending"])
        .order("applied_at", { ascending: false })

      if (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to fetch applications",
          variant: "destructive",
        })
      } else {
        setApplications(data || [])
      }
      setLoading(false)
    }

    fetchApplications()
  }, [user?.id])

  const handleConfirmParticipation = async (applicationId: string, opportunityId: string) => {
    setConfirming(applicationId)

    try {
      // Update application status to confirmed
      const { error: appError } = await supabase
        .from("opportunity_applications")
        .update({ status: "confirmed" })
        .eq("id", applicationId)

      if (appError) throw appError

      // Update opportunity status to booked
      const { error: oppError } = await supabase
        .from("opportunities")
        .update({ status: "booked" })
        .eq("id", opportunityId)

      if (oppError) throw oppError

      // Remove from local state
      setApplications((prev) => prev.filter((app) => app.id !== applicationId))

      toast({
        title: "Confirmed!",
        description: "You've successfully confirmed your participation. The show is now booked!",
      })
    } catch (error) {
      console.error("Error confirming participation:", error)
      toast({
        title: "Error",
        description: "Failed to confirm participation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConfirming(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  if (loading) {
    return <div className="text-white">Loading applications...</div>
  }

  if (applications.length === 0) {
    return (
      <Card className="bg-navy-light border-navy">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No pending or approved applications</p>
        </CardContent>
      </Card>
    )
  }

  // Separate approved and pending applications
  const approvedApplications = applications.filter((app) => app.status === "approved")
  const pendingApplications = applications.filter((app) => app.status === "pending")

  return (
    <div className="space-y-6">
      {/* Approved Applications */}
      {approvedApplications.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Approved Applications</h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{approvedApplications.length}</Badge>
          </div>
          {approvedApplications.map((application) => (
            <Card key={application.id} className="bg-navy-light border-navy">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{application.opportunity.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {application.opportunity.venue_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(application.opportunity.event_date)}
                        {application.opportunity.event_time && ` at ${application.opportunity.event_time}`}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex-1">
                    {application.deal_memo_url && (
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                        <FileText className="h-4 w-4 text-orange" />
                        <a
                          href={application.deal_memo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange hover:text-orange/80 underline"
                        >
                          View Deal Memo
                        </a>
                      </div>
                    )}
                    <p className="text-gray-400 text-sm">
                      Please review your deal memo and confirm your participation to secure this booking.
                    </p>
                  </div>
                  <Button
                    onClick={() => handleConfirmParticipation(application.id, application.opportunity.id)}
                    disabled={confirming === application.id}
                    className="bg-orange hover:bg-orange/90 text-navy font-semibold"
                  >
                    {confirming === application.id ? "Confirming..." : "Confirm I'm In"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pending Applications */}
      {pendingApplications.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Pending Applications</h3>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              {pendingApplications.length}
            </Badge>
          </div>
          {pendingApplications.map((application) => (
            <Card key={application.id} className="bg-navy-light border-navy">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{application.opportunity.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {application.opportunity.venue_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(application.opportunity.event_date)}
                        {application.opportunity.event_time && ` at ${application.opportunity.event_time}`}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Your application is being reviewed. You'll be notified once a decision is made.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Applied on {new Date(application.applied_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

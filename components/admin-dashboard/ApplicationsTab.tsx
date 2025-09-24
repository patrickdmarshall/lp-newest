"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, User, Mail, Phone, Search, Filter, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

interface Application {
  id: string
  artist_name: string
  artist_id: string
  email: string
  phone?: string
  status: "pending" | "approved" | "declined"
  applied_at: string
  message?: string
  opportunity: {
    id: string
    title: string
    venue_name: string
    event_date: string
  }
}

export function ApplicationsTab() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    loadApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const loadApplications = async () => {
    try {
      const { data, error } = await supabase
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
            phone
          ),
          opportunities (
            id,
            title,
            venues (
              venue_name
            ),
            event_date
          )
        `)
        .order("applied_at", { ascending: false })

      if (error) throw error

      const formattedApplications =
        data?.map((app: any) => ({
          id: app.id,
          artist_name: app.profiles?.name || "Unknown Artist",
          artist_id: app.profiles?.id || "",
          email: app.profiles?.email || "",
          phone: app.profiles?.phone || "",
          status: app.status,
          applied_at: app.applied_at,
          message: app.message,
          opportunity: {
            id: app.opportunities?.id || "",
            title: app.opportunities?.title || "Unknown Opportunity",
            venue_name: app.opportunities?.venues?.venue_name || "Unknown Venue",
            event_date: app.opportunities?.event_date || "",
          },
        })) || []

      setApplications(formattedApplications)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.artist_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.opportunity.venue_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
  }

  const handleStatusUpdate = async (applicationId: string, newStatus: "pending" | "approved" | "declined") => {
    setUpdatingStatus(applicationId)

    try {
      const { error } = await supabase
        .from("opportunity_applications")
        .update({ status: newStatus })
        .eq("id", applicationId)

      if (error) throw error

      setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))

      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      })
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "declined":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return applications.length
    return applications.filter((app) => app.status === status).length
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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Opportunity Applications</h2>
          <p className="text-gray-400">Review and manage artist applications for opportunities</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#2a2f46] border-[#3a3f56] text-white w-full sm:w-64"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
              <SelectItem value="all">All ({getStatusCount("all")})</SelectItem>
              <SelectItem value="pending">Pending ({getStatusCount("pending")})</SelectItem>
              <SelectItem value="approved">Approved ({getStatusCount("approved")})</SelectItem>
              <SelectItem value="declined">Declined ({getStatusCount("declined")})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{getStatusCount("pending")}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-400">{getStatusCount("approved")}</p>
              </div>
              <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Declined</p>
                <p className="text-2xl font-bold text-red-400">{getStatusCount("declined")}</p>
              </div>
              <div className="h-8 w-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card className="bg-[#1a1f36] border-[#2a2f46]">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No applications found</h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Applications will appear here as artists apply for opportunities"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((application) => (
            <Card key={application.id} className="bg-[#1a1f36] border-[#2a2f46]">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">{application.artist_name}</CardTitle>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{application.email}</span>
                      </div>
                      {application.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{application.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(application.status)} border`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Opportunity Details */}
                  <div className="bg-[#2a2f46] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Applied For:</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{application.opportunity.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{application.opportunity.venue_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(application.opportunity.event_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Application Message */}
                  {application.message && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Artist Message:</h4>
                      <p className="text-gray-300 text-sm bg-[#2a2f46] p-3 rounded-lg">{application.message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Select
                      value={application.status}
                      onValueChange={(value: "pending" | "approved" | "declined") =>
                        handleStatusUpdate(application.id, value)
                      }
                      disabled={updatingStatus === application.id}
                    >
                      <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approve</SelectItem>
                        <SelectItem value="declined">Decline</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2 flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] flex-1 sm:flex-none bg-transparent"
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] flex-1 sm:flex-none bg-transparent"
                      >
                        Contact Artist
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 pt-2 border-t border-[#2a2f46]">
                    Applied: {new Date(application.applied_at).toLocaleString()}
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

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, User, DollarSign, Search, Filter, FileText, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

interface BookedShow {
  id: string
  title: string
  artist_name: string
  venue_name: string
  event_date: string
  event_time: string
  status: "confirmed" | "pending_contract" | "completed" | "cancelled"
  compensation: number
  deal_memo_id?: string
  created_at: string
}

export function BookedShowsTab() {
  const [shows, setShows] = useState<BookedShow[]>([])
  const [filteredShows, setFilteredShows] = useState<BookedShow[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookedShows()
  }, [])

  useEffect(() => {
    let filtered = shows

    if (searchTerm) {
      filtered = filtered.filter(
        (show) =>
          show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          show.artist_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          show.venue_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((show) => show.status === statusFilter)
    }

    setFilteredShows(filtered)
  }, [shows, searchTerm, statusFilter])

  const fetchBookedShows = async () => {
    try {
      const { data, error } = await supabase
        .from("opportunity_applications")
        .select(`
          id,
          status,
          created_at,
          compensation,
          deal_memo_id,
          opportunities (
            title,
            event_date,
            event_time,
            venues (
              venue_name
            )
          ),
          profiles (
            name
          )
        `)
        .in("status", ["approved", "confirmed", "completed"])
        .order("created_at", { ascending: false })

      if (error) throw error

      const formattedShows =
        data?.map((show: any) => ({
          id: show.id,
          title: show.opportunities?.title || "Unknown Show",
          artist_name: show.profiles?.name || "Unknown Artist",
          venue_name: show.opportunities?.venues?.venue_name || "Unknown Venue",
          event_date: show.opportunities?.event_date || "",
          event_time: show.opportunities?.event_time || "",
          status: show.status === "approved" ? "confirmed" : show.status,
          compensation: show.compensation || 0,
          deal_memo_id: show.deal_memo_id,
          created_at: show.created_at,
        })) || []

      setShows(formattedShows)
      setFilteredShows(formattedShows)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load booked shows",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending_contract":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending_contract":
        return "Pending Contract"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return shows.length
    return shows.filter((show) => show.status === status).length
  }

  const totalCompensation = shows.reduce((sum, show) => sum + show.compensation, 0)

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
          <h2 className="text-2xl font-bold text-white">Booked Shows</h2>
          <p className="text-gray-400">Manage confirmed bookings and contracts</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search shows..."
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
              <SelectItem value="confirmed">Confirmed ({getStatusCount("confirmed")})</SelectItem>
              <SelectItem value="pending_contract">Pending Contract ({getStatusCount("pending_contract")})</SelectItem>
              <SelectItem value="completed">Completed ({getStatusCount("completed")})</SelectItem>
              <SelectItem value="cancelled">Cancelled ({getStatusCount("cancelled")})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Shows</p>
                <p className="text-2xl font-bold text-white">{shows.length}</p>
              </div>
              <div className="h-8 w-8 bg-[#ff6b35]/20 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-[#ff6b35]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold text-green-400">{getStatusCount("confirmed")}</p>
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
                <p className="text-sm text-gray-400">Pending Contract</p>
                <p className="text-2xl font-bold text-yellow-400">{getStatusCount("pending_contract")}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Compensation</p>
                <p className="text-2xl font-bold text-[#ff6b35]">${totalCompensation.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-[#ff6b35]/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-[#ff6b35]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shows List */}
      <div className="space-y-4">
        {filteredShows.length === 0 ? (
          <Card className="bg-[#1a1f36] border-[#2a2f46]">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No shows found</h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Booked shows will appear here as applications are approved"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredShows.map((show) => (
            <Card key={show.id} className="bg-[#1a1f36] border-[#2a2f46]">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">{show.title}</CardTitle>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{show.artist_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{show.venue_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(show.event_date).toLocaleDateString()} at {show.event_time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${getStatusColor(show.status)} border`}>{getStatusLabel(show.status)}</Badge>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Compensation</p>
                      <p className="text-lg font-semibold text-[#ff6b35]">${show.compensation}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {show.deal_memo_id ? (
                    <Button
                      className="bg-[#ff6b35] hover:bg-[#e55a2b] text-[#1a1f36] flex-1 sm:flex-none"
                      onClick={() => {
                        // Handle view memo action
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Memo
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] flex-1 sm:flex-none bg-transparent"
                      onClick={() => {
                        // Handle create memo action
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Create Memo
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] flex-1 sm:flex-none bg-transparent"
                  >
                    Edit Show
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] flex-1 sm:flex-none bg-transparent"
                  >
                    Contact Artist
                  </Button>
                </div>

                <div className="text-xs text-gray-500 pt-4 border-t border-[#2a2f46] mt-4">
                  Booked: {new Date(show.created_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

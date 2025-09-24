"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Edit, Trash2 } from "lucide-react"
import { OpportunityCreator } from "@/components/opportunity-creator"
import { fetchAdminDashboardData } from "@/app/admin-dashboard/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Opportunity {
  id: string
  title: string
  venue_name: string
  description: string
  event_date: string
  event_time?: string
  location?: string
  opportunity_type: string
  status: string
  genres?: string[]
  application_deadline?: string
  created_at: string
}

export function OpportunitiesTab() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOpportunities()
  }, [])

  const loadOpportunities = async () => {
    try {
      const data = await fetchAdminDashboardData()
      setOpportunities(data.opportunities)
    } catch (error) {
      console.error("Error loading opportunities:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpportunityCreated = () => {
    loadOpportunities()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "closed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Headliner":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Supporting":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Open Mic":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Opportunities</h2>
            <p className="text-gray-400">Manage performance opportunities</p>
          </div>
          <div className="h-10 w-32 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="bg-[#1a1f36] border-[#2a2f46]">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-600 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-500/10 border-blue-500/20">
        <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
        <AlertDescription className="text-blue-400 text-sm">
          <strong>Rollout Phase:</strong> Please allow time for stats to populate. Applied opportunities and scenarios
          may not reflect in live time during the rollout phase.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">Opportunities</h2>
          <p className="text-gray-400">Manage performance opportunities</p>
        </div>
        <OpportunityCreator userRole="admin" onOpportunityCreated={handleOpportunityCreated} />
      </div>

      {opportunities.length === 0 ? (
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No opportunities yet</h3>
            <p className="text-gray-400 mb-4">Create your first opportunity to get started</p>
            <OpportunityCreator userRole="admin" onOpportunityCreated={handleOpportunityCreated} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {opportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="bg-[#1a1f36] border-[#2a2f46] hover:border-[#3a3f56] transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-white text-lg">{opportunity.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {opportunity.venue_name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(opportunity.event_date)}
                      </div>
                      {opportunity.event_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {opportunity.event_time}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(opportunity.status)}>{opportunity.status}</Badge>
                    <Badge className={getTypeColor(opportunity.opportunity_type)}>{opportunity.opportunity_type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{opportunity.description}</p>

                {opportunity.genres && opportunity.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {opportunity.genres.map((genre) => (
                      <Badge key={genre} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Created {formatDate(opportunity.created_at)}
                    {opportunity.application_deadline && (
                      <span className="ml-4">Deadline: {formatDate(opportunity.application_deadline)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

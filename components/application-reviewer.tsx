"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, Eye, Music, Building, Calendar } from "lucide-react"
import { updateApplicationStatus, approveVenueRegistration } from "@/app/actions/application-actions"
import { toast } from "@/hooks/use-toast"

interface ShowApplication {
  id: string
  applicant_id: string
  opportunity_id: string
  status: "pending" | "approved" | "declined" | "waitlisted"
  applied_at: string
  cover_letter?: string
  profiles?: {
    name: string
    profile_picture?: string
    bio?: string
    genres?: string[]
  }
  opportunities?: {
    title: string
    event_date: string
    venue_name_manual?: string
  }
}

interface VenueRegistration {
  id: string
  venue_name: string
  email: string
  user_id: string
  status: "pending_approval" | "approved" | "declined"
  submitted_at: string
  city?: string
  state?: string
  contact_person?: string
  phone?: string
}

interface ApplicationReviewerProps {
  type: "show-applications" | "venue-registrations"
  applications: ShowApplication[] | VenueRegistration[]
  reviewerId: string
  onApplicationUpdate?: () => void
}

export function ApplicationReviewer({ type, applications, reviewerId, onApplicationUpdate }: ApplicationReviewerProps) {
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReviewAction = async (applicationId: string, action: "approved" | "declined") => {
    setIsSubmitting(true)
    try {
      let result
      if (type === "show-applications") {
        result = await updateApplicationStatus(applicationId, action, reviewerId)
      } else {
        // For venue registrations, we need a different action
        if (action === "approved") {
          result = await approveVenueRegistration(applicationId, reviewerId)
        } else {
          // Implement decline venue registration action
          result = { success: true, message: "Venue registration declined." }
        }
      }

      if (result.success) {
        toast({
          title: "Success",
          description: `Application ${action} successfully!`,
        })
        setIsReviewDialogOpen(false)
        setReviewNotes("")
        onApplicationUpdate?.()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update application",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating application:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-600"
      case "declined":
        return "bg-red-600"
      case "pending":
      case "pending_approval":
        return "bg-yellow-600"
      case "waitlisted":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "declined":
        return <XCircle className="h-4 w-4" />
      case "pending":
      case "pending_approval":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (applications.length === 0) {
    return (
      <Card className="bg-navy-light border-navy">
        <CardContent className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            {type === "show-applications" ? (
              <Music className="h-12 w-12 mx-auto" />
            ) : (
              <Building className="h-12 w-12 mx-auto" />
            )}
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No {type === "show-applications" ? "Show Applications" : "Venue Registrations"} Yet
          </h3>
          <p className="text-gray-300">
            {type === "show-applications"
              ? "When artists apply to your shows, they'll appear here for review."
              : "When venues apply to join the platform, they'll appear here for admin review."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => {
        const isShowApp = type === "show-applications"
        const showApp = isShowApp ? (application as ShowApplication) : null
        const venueReg = !isShowApp ? (application as VenueRegistration) : null

        return (
          <Card key={application.id} className="bg-navy-light border-navy hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {isShowApp && showApp?.profiles && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={showApp.profiles.profile_picture || "/placeholder.svg?width=48&height=48&query=avatar"}
                      />
                      <AvatarFallback className="bg-orange/20 text-orange">
                        {showApp.profiles.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {isShowApp
                          ? showApp?.profiles?.name || "Unknown Artist"
                          : venueReg?.venue_name || "Unknown Venue"}
                      </h3>
                      <Badge className={`${getStatusColor(application.status)} text-white`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace("_", " ")}</span>
                      </Badge>
                    </div>

                    {isShowApp && showApp ? (
                      <>
                        <p className="text-gray-300 mb-2">
                          Applied for: <span className="text-white font-medium">{showApp.opportunities?.title}</span>
                          {showApp.opportunities?.venue_name_manual && (
                            <span className="text-gray-400"> at {showApp.opportunities.venue_name_manual}</span>
                          )}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Event:{" "}
                            {showApp.opportunities?.event_date
                              ? new Date(showApp.opportunities.event_date).toLocaleDateString()
                              : "TBD"}
                          </span>
                          <span>Applied: {new Date(showApp.applied_at).toLocaleDateString()}</span>
                        </div>
                        {showApp.profiles?.genres && showApp.profiles.genres.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {showApp.profiles.genres.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </>
                    ) : venueReg ? (
                      <>
                        <p className="text-gray-300 mb-2">
                          Contact: <span className="text-white">{venueReg.email}</span>
                          {venueReg.contact_person && (
                            <span className="text-gray-400"> ({venueReg.contact_person})</span>
                          )}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>
                            Location:{" "}
                            {venueReg.city && venueReg.state ? `${venueReg.city}, ${venueReg.state}` : "Not specified"}
                          </span>
                          <span>Applied: {new Date(venueReg.submitted_at).toLocaleDateString()}</span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dialog
                    open={isReviewDialogOpen && selectedApplication?.id === application.id}
                    onOpenChange={setIsReviewDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{isShowApp ? "Review Show Application" : "Review Venue Registration"}</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        {isShowApp && showApp ? (
                          <>
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage
                                  src={
                                    showApp.profiles?.profile_picture ||
                                    "/placeholder.svg?width=64&height=64&query=avatar"
                                  }
                                />
                                <AvatarFallback className="bg-orange/20 text-orange text-xl">
                                  {showApp.profiles?.name?.charAt(0) || "A"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-semibold text-white">{showApp.profiles?.name}</h3>
                                <p className="text-gray-300">{showApp.opportunities?.title}</p>
                              </div>
                            </div>

                            {showApp.profiles?.bio && (
                              <div>
                                <Label className="text-white">Artist Bio</Label>
                                <p className="text-gray-300 mt-1">{showApp.profiles.bio}</p>
                              </div>
                            )}

                            {showApp.cover_letter && (
                              <div>
                                <Label className="text-white">Cover Letter</Label>
                                <p className="text-gray-300 mt-1 whitespace-pre-wrap">{showApp.cover_letter}</p>
                              </div>
                            )}
                          </>
                        ) : venueReg ? (
                          <>
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-2">{venueReg.venue_name}</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="text-gray-400">Contact Email</Label>
                                  <p className="text-white">{venueReg.email}</p>
                                </div>
                                {venueReg.contact_person && (
                                  <div>
                                    <Label className="text-gray-400">Contact Person</Label>
                                    <p className="text-white">{venueReg.contact_person}</p>
                                  </div>
                                )}
                                {venueReg.phone && (
                                  <div>
                                    <Label className="text-gray-400">Phone</Label>
                                    <p className="text-white">{venueReg.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <Label className="text-gray-400">Location</Label>
                                  <p className="text-white">
                                    {venueReg.city && venueReg.state
                                      ? `${venueReg.city}, ${venueReg.state}`
                                      : "Not specified"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}

                        {application.status === "pending" || application.status === "pending_approval" ? (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="reviewNotes" className="text-white">
                                Review Notes (Optional)
                              </Label>
                              <Textarea
                                id="reviewNotes"
                                value={reviewNotes}
                                onChange={(e) => setReviewNotes(e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white"
                                placeholder="Add any notes about your decision..."
                              />
                            </div>

                            <div className="flex justify-end gap-3">
                              <Button
                                onClick={() => handleReviewAction(application.id, "declined")}
                                disabled={isSubmitting}
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                {isSubmitting ? "Processing..." : "Decline"}
                              </Button>
                              <Button
                                onClick={() => handleReviewAction(application.id, "approved")}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {isSubmitting ? "Processing..." : "Approve"}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <Badge className={`${getStatusColor(application.status)} text-white text-lg px-4 py-2`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-2 capitalize">{application.status.replace("_", " ")}</span>
                            </Badge>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {(application.status === "pending" || application.status === "pending_approval") && (
                    <>
                      <Button
                        onClick={() => handleReviewAction(application.id, "approved")}
                        disabled={isSubmitting}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleReviewAction(application.id, "declined")}
                        disabled={isSubmitting}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

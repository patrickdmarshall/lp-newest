"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Music } from "lucide-react"

interface ArtistApplication {
  id: string
  artistName: string
  email: string
  opportunityTitle: string
  venue: string
  eventDate: string
  status: string
  appliedDate: string
  genre: string
}

interface ArtistApplicationsTabProps {
  applications: ArtistApplication[]
}

export function ArtistApplicationsTab({ applications }: ArtistApplicationsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Artist Applications</h3>
          <p className="text-sm text-muted-foreground">Review and manage artist applications for opportunities</p>
        </div>
      </div>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {application.artistName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{application.artistName}</CardTitle>
                    <CardDescription>{application.email}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    application.status === "approved"
                      ? "default"
                      : application.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Music className="h-4 w-4 mr-2" />
                    <span className="font-medium">Opportunity:</span>
                    <span className="ml-1">{application.opportunityTitle}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="font-medium">Venue:</span>
                    <span className="ml-1">{application.venue}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium">Event Date:</span>
                    <span className="ml-1">{new Date(application.eventDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Genre:</span>
                    <span className="ml-1">{application.genre}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Applied:</span>
                    <span className="ml-1">{new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {application.status === "pending" && (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      Reject
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ArtistApplicationsTab

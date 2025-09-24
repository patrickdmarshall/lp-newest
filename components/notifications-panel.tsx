"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Calendar, MessageSquare, Star, Mail, Clock, CheckCircle } from "lucide-react"

export function NotificationsPanel() {
  const [emailNotifications, setEmailNotifications] = useState({
    bookingRequests: true,
    applicationUpdates: true,
    pendingDeadlines: true,
    newMessages: true,
    upcomingEvents: true,
    opportunityMatches: false,
    newsletter: false,
  })

  const handleToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    })
  }

  return (
    <Card className="bg-navy-light border-navy">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-orange" />
          Notification Preferences
        </CardTitle>
        <p className="text-gray-400 text-sm">Choose when you want to receive email notifications</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="booking-requests" className="text-white">
                  Booking Requests
                </Label>
                <p className="text-gray-400 text-xs">When venues want to book you for events</p>
              </div>
            </div>
            <Switch
              id="booking-requests"
              checked={emailNotifications.bookingRequests}
              onCheckedChange={() => handleToggle("bookingRequests")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="application-updates" className="text-white">
                  Application Updates
                </Label>
                <p className="text-gray-400 text-xs">When your applications are approved or declined</p>
              </div>
            </div>
            <Switch
              id="application-updates"
              checked={emailNotifications.applicationUpdates}
              onCheckedChange={() => handleToggle("applicationUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="pending-deadlines" className="text-white">
                  Pending Deadlines
                </Label>
                <p className="text-gray-400 text-xs">Reminders for applications that need responses</p>
              </div>
            </div>
            <Switch
              id="pending-deadlines"
              checked={emailNotifications.pendingDeadlines}
              onCheckedChange={() => handleToggle("pendingDeadlines")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="new-messages" className="text-white">
                  New Messages
                </Label>
                <p className="text-gray-400 text-xs">Direct messages from venues and other users</p>
              </div>
            </div>
            <Switch
              id="new-messages"
              checked={emailNotifications.newMessages}
              onCheckedChange={() => handleToggle("newMessages")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="upcoming-events" className="text-white">
                  Upcoming Events
                </Label>
                <p className="text-gray-400 text-xs">Reminders for your confirmed performances</p>
              </div>
            </div>
            <Switch
              id="upcoming-events"
              checked={emailNotifications.upcomingEvents}
              onCheckedChange={() => handleToggle("upcomingEvents")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="opportunity-matches" className="text-white">
                  Opportunity Matches
                </Label>
                <p className="text-gray-400 text-xs">New opportunities that match your genres and location</p>
              </div>
            </div>
            <Switch
              id="opportunity-matches"
              checked={emailNotifications.opportunityMatches}
              onCheckedChange={() => handleToggle("opportunityMatches")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-orange" />
              <div>
                <Label htmlFor="newsletter" className="text-white">
                  Level Play Newsletter
                </Label>
                <p className="text-gray-400 text-xs">Monthly updates and platform news</p>
              </div>
            </div>
            <Switch
              id="newsletter"
              checked={emailNotifications.newsletter}
              onCheckedChange={() => handleToggle("newsletter")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

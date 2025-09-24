"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, X, Upload, MapPin, Users } from "lucide-react"

export default function VenueProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Venue Profile</h1>
          <p className="text-gray-400">Manage your venue information and settings</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/images/the-basement.jpg" />
                <AvatarFallback className="bg-[#ff6b35] text-white text-2xl">TB</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-[#3a3f56] text-gray-300 hover:bg-[#2a2f46] bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="venueName" className="text-white">
                    Venue Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="venueName"
                      defaultValue="The Basement"
                      className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                    />
                  ) : (
                    <p className="text-white text-lg font-semibold">The Basement</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="venueType" className="text-white">
                    Venue Type
                  </Label>
                  {isEditing ? (
                    <Select defaultValue="music-venue">
                      <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                        <SelectItem value="music-venue">Music Venue</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="club">Club</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="theater">Theater</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className="bg-[#ff6b35] text-white">Music Venue</Badge>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    defaultValue="Intimate music venue in the heart of Columbus, featuring local and touring acts across all genres."
                    className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  />
                ) : (
                  <p className="text-gray-300">
                    Intimate music venue in the heart of Columbus, featuring local and touring acts across all genres.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Venue Details */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardHeader>
          <CardTitle className="text-white">Venue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="capacity" className="text-white flex items-center gap-2">
                <Users className="h-4 w-4" />
                Capacity
              </Label>
              {isEditing ? (
                <Input
                  id="capacity"
                  type="number"
                  defaultValue="150"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">150 people</p>
              )}
            </div>
            <div>
              <Label htmlFor="stageSize" className="text-white">
                Stage Size
              </Label>
              {isEditing ? (
                <Select defaultValue="medium">
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="small">Small (up to 3 people)</SelectItem>
                    <SelectItem value="medium">Medium (4-6 people)</SelectItem>
                    <SelectItem value="large">Large (7+ people)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-300">Medium (4-6 people)</p>
              )}
            </div>
            <div>
              <Label htmlFor="soundSystem" className="text-white">
                Sound System
              </Label>
              {isEditing ? (
                <Select defaultValue="full">
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="full">Full PA System</SelectItem>
                    <SelectItem value="professional">Professional Grade</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-300">Full PA System</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardHeader>
          <CardTitle className="text-white">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  defaultValue="booking@thebasement.com"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">booking@thebasement.com</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="text-white">
                Phone
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="(614) 555-0123"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">(614) 555-0123</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="address" className="text-white flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            {isEditing ? (
              <Textarea
                id="address"
                defaultValue="391 Neil Ave, Columbus, OH 43215"
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
              />
            ) : (
              <p className="text-gray-300">391 Neil Ave, Columbus, OH 43215</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booking Information */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardHeader>
          <CardTitle className="text-white">Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bookingLead" className="text-white">
                Booking Lead Time
              </Label>
              {isEditing ? (
                <Select defaultValue="2-weeks">
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="1-week">1 week</SelectItem>
                    <SelectItem value="2-weeks">2 weeks</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="2-months">2 months</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-300">2 weeks</p>
              )}
            </div>
            <div>
              <Label htmlFor="preferredGenres" className="text-white">
                Preferred Genres
              </Label>
              {isEditing ? (
                <Input
                  id="preferredGenres"
                  defaultValue="Hip-Hop, Rock, Indie, Electronic"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Hip-Hop</Badge>
                  <Badge variant="secondary">Rock</Badge>
                  <Badge variant="secondary">Indie</Badge>
                  <Badge variant="secondary">Electronic</Badge>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="bookingNotes" className="text-white">
              Booking Notes
            </Label>
            {isEditing ? (
              <Textarea
                id="bookingNotes"
                defaultValue="We prefer original artists with strong social media presence. All ages welcome until 10pm."
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
              />
            ) : (
              <p className="text-gray-300">
                We prefer original artists with strong social media presence. All ages welcome until 10pm.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

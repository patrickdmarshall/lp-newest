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
import { Edit, Save, X, Upload, Instagram, Music } from "lucide-react"

export default function ArtistProfilePage() {
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
          <h1 className="text-3xl font-bold text-white">Artist Profile</h1>
          <p className="text-gray-400">Manage your artist information and settings</p>
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
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-[#ff6b35] text-white text-2xl">DA</AvatarFallback>
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
                  <Label htmlFor="artistName" className="text-white">
                    Artist/Band Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="artistName"
                      defaultValue="DMAR"
                      className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                    />
                  ) : (
                    <p className="text-white text-lg font-semibold">DMAR</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="genre" className="text-white">
                    Primary Genre
                  </Label>
                  {isEditing ? (
                    <Select defaultValue="hip-hop">
                      <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                        <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="pop">Pop</SelectItem>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="indie">Indie</SelectItem>
                        <SelectItem value="r&b">R&B</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className="bg-[#ff6b35] text-white">Hip-Hop</Badge>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="bio" className="text-white">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    defaultValue="Columbus-based hip-hop artist with a unique sound blending modern beats with classic influences."
                    className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  />
                ) : (
                  <p className="text-gray-300">
                    Columbus-based hip-hop artist with a unique sound blending modern beats with classic influences.
                  </p>
                )}
              </div>
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
                  defaultValue="info@levelplay.co"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">info@levelplay.co</p>
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
                  defaultValue="(555) 123-4567"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">(555) 123-4567</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="location" className="text-white">
              Location
            </Label>
            {isEditing ? (
              <Input
                id="location"
                defaultValue="Columbus, OH"
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
              />
            ) : (
              <p className="text-gray-300">Columbus, OH</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardHeader>
          <CardTitle className="text-white">Social Media & Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instagram" className="text-white flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </Label>
              {isEditing ? (
                <Input
                  id="instagram"
                  defaultValue="@dmarmusic"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">@dmarmusic</p>
              )}
            </div>
            <div>
              <Label htmlFor="spotify" className="text-white flex items-center gap-2">
                <Music className="h-4 w-4" />
                Spotify
              </Label>
              {isEditing ? (
                <Input
                  id="spotify"
                  defaultValue="https://open.spotify.com/artist/dmar"
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              ) : (
                <p className="text-gray-300">https://open.spotify.com/artist/dmar</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Details */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardHeader>
          <CardTitle className="text-white">Performance Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bandSize" className="text-white">
                Band Size
              </Label>
              {isEditing ? (
                <Select defaultValue="solo">
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="duo">Duo</SelectItem>
                    <SelectItem value="trio">Trio</SelectItem>
                    <SelectItem value="quartet">Quartet</SelectItem>
                    <SelectItem value="5+">5+ Members</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-300">Solo</p>
              )}
            </div>
            <div>
              <Label htmlFor="setLength" className="text-white">
                Typical Set Length
              </Label>
              {isEditing ? (
                <Select defaultValue="45">
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-300">45 minutes</p>
              )}
            </div>
            <div>
              <Label htmlFor="experience" className="text-white">
                Experience Level
              </Label>
              {isEditing ? (
                <Select defaultValue="intermediate">
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-300">Intermediate</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="techRequirements" className="text-white">
              Technical Requirements
            </Label>
            {isEditing ? (
              <Textarea
                id="techRequirements"
                defaultValue="Standard sound system, wireless microphone preferred, basic lighting setup"
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
              />
            ) : (
              <p className="text-gray-300">
                Standard sound system, wireless microphone preferred, basic lighting setup
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Instagram, Twitter, Youtube, Globe, Music } from "lucide-react"
import { toast } from "sonner"

interface ArtistProfile {
  id: string
  name: string
  bio: string
  city: string
  state: string
  genres: string[]
  image?: string
  social_links?: {
    instagram?: string
    twitter?: string
    youtube?: string
    website?: string
    spotify?: string
  }
}

interface EditableArtistProfileProps {
  profile: ArtistProfile
  onSave: (profile: ArtistProfile) => Promise<void>
  isEditing: boolean
  onToggleEdit: () => void
}

const availableGenres = [
  "Rock",
  "Pop",
  "Hip-Hop",
  "R&B",
  "Country",
  "Electronic",
  "Jazz",
  "Blues",
  "Folk",
  "Indie",
  "Alternative",
  "Metal",
  "Punk",
  "Reggae",
  "Classical",
  "Gospel",
]

const stateOptions = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

export function EditableArtistProfile({ profile, onSave, isEditing, onToggleEdit }: EditableArtistProfileProps) {
  const [editedProfile, setEditedProfile] = useState<ArtistProfile>(profile)
  const [newGenre, setNewGenre] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(editedProfile)
      toast.success("Profile updated successfully!")
      onToggleEdit()
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    onToggleEdit()
  }

  const addGenre = () => {
    if (newGenre && !editedProfile.genres.includes(newGenre)) {
      setEditedProfile({
        ...editedProfile,
        genres: [...editedProfile.genres, newGenre],
      })
      setNewGenre("")
    }
  }

  const removeGenre = (genre: string) => {
    setEditedProfile({
      ...editedProfile,
      genres: editedProfile.genres.filter((g) => g !== genre),
    })
  }

  const updateSocialLink = (platform: string, value: string) => {
    setEditedProfile({
      ...editedProfile,
      social_links: {
        ...editedProfile.social_links,
        [platform]: value,
      },
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <Card className="bg-navy-light border-navy">
          <CardHeader>
            <CardTitle className="text-white">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-orange">
                <AvatarImage src={editedProfile.image || "/placeholder.svg"} alt={editedProfile.name} />
                <AvatarFallback className="bg-orange/20 text-orange text-2xl">
                  {getInitials(editedProfile.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Artist Name
                  </Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={editedProfile.city}
                      onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-white">
                      State
                    </Label>
                    <Select
                      value={editedProfile.state}
                      onValueChange={(value) => setEditedProfile({ ...editedProfile, state: value })}
                    >
                      <SelectTrigger className="bg-navy border-navy-dark text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-navy border-navy-dark">
                        {stateOptions.map((state) => (
                          <SelectItem key={state} value={state} className="text-white hover:bg-navy-light">
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="bg-navy border-navy-dark text-white min-h-[100px]"
                placeholder="Tell us about your music and style..."
              />
            </div>

            <div>
              <Label className="text-white">Genres</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {editedProfile.genres.map((genre) => (
                  <Badge key={genre} className="bg-orange/20 text-orange border-none">
                    {genre}
                    <button onClick={() => removeGenre(genre)} className="ml-2 hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newGenre} onValueChange={setNewGenre}>
                  <SelectTrigger className="bg-navy border-navy-dark text-white">
                    <SelectValue placeholder="Add a genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-navy-dark">
                    {availableGenres
                      .filter((genre) => !editedProfile.genres.includes(genre))
                      .map((genre) => (
                        <SelectItem key={genre} value={genre} className="text-white hover:bg-navy-light">
                          {genre}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button onClick={addGenre} disabled={!newGenre} className="bg-orange hover:bg-orange/90 text-navy">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">Social Media Links</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <Input
                    placeholder="Instagram username (without @)"
                    value={editedProfile.social_links?.instagram || ""}
                    onChange={(e) => updateSocialLink("instagram", e.target.value)}
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <Input
                    placeholder="Twitter/X username (without @)"
                    value={editedProfile.social_links?.twitter || ""}
                    onChange={(e) => updateSocialLink("twitter", e.target.value)}
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <Input
                    placeholder="YouTube channel URL"
                    value={editedProfile.social_links?.youtube || ""}
                    onChange={(e) => updateSocialLink("youtube", e.target.value)}
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-green-500" />
                  <Input
                    placeholder="Spotify artist URL"
                    value={editedProfile.social_links?.spotify || ""}
                    onChange={(e) => updateSocialLink("spotify", e.target.value)}
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Website URL"
                    value={editedProfile.social_links?.website || ""}
                    onChange={(e) => updateSocialLink("website", e.target.value)}
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-orange hover:bg-orange/90 text-navy font-semibold"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-navy-light border-navy">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-orange">
              <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="bg-orange/20 text-orange text-2xl sm:text-3xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-gray-300">
                    {profile.city}, {profile.state}
                  </p>
                </div>
                <Button onClick={onToggleEdit} className="bg-orange hover:bg-orange/90 text-navy font-semibold">
                  Edit Profile
                </Button>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{profile.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {profile.genres.map((genre) => (
                  <Badge key={genre} className="bg-orange/20 text-orange border-none">
                    {genre}
                  </Badge>
                ))}
              </div>

              {profile.social_links && (
                <div className="flex flex-wrap gap-4">
                  {profile.social_links.instagram && (
                    <a
                      href={`https://instagram.com/${profile.social_links.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  )}
                  {profile.social_links.twitter && (
                    <a
                      href={`https://twitter.com/${profile.social_links.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                  {profile.social_links.youtube && (
                    <a
                      href={profile.social_links.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                      <span className="text-sm">YouTube</span>
                    </a>
                  )}
                  {profile.social_links.spotify && (
                    <a
                      href={profile.social_links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Music className="h-5 w-5" />
                      <span className="text-sm">Spotify</span>
                    </a>
                  )}
                  {profile.social_links.website && (
                    <a
                      href={profile.social_links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="text-sm">Website</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

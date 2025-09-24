"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function CreateOpportunityPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [venues, setVenues] = useState<any[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    venueId: "",
    title: "",
    type: "",
    eventDate: "",
    eventTime: "",
    genre: "",
    applicationDeadline: "",
    durationMinutes: "",
    description: "",
  })

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
    }
  }, [user, loading, router])

  // Fetch user's managed venues
  useEffect(() => {
    const fetchVenues = async () => {
      if (!user) return

      try {
        const response = await fetch("/api/venues/managed")
        if (response.ok) {
          const data = await response.json()
          setVenues(data.venues || [])
        }
      } catch (error) {
        console.error("Error fetching venues:", error)
      }
    }

    if (user) {
      fetchVenues()
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venueId: formData.venueId,
          title: formData.title,
          type: formData.type.toLowerCase(),
          event_date: formData.eventDate,
          event_time: formData.eventTime,
          genre: formData.genre,
          application_deadline: formData.applicationDeadline,
          description:
            formData.description + (formData.durationMinutes ? `\n\nDuration: ${formData.durationMinutes} min` : ""),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Opportunity Created!",
          description: `"${formData.title}" has been created successfully.`,
        })
        router.push(`/opportunities/${data.id}`)
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create opportunity")
      }
    } catch (error) {
      console.error("Error creating opportunity:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create opportunity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render content if not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-navy pt-24">
      <div className="container px-4 md:px-6 py-12">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-2xl mx-auto">
          <Link
            href="/venue/dashboard"
            className="inline-flex items-center text-orange hover:text-orange/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <Card className="bg-navy-light border-navy-dark">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Create New Opportunity</CardTitle>
              <p className="text-gray-300">Post a new performance opportunity for artists to apply to.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="venueId" className="text-white">
                    Venue *
                  </Label>
                  <Select value={formData.venueId} onValueChange={(value) => handleSelectChange("venueId", value)}>
                    <SelectTrigger className="bg-navy border-navy-dark text-white">
                      <SelectValue placeholder="Select a venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {venue.venue_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title" className="text-white">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Headliner Opportunity – Newport Music Hall"
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-white">
                    Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger className="bg-navy border-navy-dark text-white">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Headliner">Headliner</SelectItem>
                      <SelectItem value="Supporting">Supporting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate" className="text-white">
                      Event Date *
                    </Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventTime" className="text-white">
                      Event Time *
                    </Label>
                    <Input
                      id="eventTime"
                      name="eventTime"
                      type="time"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre" className="text-white">
                      Genre *
                    </Label>
                    <Input
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., All Genres, Rock, Folk"
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="durationMinutes" className="text-white">
                      Duration (minutes)
                    </Label>
                    <Input
                      id="durationMinutes"
                      name="durationMinutes"
                      type="number"
                      value={formData.durationMinutes}
                      onChange={handleInputChange}
                      placeholder="e.g., 30, 60"
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="applicationDeadline" className="text-white">
                    Application Deadline *
                  </Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    required
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">
                    About / Details *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the opportunity, requirements, compensation, etc."
                    className="bg-navy border-navy-dark text-white"
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold text-lg py-3"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Opportunity...
                    </>
                  ) : (
                    "Create Opportunity"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

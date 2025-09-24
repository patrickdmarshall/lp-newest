"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

// Same opportunities data with correct IDs
const opportunities = [
  {
    id: "hunter-metts",
    title: "Hunter Metts Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "November 2, 2025",
    time: "6:00 PM",
    type: "Supporting",
    genre: ["Folk"],
    setLength: "30 min",
    description:
      "Singer-songwriter / producer from Franklin, TN. He cites artists like Bon Iver, Fleet Foxes and Novo Amor as influences.",
    applicationDeadline: "September 28, 2025",
    urgent: false,
  },
  {
    id: "marlon-funaki",
    title: "Marlon Funaki Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "September 4, 2025",
    time: "7:00 PM",
    type: "Supporting",
    genre: ["Alternative", "Indie"],
    setLength: "30 min",
    description:
      'Listen to his song "Red Hearts" and you\'ll become a fan of this young talent! Looking for support that matches sonically.',
    applicationDeadline: "August 7, 2025",
    urgent: true,
  },
  {
    id: "hayden-coffman",
    title: "Hayden Coffman Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "August 29, 2025",
    time: "8:00 PM",
    type: "Supporting",
    genre: ["Country"],
    setLength: "30 min",
    description:
      "A rising star in the world of country music that infuses his own unique flair and authenticity into every song he creates.",
    applicationDeadline: "August 1, 2025",
    urgent: true,
  },
  {
    id: "headliner-ar-music-bar",
    title: "Headliner Opportunity – A&R Music Bar",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "September 19, 2025",
    time: "7:00 PM",
    type: "Headliner",
    genre: ["All Genres"],
    setLength: "60 min",
    description: "Looking for acts of any genre looking to promote their music or art.",
    applicationDeadline: "July 25, 2025",
    urgent: false,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [opportunity, setOpportunity] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    artistName: "",
    email: "",
    phone: "",
    genre: "",
    experience: "",
    socialMedia: "",
    coverLetter: "",
  })

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (params.id) {
      const found = opportunities.find((opp) => opp.id === params.id)
      setOpportunity(found)
    }
  }, [params.id])

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        artistName: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        genre: profile.genre || "",
      }))
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/movwrzad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          opportunityTitle: opportunity?.title,
          venue: opportunity?.venue,
          eventDate: opportunity?.date,
          eventTime: opportunity?.time,
          applicationType: "Opportunity Application",
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: `Your application for "${opportunity?.title}" has been submitted successfully.`,
        })
        router.push("/opportunities")
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
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

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-navy pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Opportunity Not Found</h1>
          <Link href="/opportunities">
            <Button className="bg-orange hover:bg-orange/90 text-navy">Back to Opportunities</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy pt-24">
      <div className="container px-4 md:px-6 py-12">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-2xl mx-auto">
          <Link
            href={`/opportunities/${opportunity.id}`}
            className="inline-flex items-center text-orange hover:text-orange/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunity
          </Link>

          <Card className="bg-navy-light border-navy-dark">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Apply for {opportunity.title}</CardTitle>
              <p className="text-gray-300">
                {opportunity.venue} • {opportunity.date} at {opportunity.time}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="artistName" className="text-white">
                      Artist/Band Name *
                    </Label>
                    <Input
                      id="artistName"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
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
                      className="bg-navy border-navy-dark text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience" className="text-white">
                    Performance Experience
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Tell us about your live performance experience..."
                    className="bg-navy border-navy-dark text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="socialMedia" className="text-white">
                    Social Media / Website
                  </Label>
                  <Input
                    id="socialMedia"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="Instagram, Spotify, website, etc."
                    className="bg-navy border-navy-dark text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter" className="text-white">
                    Why are you a good fit for this show? *
                  </Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us why you'd be perfect for this opportunity..."
                    className="bg-navy border-navy-dark text-white"
                    rows={4}
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
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
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

"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, User, Music, Instagram, ExternalLink } from "lucide-react"

export default function AccountPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    updateType: "",
    details: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, updateType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("updateType", formData.updateType)
    formDataToSend.append("details", formData.details)
    formDataToSend.append("_subject", `Level Play Artist Profile Update Request: ${formData.updateType}`)

    try {
      const response = await fetch("https://formspree.io/f/xgvyqdyo", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", updateType: "", details: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Update Your Artist Profile</h1>
            <p className="text-gray-300 text-lg">
              Request updates to your information displayed on your artist profile page
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Information Card */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white text-xl">What You Can Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Basic Information</h3>
                    <p className="text-gray-300 text-sm">Name, location, bio, and profile picture</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Music className="h-5 w-5 text-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Musical Details</h3>
                    <p className="text-gray-300 text-sm">Genres, career highlights, and notable shows</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Social Links</h3>
                    <p className="text-gray-300 text-sm">Spotify, Instagram, and other platform links</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Statistics</h3>
                    <p className="text-gray-300 text-sm">Years active, follower counts, and achievements</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange/10 border border-orange/30 rounded-lg">
                  <p className="text-orange text-sm">
                    <strong>Processing Time:</strong> Profile updates are typically processed within 24-48 hours. You'll
                    receive a confirmation email once your changes are live.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Update Request Form */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white text-xl">Request Profile Update</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Artist Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white"
                      placeholder="Your artist name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="updateType" className="text-white">
                      What would you like to update? *
                    </Label>
                    <Select onValueChange={handleSelectChange} value={formData.updateType}>
                      <SelectTrigger className="bg-navy border-navy-dark text-white">
                        <SelectValue placeholder="Select update type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic-info">Basic Information (Name, Bio, Location)</SelectItem>
                        <SelectItem value="profile-picture">Profile Picture</SelectItem>
                        <SelectItem value="musical-details">Musical Details (Genres, Highlights)</SelectItem>
                        <SelectItem value="social-links">Social Media Links</SelectItem>
                        <SelectItem value="statistics">Statistics & Achievements</SelectItem>
                        <SelectItem value="multiple">Multiple Updates</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="details" className="text-white">
                      Update Details *
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      required
                      className="bg-navy border-navy-dark text-white min-h-[120px]"
                      placeholder="Please provide specific details about what you'd like to update. Include new information, links, or attach images if needed..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange hover:bg-orange/90 text-navy font-medium py-3"
                  >
                    {isSubmitting ? "Sending Request..." : "Submit Update Request"}
                  </Button>

                  {submitStatus === "success" && (
                    <Alert className="bg-green-500/20 border-green-500">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-400">
                        <strong>Update request sent successfully!</strong>
                        <br />
                        We'll review your request and update your profile within 24-48 hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert className="bg-red-500/20 border-red-500">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-400">
                        <strong>Error sending request.</strong>
                        <br />
                        Please try again or email us directly at hello@levelplay.com
                      </AlertDescription>
                    </Alert>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

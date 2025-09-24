"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("subject", formData.subject)
    formDataToSend.append("message", formData.message)
    formDataToSend.append("_subject", `Level Play Contact: ${formData.subject}`)
    formDataToSend.append("form", "contact") // Added line

    try {
      const response = await fetch("/api/formspree", { // Updated URL
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
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
    <Card className="bg-navy-light border-navy">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Get in Touch</CardTitle>
        <p className="text-gray-300">
          Have questions about Level Play? Want to partner with us? We'd love to hear from you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
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

          <div>
            <Label htmlFor="subject" className="text-white">
              Subject *
            </Label>
            <Select onValueChange={handleSelectChange} value={formData.subject}>
              <SelectTrigger className="bg-navy border-navy-dark text-white">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="artist">Artist Support</SelectItem>
                <SelectItem value="venue">Venue Partnership</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="press">Press & Media</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-white">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="bg-navy border-navy-dark text-white min-h-[120px]"
              placeholder="Tell us how we can help you..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange hover:bg-orange/90 text-navy font-medium py-3"
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </Button>

          {submitStatus === "success" && (
            <Alert className="bg-green-500/20 border-green-500">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">
                <strong>Message sent successfully!</strong>
                <br />
                We'll get back to you within 24 hours.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="bg-red-500/20 border-red-500">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                <strong>Error sending message.</strong>
                <br />
                Please try again or email us directly at hello@levelplay.com
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

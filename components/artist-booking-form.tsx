"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LogIn } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

const formSchema = z.object({
  artistName: z.string().min(2, { message: "Artist/Band name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  genre: z.string().min(1, { message: "Genre is required" }),
  estimatedDraw: z.string().min(1, { message: "Estimated local draw is required" }),
  availableOnDate: z.boolean().default(false),
  eventDate: z.string().optional(),
  oneLinerPitch: z.string().optional(),
  performanceLink: z.string().url({ message: "Valid performance link is required" }),
  instagramHandle: z.string().min(1, { message: "Instagram handle is required" }),
  followerCount: z.string().min(1, { message: "Follower count is required" }),
  pastVenues: z.string().min(1, { message: "Past venues or notable acts is required" }),
  compensationPreference: z.string().min(1, { message: "Compensation preference is required" }),
})

interface ArtistBookingFormProps {
  venueName: string
  venueId?: string
  eventDate?: string
  onClose?: () => void
}

export function ArtistBookingForm({ venueName, venueId, eventDate, onClose }: ArtistBookingFormProps) {
  const { user, profile } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: profile?.name || "",
      contactName: "",
      email: user?.email || "",
      phone: "",
      location: "",
      genre: "",
      estimatedDraw: "",
      availableOnDate: false,
      eventDate: eventDate || "",
      oneLinerPitch: "",
      performanceLink: "",
      instagramHandle: "",
      followerCount: "",
      pastVenues: "",
      compensationPreference: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a booking request.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("venue", venueName)
      formData.append("artistName", values.artistName)
      formData.append("contactName", values.contactName)
      formData.append("email", values.email)
      formData.append("phone", values.phone)
      formData.append("location", values.location)
      formData.append("genre", values.genre)
      formData.append("estimatedDraw", values.estimatedDraw)
      formData.append("availableOnDate", values.availableOnDate ? "Yes" : "No")
      formData.append("eventDate", values.eventDate || "")
      formData.append("oneLinerPitch", values.oneLinerPitch || "")
      formData.append("performanceLink", values.performanceLink)
      formData.append("instagramHandle", values.instagramHandle)
      formData.append("followerCount", values.followerCount)
      formData.append("pastVenues", values.pastVenues)
      formData.append("compensationPreference", values.compensationPreference)
      formData.append("_subject", `New Booking Request for ${venueName}`)

      const response = await fetch("https://formspree.io/f/xgvablkk", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Booking request submitted",
          description: "We'll review your request and get back to you soon.",
        })
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center px-4">
        <div className="text-center py-8 max-w-md">
          <LogIn className="mx-auto h-12 w-12 text-orange mb-4" />
          <h3 className="text-xl font-bold text-white mb-4">Sign In Required</h3>
          <p className="text-gray-300 mb-6">You need to be signed in to submit a booking request.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="rounded-full bg-orange hover:bg-orange-dark text-navy">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            {onClose && (
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-full border-orange text-orange hover:bg-orange hover:text-navy bg-transparent"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (profile && profile.role !== "artist") {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center px-4">
        <div className="text-center py-8 max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">Artists Only</h3>
          <p className="text-gray-300 mb-6">Only users with an artist profile can submit booking requests to venues.</p>
          <Button onClick={onClose} className="rounded-full bg-orange hover:bg-orange-dark text-navy">
            Close
          </Button>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-navy text-white flex items-center justify-center px-4">
        <div className="text-center py-8 max-w-md">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Booking Request Submitted!</h3>
          <p className="text-gray-300 mb-6">
            Thank you for your interest in performing at {venueName}. We'll review your request and get back to you
            soon.
          </p>
          <Button onClick={onClose} className="rounded-full bg-orange hover:bg-orange-dark text-navy">
            Close
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Apply to Perform at {venueName}</h1>
            <p className="text-gray-300">Fill out the form below to submit your application.</p>
            {eventDate && <p className="text-orange mt-2">Event Date: {eventDate}</p>}
          </div>

          <div className="bg-navy-light/50 rounded-lg p-6 border border-navy-light">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="artistName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Artist/Band Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your artist or band name"
                          {...field}
                          className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Contact Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Location *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, State"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Genre *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-navy border-navy-light text-white">
                              <SelectValue placeholder="Select your genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-navy border-navy-light text-white">
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="indie">Indie</SelectItem>
                            <SelectItem value="alternative">Alternative</SelectItem>
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                            <SelectItem value="electronic">Electronic</SelectItem>
                            <SelectItem value="folk">Folk</SelectItem>
                            <SelectItem value="country">Country</SelectItem>
                            <SelectItem value="jazz">Jazz</SelectItem>
                            <SelectItem value="blues">Blues</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimatedDraw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Estimated Local Draw *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="# of people you can bring out"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          How many people can you typically bring to a local show?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {eventDate && (
                  <FormField
                    control={form.control}
                    name="availableOnDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-400"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">Are you available on {eventDate}? *</FormLabel>
                          <FormDescription className="text-gray-400">
                            Confirm your availability for this specific event date
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="oneLinerPitch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">One-liner Pitch (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tell us why you're a good fit for this show"
                          {...field}
                          className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        A brief pitch about why you'd be perfect for this opportunity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="performanceLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Live Performance Link *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YouTube, Instagram, or other performance video link"
                          {...field}
                          className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Share a link to a live performance video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instagramHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Instagram Handle *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="@yourusername"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="followerCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Instagram Follower Count *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Number of followers"
                            {...field}
                            className="bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="pastVenues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Past Venues or Notable Acts Played With *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List venues you've played or notable acts you've performed with"
                          className="min-h-24 bg-navy border-navy-light focus:border-orange text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="compensationPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Compensation Preference *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-navy border-navy-light text-white">
                            <SelectValue placeholder="Select your preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-navy border-navy-light text-white">
                          <SelectItem value="flat-fee">Flat Fee</SelectItem>
                          <SelectItem value="door-split">Door Split</SelectItem>
                          <SelectItem value="either">Either/Negotiable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  {onClose && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="rounded-full border-orange text-orange hover:bg-orange hover:text-navy bg-transparent"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="rounded-full bg-orange hover:bg-orange-dark text-navy font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

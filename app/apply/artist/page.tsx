"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Music } from 'lucide-react' // Removed Upload icon
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  artistName: z.string().min(1, "Artist name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  genre: z.string().min(1, "Primary genre is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  yearsActive: z.string().min(1, "Years active is required"),
  performanceHistory: z.string().min(1, "Performance history is required"),
  spotifyUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  hasOwnEquipment: z.boolean(),
  hasTransportation: z.boolean(),
  willingToTravel: z.boolean(),
  additionalInfo: z.string().optional(),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  // Changed from file upload to URL, and made it required
  artistPictureUrl: z.string().url("Invalid URL format").min(1, "Artist picture URL is required"),
})

export default function ArtistApplicationPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Removed artistPicture state and useUpload state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      contactName: "",
      email: user?.email || "",
      phone: "",
      city: "",
      state: "",
      genre: "",
      bio: "",
      yearsActive: "",
      performanceHistory: "",
      spotifyUrl: "",
      instagramUrl: "",
      hasOwnEquipment: false,
      hasTransportation: false,
      willingToTravel: false,
      additionalInfo: "",
      agreedToTerms: false,
      artistPictureUrl: "", // Default value for the new required field
    },
  })

  // Removed handleArtistPictureChange function

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // Create FormData for Formspree submission
      const formData = new FormData()

      // Add Formspree configuration
      formData.append("_subject", `New Artist Application - ${data.artistName}`)

      // Add form data
      formData.append("artistName", data.artistName)
      formData.append("contactName", data.contactName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("city", data.city)
      formData.append("state", data.state)
      formData.append("genre", data.genre)
      formData.append("bio", data.bio)
      formData.append("yearsActive", data.yearsActive)
      formData.append("performanceHistory", data.performanceHistory)
      formData.append("spotifyUrl", data.spotifyUrl || "")
      formData.append("instagramUrl", data.instagramUrl || "")
      formData.append("hasOwnEquipment", data.hasOwnEquipment ? "Yes" : "No")
      formData.append("hasTransportation", data.hasTransportation ? "Yes" : "No")
      formData.append("willingToTravel", data.willingToTravel ? "Yes" : "No")
      formData.append("additionalInfo", data.additionalInfo || "")
      formData.append("agreedToTerms", data.agreedToTerms ? "Yes" : "No")

      // Add artist picture URL
      formData.append("artistPictureUrl", data.artistPictureUrl) // Always send the URL

      // Add these fields to improve deliverability
      formData.append("_replyto", data.email)
      formData.append("_next", "https://yourdomain.com/registration-success")
      formData.append("_format", "plain")

      formData.append("form", "artist")
      const response = await fetch("/api/formspree", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description:
            "Your artist application has been submitted successfully. We'll review your application and get back to you within 3-5 business days.",
        })

        // Reset form
        form.reset()
        // Removed setArtistPicture and setPictureUrl reset
        form.setValue("artistPictureUrl", "") // Reset the URL field

        // Redirect to success page
        setTimeout(() => {
          router.push("/registration-success")
        }, 2000)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const genres = [
    "Hip Hop",
    "R&B",
    "Rock",
    "Alternative",
    "Indie",
    "Pop",
    "Electronic",
    "Jazz",
    "Blues",
    "Country",
    "Folk",
    "Reggae",
    "Punk",
    "Metal",
    "Other",
  ]

  const states = [
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

  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <MainNav />

      <section className="bg-navy-light text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1),transparent_50%)]"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Music className="h-16 w-16 text-orange mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-syne">
              Join as an <span className="text-orange">Artist</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
              Connect with venues, build your fanbase, and book your next show.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Artist Picture</h3>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-navy-light">
                      {/* Always use the URL from the form field */}
                      <AvatarImage src={form.watch("artistPictureUrl") || "/placeholder.svg"} alt="Artist" />
                      <AvatarFallback className="bg-orange/20 text-orange text-2xl">
                        <Camera className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Removed upload/URL toggle buttons */}

                  <FormField
                    control={form.control}
                    name="artistPictureUrl"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-md">
                        <FormLabel className="text-white sr-only">Artist Picture URL *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter image URL (e.g., Google Drive, Imgur)"
                            className="bg-navy border-navy-dark text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="text-sm text-gray-400 text-center">
                    Please provide a direct link to your artist picture.
                  </p>
                </div>
              </div>

              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="artistName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Artist/Band Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your artist or band name"
                              className="bg-navy border-navy-dark text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Contact Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your full name"
                              className="bg-navy border-navy-dark text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="your@email.com"
                              type="email"
                              className="bg-navy border-navy-dark text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="(555) 123-4567"
                              className="bg-navy border-navy-dark text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">City *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Columbus" className="bg-navy border-navy-dark text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">State *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-navy border-navy-dark text-white">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-navy border-navy-dark">
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Musical Information</h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Primary Genre *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-navy border-navy-dark text-white">
                              <SelectValue placeholder="Select primary genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-navy border-navy-dark">
                            {genres.map((genre) => (
                              <SelectItem key={genre} value={genre}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearsActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Years Active *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., 3 years"
                            className="bg-navy border-navy-dark text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Artist Bio *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us about your music, style, and what makes you unique..."
                            className="bg-navy border-navy-dark text-white min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="performanceHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Performance History *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="List notable venues, events, or performances you've played..."
                            className="bg-navy border-navy-dark text-white min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Social Media Links</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="spotifyUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Spotify URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://open.spotify.com/artist/..."
                              className="bg-navy border-navy-dark text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagramUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Instagram URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://www.instagram.com/..."
                              className="bg-navy border-navy-dark text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Equipment & Logistics</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="hasOwnEquipment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white">Own Equipment</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasTransportation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white">Own Transportation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="willingToTravel"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white">Willing to Travel</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any additional information about your music, equipment, or requirements..."
                            className="bg-navy border-navy-dark text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreedToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-300 leading-relaxed">
                            I agree to the Level Play Terms of Service and Privacy Policy. I understand that this is an
                            application to join the platform and does not guarantee acceptance. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold py-3"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Artist Application"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

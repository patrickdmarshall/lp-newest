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
import { Camera, Building } from 'lucide-react' // Removed Upload icon
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const formSchema = z.object({
  venueName: z.string().min(1, "Venue name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  capacity: z.string().min(1, "Capacity is required"),
  venueType: z.string().min(1, "Venue type is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  hasStage: z.boolean(),
  hasSoundSystem: z.boolean(),
  hasLighting: z.boolean(),
  hasParking: z.boolean(),
  website: z.string().optional(),
  instagramUrl: z.string().optional(),
  additionalInfo: z.string().optional(),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  // Changed from file upload to URL, and made it required
  venuePictureUrl: z.string().url("Invalid URL format").min(1, "Venue picture URL is required"),
})

export default function VenueApplicationPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Removed venuePicture state and useUpload state
  // Removed agreedToTerms state as it's now part of formSchema

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      venueName: "",
      contactName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      capacity: "",
      venueType: "",
      description: "",
      hasStage: false,
      hasSoundSystem: false,
      hasLighting: false,
      hasParking: false,
      website: "",
      instagramUrl: "",
      additionalInfo: "",
      agreedToTerms: false,
      venuePictureUrl: "", // Default value for the new required field
    },
  })

  // Removed handleVenuePictureChange function

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Removed agreedToTerms check here as it's handled by Zod schema now

    setIsSubmitting(true)

    try {
      // Create FormData for Formspree submission
      const formData = new FormData()

      // Add Formspree configuration
      formData.append("_subject", "New Venue Application")
      formData.append("_next", "/registration-success")

      // Add form data
      formData.append("venueName", data.venueName)
      formData.append("contactName", data.contactName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("address", data.address)
      formData.append("city", data.city)
      formData.append("state", data.state)
      formData.append("zipCode", data.zipCode)
      formData.append("capacity", data.capacity)
      formData.append("venueType", data.venueType)
      formData.append("description", data.description)
      formData.append("hasStage", data.hasStage ? "Yes" : "No")
      formData.append("hasSoundSystem", data.hasSoundSystem ? "Yes" : "No")
      formData.append("hasLighting", data.hasLighting ? "Yes" : "No")
      formData.append("hasParking", data.hasParking ? "Yes" : "No")
      formData.append("website", data.website || "")
      formData.append("instagramUrl", data.instagramUrl || "")
      formData.append("additionalInfo", data.additionalInfo || "")
      formData.append("agreedToTerms", data.agreedToTerms ? "Yes" : "No") // Use data.agreedToTerms

      // Add venue picture URL
      formData.append("venuePictureUrl", data.venuePictureUrl) // Always send the URL

      formData.append("form", "venue")

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
            "Your venue application has been submitted successfully. We'll review your application and get back to you within 3-5 business days.",
        })

        // Reset form
        form.reset()
        // Removed setVenuePicture and setPictureUrl reset
        // Reset agreedToTerms via form.reset()
        form.setValue("venuePictureUrl", "") // Reset the URL field

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

  const venueTypes = [
    "Concert Hall",
    "Club/Bar",
    "Restaurant",
    "Theater",
    "Outdoor Venue",
    "Festival Ground",
    "Private Event Space",
    "Coffee Shop",
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

      {/* Hero Section */}
      <section className="bg-navy-light text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1),transparent_50%)]"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Building className="h-16 w-16 text-orange mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-syne">
              Join as a <span className="text-orange">Venue</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
              List your venue and start hosting amazing performances.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Venue Picture */}
              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Venue Picture</h3>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-navy-light">
                      {/* Always use the URL from the form field */}
                      <AvatarImage src={form.watch("venuePictureUrl") || "/placeholder.svg"} alt="Venue" />
                      <AvatarFallback className="bg-orange/20 text-orange text-2xl">
                        <Camera className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Removed upload/URL toggle buttons */}

                  <FormField
                    control={form.control}
                    name="venuePictureUrl"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-md">
                        <FormLabel className="text-white sr-only">Venue Picture URL *</FormLabel>
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
                    Please provide a direct link to your venue picture.
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-navy-light/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="venueName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Venue Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your venue name"
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

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Address *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Street address"
                            className="bg-navy border-navy-dark text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">City *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="City" className="bg-navy border-navy-dark text-white" />
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

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">ZIP Code *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="12345" className="bg-navy border-navy-dark text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Capacity *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 100" className="bg-navy border-navy-dark text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="venueType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Venue Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-navy border-navy-dark text-white">
                                <SelectValue placeholder="Select venue type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-navy border-navy-dark">
                              {venueTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Venue Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe your venue, atmosphere, and what makes it special..."
                            className="bg-navy border-navy-dark text-white min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Amenities</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hasStage"
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
                              <FormLabel className="text-white">Stage</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasSoundSystem"
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
                              <FormLabel className="text-white">Sound System</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasLighting"
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
                              <FormLabel className="text-white">Lighting</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hasParking"
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
                              <FormLabel className="text-white">Parking</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span>🌐</span> Online Presence
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Website</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="https://www.yourvenue.com"
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

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any additional information about your venue..."
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
                    {isSubmitting ? "Submitting..." : "Submit Venue Application"}
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

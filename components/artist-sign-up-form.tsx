"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Camera } from 'lucide-react'

const artistApplicationSchema = z.object({
  artistName: z.string().min(1, "Artist/Band name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  genre: z.string().min(1, "Genre is required"),
  experience: z.string().min(1, "Experience level is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  hasOriginalMusic: z.boolean(),
  performanceHistory: z.string().optional(),
  equipment: z.array(z.string()).optional(),
  availability: z.string().optional(),
  spotifyUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  profilePicture: z.string().optional(),
})

type ArtistApplicationForm = z.infer<typeof artistApplicationSchema>

export function ArtistSignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [profilePicture, setProfilePicture] = useState<string>("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArtistApplicationForm>({
    resolver: zodResolver(artistApplicationSchema),
    defaultValues: {
      hasOriginalMusic: false,
      equipment: [],
    },
  })

  const equipmentOptions = [
    "Guitar",
    "Bass",
    "Drums",
    "Keyboard/Piano",
    "Vocals",
    "DJ Equipment",
    "Electronic Instruments",
    "Horns/Brass",
    "Strings",
    "Other",
  ]

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    const updated = checked ? [...selectedEquipment, equipment] : selectedEquipment.filter((e) => e !== equipment)
    setSelectedEquipment(updated)
    setValue("equipment", updated)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfilePicture(result)
        setValue("profilePicture", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ArtistApplicationForm) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("_subject", "New Artist Application")
      formData.append("artistName", data.artistName)
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("location", data.location)
      formData.append("genre", data.genre)
      formData.append("experience", data.experience)
      formData.append("bio", data.bio)
      formData.append("hasOriginalMusic", data.hasOriginalMusic.toString())
      formData.append("performanceHistory", data.performanceHistory || "")
      formData.append("equipment", data.equipment?.join(", ") || "")
      formData.append("availability", data.availability || "")
      formData.append("spotifyUrl", data.spotifyUrl || "")
      formData.append("instagramUrl", data.instagramUrl || "")
      formData.append("profilePicture", profilePicture ? "Profile picture uploaded" : "No profile picture")

      formData.append("form", "artist")

      const response = await fetch("/api/formspree", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting artist application:", error)
    }

    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto p-12 bg-navy-light/30 rounded-xl text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-orange mb-4">Application Submitted!</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Thank you for applying to join Level Play as an artist. We'll review your application and get back to you
            within 3-5 business days.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        {/* Profile Picture Section */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Profile Picture</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <Avatar className="w-32 h-32 border-4 border-orange/30">
              <AvatarImage src={profilePicture || "/placeholder.svg"} alt="Profile picture" />
              <AvatarFallback className="bg-navy text-white text-2xl">
                <Camera className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <Label htmlFor="profilePicture" className="cursor-pointer">
                <div className="bg-orange hover:bg-orange/90 text-navy font-semibold px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>Upload Profile Picture</span>
                </div>
              </Label>
              <Input id="profilePicture" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF (max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Basic Information</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div>
              <Label htmlFor="artistName" className="text-white text-lg font-semibold mb-4 block">
                Artist/Band Name *
              </Label>
              <Input
                id="artistName"
                {...register("artistName")}
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                placeholder="Your artist or band name"
              />
              {errors.artistName && <p className="text-red-400 text-base mt-3">{errors.artistName.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="firstName" className="text-white text-lg font-semibold mb-4 block">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                  placeholder="Your first name"
                />
                {errors.firstName && <p className="text-red-400 text-base mt-3">{errors.firstName.message}</p>}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-white text-lg font-semibold mb-4 block">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                  placeholder="Your last name"
                />
                {errors.lastName && <p className="text-red-400 text-base mt-3">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="email" className="text-white text-lg font-semibold mb-4 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-base mt-3">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="text-white text-lg font-semibold mb-4 block">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-red-400 text-base mt-3">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-white text-lg font-semibold mb-4 block">
                Location *
              </Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="City, State"
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
              />
              {errors.location && <p className="text-red-400 text-base mt-3">{errors.location.message}</p>}
            </div>
          </div>
        </div>

        {/* Musical Information */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Musical Information</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="genre" className="text-white text-lg font-semibold mb-4 block">
                  Primary Genre *
                </Label>
                <Select onValueChange={(value) => setValue("genre", value)}>
                  <SelectTrigger className="bg-navy border-navy-dark text-white h-14 text-lg rounded-lg">
                    <SelectValue placeholder="Select your primary genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-navy-dark text-white">
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                    <SelectItem value="rnb">R&B</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="folk">Folk</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="indie">Indie</SelectItem>
                    <SelectItem value="alternative">Alternative</SelectItem>
                    <SelectItem value="acoustic">Acoustic</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.genre && <p className="text-red-400 text-base mt-3">{errors.genre.message}</p>}
              </div>

              <div>
                <Label htmlFor="experience" className="text-white text-lg font-semibold mb-4 block">
                  Experience Level *
                </Label>
                <Select onValueChange={(value) => setValue("experience", value)}>
                  <SelectTrigger className="bg-navy border-navy-dark text-white h-14 text-lg rounded-lg">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-navy-dark text-white">
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                    <SelectItem value="professional">Professional (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && <p className="text-red-400 text-base mt-3">{errors.experience.message}</p>}
              </div>
            </div>

            <div>
              <Label className="text-white text-lg font-semibold mb-6 block">
                Instruments/Equipment (select all that apply)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipmentOptions.map((equipment) => (
                  <div
                    key={equipment}
                    className="flex items-center space-x-4 p-5 bg-navy/50 rounded-xl border border-navy-dark hover:border-orange/30 transition-colors"
                  >
                    <Checkbox
                      id={equipment}
                      checked={selectedEquipment.includes(equipment)}
                      onCheckedChange={(checked) => handleEquipmentChange(equipment, checked as boolean)}
                      className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange w-5 h-5"
                    />
                    <Label htmlFor={equipment} className="text-white text-base font-medium cursor-pointer">
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy/50 rounded-xl p-6 border border-navy-dark">
              <div className="flex items-center space-x-4">
                <Checkbox
                  id="hasOriginalMusic"
                  {...register("hasOriginalMusic")}
                  className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange w-5 h-5"
                />
                <Label htmlFor="hasOriginalMusic" className="text-white text-lg font-semibold cursor-pointer">
                  I perform original music
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white text-lg font-semibold mb-4 block">
                Artist Bio *
              </Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Tell us about your musical style, influences, and what makes you unique..."
                className="min-h-40 bg-navy border-navy-dark text-white placeholder:text-gray-400 text-lg rounded-lg resize-none"
              />
              {errors.bio && <p className="text-red-400 text-base mt-3">{errors.bio.message}</p>}
            </div>
          </div>
        </div>

        {/* Social Media & Links */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Social Media & Links</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div>
              <Label htmlFor="spotifyUrl" className="text-white text-lg font-semibold mb-4 block">
                Spotify Profile URL
              </Label>
              <Input
                id="spotifyUrl"
                {...register("spotifyUrl")}
                placeholder="https://open.spotify.com/artist/..."
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="instagramUrl" className="text-white text-lg font-semibold mb-4 block">
                Instagram Profile URL
              </Label>
              <Input
                id="instagramUrl"
                {...register("instagramUrl")}
                placeholder="https://instagram.com/yourusername"
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Performance History */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Performance History</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div>
              <Label htmlFor="performanceHistory" className="text-white text-lg font-semibold mb-4 block">
                Previous Performance Experience
              </Label>
              <Textarea
                id="performanceHistory"
                {...register("performanceHistory")}
                placeholder="List notable venues, events, or performances you've done..."
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 text-lg min-h-32 rounded-lg resize-none"
              />
            </div>

            <div>
              <Label htmlFor="availability" className="text-white text-lg font-semibold mb-4 block">
                Availability
              </Label>
              <Input
                id="availability"
                {...register("availability")}
                placeholder="e.g., Weekends only, Thursdays-Saturdays, etc."
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Review Process Information */}
        <div className="bg-orange/10 border-2 border-orange/30 rounded-xl p-8">
          <h3 className="text-xl font-bold text-orange mb-4">Review Process</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your application will be reviewed to protect the integrity of our platform and foster a strong community.
            You will be notified via email within 72 hours (usually same day) of your application status.
          </p>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange hover:bg-orange/90 text-navy font-bold px-20 py-6 text-xl rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? "Submitting Application..." : "Submit Artist Application"}
          </Button>
        </div>
      </form>
    </div>
  )
}

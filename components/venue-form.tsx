"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const venueApplicationSchema = z.object({
  venueName: z.string().min(1, "Venue name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  venueType: z.string().min(1, "Venue type is required"),
  capacity: z.string().min(1, "Capacity is required"),
  stageSetup: z.array(z.string()).min(1, "Select at least one stage/sound setup option"),
  showDays: z.string().min(1, "Typical show days is required"),
  compensationModel: z.string().min(1, "Compensation model is required"),
  bookingContactName: z.string().optional(),
  bookingContactEmail: z.string().optional(),
  bookingContactPhone: z.string().optional(),
  instagramHandle: z.string().optional(),
  website: z.string().optional(),
})

type VenueApplicationForm = z.infer<typeof venueApplicationSchema>

export function VenueForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedSetup, setSelectedSetup] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VenueApplicationForm>({
    resolver: zodResolver(venueApplicationSchema),
    defaultValues: {
      stageSetup: [],
    },
  })

  const stageSetupOptions = [
    "In-house PA System",
    "Backline Available",
    "Tech Support",
    "Lighting System",
    "Stage Manager",
    "Sound Engineer",
  ]

  const handleSetupChange = (setup: string, checked: boolean) => {
    const updated = checked ? [...selectedSetup, setup] : selectedSetup.filter((s) => s !== setup)
    setSelectedSetup(updated)
    setValue("stageSetup", updated)
  }

  const onSubmit = async (data: VenueApplicationForm) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("venueName", data.venueName)
      formData.append("contactName", data.contactName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("location", data.location)
      formData.append("venueType", data.venueType)
      formData.append("capacity", data.capacity)
      formData.append("stageSetup", data.stageSetup.join(", "))
      formData.append("showDays", data.showDays)
      formData.append("compensationModel", data.compensationModel)
      formData.append("bookingContactName", data.bookingContactName || "")
      formData.append("bookingContactEmail", data.bookingContactEmail || "")
      formData.append("bookingContactPhone", data.bookingContactPhone || "")
      formData.append("instagramHandle", data.instagramHandle || "")
      formData.append("website", data.website || "")
      formData.append("_subject", "New Venue Application")
      formData.append("form", "venue")

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
      console.error("Error submitting venue application:", error)
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
            Thank you for applying to join Level Play as a venue. We'll review your application and get back to you
            within 3-5 business days.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        {/* Venue Information */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Venue Information</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div>
              <Label htmlFor="venueName" className="text-white text-lg font-semibold mb-4 block">
                Venue Name *
              </Label>
              <Input
                id="venueName"
                {...register("venueName")}
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                placeholder="Your venue name"
              />
              {errors.venueName && <p className="text-red-400 text-base mt-3">{errors.venueName.message}</p>}
            </div>

            <div>
              <Label htmlFor="venuePhoto" className="text-white text-lg font-semibold mb-4 block">
                Venue Photo *
              </Label>
              <Input
                id="venuePhoto"
                type="file"
                accept="image/*"
                className="bg-navy border-navy-dark text-white file:bg-orange file:text-navy file:border-0 file:rounded-lg file:px-6 file:py-3 file:mr-6 file:font-semibold h-14 text-lg rounded-lg"
              />
              <p className="text-gray-400 text-base mt-3">Upload a high-quality image of your venue</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
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

              <div>
                <Label htmlFor="venueType" className="text-white text-lg font-semibold mb-4 block">
                  Venue Type *
                </Label>
                <Select onValueChange={(value) => setValue("venueType", value)}>
                  <SelectTrigger className="bg-navy border-navy-dark text-white h-14 text-lg rounded-lg">
                    <SelectValue placeholder="Select venue type" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-navy-dark text-white">
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="theater">Theater</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                    <SelectItem value="concert-hall">Concert Hall</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.venueType && <p className="text-red-400 text-base mt-3">{errors.venueType.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="capacity" className="text-white text-lg font-semibold mb-4 block">
                Capacity *
              </Label>
              <Input
                id="capacity"
                {...register("capacity")}
                placeholder="Maximum number of people"
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
              />
              {errors.capacity && <p className="text-red-400 text-base mt-3">{errors.capacity.message}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Contact Information</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="contactName" className="text-white text-lg font-semibold mb-4 block">
                  Contact Person Name *
                </Label>
                <Input
                  id="contactName"
                  {...register("contactName")}
                  className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                  placeholder="Your full name"
                />
                {errors.contactName && <p className="text-red-400 text-base mt-3">{errors.contactName.message}</p>}
              </div>

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
        </div>

        {/* Stage & Sound Setup */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Stage & Sound Setup</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div>
            <Label className="text-white text-lg font-semibold mb-6 block">
              Available Equipment * (select all that apply)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stageSetupOptions.map((setup) => (
                <div
                  key={setup}
                  className="flex items-center space-x-4 p-6 bg-navy/50 rounded-xl border border-navy-dark hover:border-orange/30 transition-colors"
                >
                  <Checkbox
                    id={setup}
                    checked={selectedSetup.includes(setup)}
                    onCheckedChange={(checked) => handleSetupChange(setup, checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-orange data-[state=checked]:border-orange w-5 h-5"
                  />
                  <Label htmlFor={setup} className="text-white text-base font-medium cursor-pointer">
                    {setup}
                  </Label>
                </div>
              ))}
            </div>
            {errors.stageSetup && <p className="text-red-400 text-base mt-3">{errors.stageSetup.message}</p>}
          </div>
        </div>

        {/* Booking Information */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Booking Information</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="showDays" className="text-white text-lg font-semibold mb-4 block">
                  Typical Show Days *
                </Label>
                <Input
                  id="showDays"
                  {...register("showDays")}
                  placeholder="e.g., Thursdays, Weekends only"
                  className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                />
                {errors.showDays && <p className="text-red-400 text-base mt-3">{errors.showDays.message}</p>}
              </div>

              <div>
                <Label htmlFor="compensationModel" className="text-white text-lg font-semibold mb-4 block">
                  Compensation Model *
                </Label>
                <Select onValueChange={(value) => setValue("compensationModel", value)}>
                  <SelectTrigger className="bg-navy border-navy-dark text-white h-14 text-lg rounded-lg">
                    <SelectValue placeholder="Select compensation model" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-navy-dark text-white">
                    <SelectItem value="flat-rate">Flat Rate</SelectItem>
                    <SelectItem value="door-split">Door Split</SelectItem>
                    <SelectItem value="bar-split">Bar % Split</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                  </SelectContent>
                </Select>
                {errors.compensationModel && (
                  <p className="text-red-400 text-base mt-3">{errors.compensationModel.message}</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-8">Booking Contact (if different from main contact)</h4>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <Label htmlFor="bookingContactName" className="text-white text-lg font-semibold mb-4 block">
                    Booking Contact Name
                  </Label>
                  <Input
                    id="bookingContactName"
                    {...register("bookingContactName")}
                    className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <Label htmlFor="bookingContactEmail" className="text-white text-lg font-semibold mb-4 block">
                    Booking Contact Email
                  </Label>
                  <Input
                    id="bookingContactEmail"
                    type="email"
                    {...register("bookingContactEmail")}
                    className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                    placeholder="contact@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="bookingContactPhone" className="text-white text-lg font-semibold mb-4 block">
                    Booking Contact Phone
                  </Label>
                  <Input
                    id="bookingContactPhone"
                    {...register("bookingContactPhone")}
                    className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Website */}
        <div className="bg-navy-light/30 rounded-xl p-12">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Online Presence</h3>
            <div className="w-24 h-1 bg-orange rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="instagramHandle" className="text-white text-lg font-semibold mb-4 block">
                Instagram Handle
              </Label>
              <Input
                id="instagramHandle"
                {...register("instagramHandle")}
                placeholder="@yourvenue"
                className="bg-navy border-navy-dark text-white placeholder:text-gray-400 h-14 text-lg rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="website" className="text-white text-lg font-semibold mb-4 block">
                Website
              </Label>
              <Input
                id="website"
                {...register("website")}
                placeholder="https://yourvenue.com"
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
            {isSubmitting ? "Submitting Application..." : "Submit Venue Application"}
          </Button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react" // Added useEffect
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, InfoIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context" // For auth check
import Link from "next/link" // For sign-in link
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const venueBookingFormSchema = z.object({
  artistName: z.string(), // Pre-filled
  selectedVenue: z.string().min(1, { message: "Please select your venue." }),
  requestedDate: z.date({
    required_error: "A date is required.",
  }),
  messageToArtist: z
    .string()
    .min(10, { message: "Please provide a brief message or offer details (min 10 characters)." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
})

type VenueBookingFormValues = z.infer<typeof venueBookingFormSchema>

interface VenueBookingFormProps {
  artistName: string
  onClose: () => void
  initialDate?: Date // New prop for pre-selected date
}

export function VenueBookingForm({ artistName, onClose, initialDate }: VenueBookingFormProps) {
  const { user, profile, loadingAuth } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<VenueBookingFormValues>({
    resolver: zodResolver(venueBookingFormSchema),
    defaultValues: {
      artistName: artistName,
      selectedVenue: "",
      requestedDate: initialDate, // Set initial date here
      messageToArtist: "",
    },
  })

  // Watch for changes in initialDate to update form if modal reopens with new date
  useEffect(() => {
    if (initialDate) {
      form.setValue("requestedDate", initialDate, { shouldValidate: true, shouldDirty: true })
    }
  }, [initialDate, form])

  const onSubmit = async (values: VenueBookingFormValues) => {
    setIsSubmitting(true)
    console.log("Venue booking artist:", values)
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Booking Inquiry Sent!",
        description: `Your request to book ${artistName} for ${format(values.requestedDate, "PPP")} has been sent.`,
      })
      setIsSuccess(true)
      // onClose(); // Or let the success message handle closing
    } catch (error) {
      toast({
        title: "Error Sending Inquiry",
        description: "There was a problem sending your booking inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loadingAuth) {
    return <div className="p-6 text-center text-white">Loading authentication...</div>
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <Alert variant="default" className="bg-navy-light border-orange text-white">
          <InfoIcon className="h-4 w-4 text-orange" />
          <AlertTitle className="text-orange">Authentication Required</AlertTitle>
          <AlertDescription>
            Please{" "}
            <Link href="/sign-in" className="underline hover:text-orange-hover">
              sign in
            </Link>{" "}
            to book an artist.
          </AlertDescription>
        </Alert>
        <Button onClick={onClose} variant="outline" className="mt-4 rounded-full">
          Close
        </Button>
      </div>
    )
  }

  if (profile && profile.role !== "venue") {
    return (
      <div className="p-6 text-center">
        <Alert variant="default" className="bg-navy-light border-orange text-white">
          <InfoIcon className="h-4 w-4 text-orange" />
          <AlertTitle className="text-orange">Venues Only</AlertTitle>
          <AlertDescription>
            Only registered venues can book artists. If you represent a venue, please ensure you are signed in with your
            venue account. Artists can apply to venues via the venue's profile page.
          </AlertDescription>
        </Alert>
        <Button onClick={onClose} variant="outline" className="mt-4 rounded-full">
          Close
        </Button>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-bold text-white mb-4">Booking Inquiry Sent!</h3>
        <p className="text-gray-300 mb-6">
          Your request to book {artistName} has been successfully sent. The artist will be notified.
        </p>
        <Button onClick={onClose} className="rounded-full">
          Close
        </Button>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white">Book {artistName}</h2>
        <p className="text-gray-300">You're about to send a booking inquiry to {artistName}.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="artistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Artist</FormLabel>
                <FormControl>
                  <Input {...field} readOnly disabled className="bg-navy-lighter border-navy-light text-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedVenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Your Venue *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-navy border-navy-light focus:border-orange text-white">
                      <SelectValue placeholder="Select your venue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-navy-light border-navy text-white">
                    {/* This should ideally be populated with the logged-in venue's actual venues */}
                    <SelectItem value="my-venue-1">My Venue 1 (Example)</SelectItem>
                    <SelectItem value="my-venue-2">My Venue 2 (Example)</SelectItem>
                    <SelectItem value="newport-music-hall">Newport Music Hall</SelectItem>
                    <SelectItem value="ar-music-bar">A&R Music Bar</SelectItem>
                    <SelectItem value="the-basement">The Basement</SelectItem>
                    <SelectItem value="kemba-live">KEMBA Live!</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-gray-400">Which of your venues is this booking for?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requestedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Proposed Date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-navy border-navy-light hover:bg-navy-light text-white",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Select a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-navy-dark border-navy-light" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                      initialFocus={!initialDate} // Only initialFocus if no date was pre-selected
                      className="bg-navy rounded-md"
                      classNames={{
                        caption_label: "text-white",
                        day: "text-white hover:bg-orange hover:text-navy-dark",
                        day_selected: "bg-orange text-navy-dark hover:bg-orange hover:text-navy-dark",
                        day_today: "text-orange",
                        day_disabled: "text-gray-600",
                        head_cell: "text-gray-300",
                        nav_button: "text-white hover:bg-navy-light",
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="messageToArtist"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message / Offer to Artist *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Hi ${artistName}, we'd love to book you for an event at our venue... (include any specific offer details, tech requirements discussion, etc.)`}
                    className="min-h-[100px] bg-navy border-navy-light focus:border-orange text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancel
            </Button>
            <Button type="submit" className="rounded-full bg-orange hover:bg-orange-hover" disabled={isSubmitting}>
              {isSubmitting ? "Sending Inquiry..." : "Send Booking Inquiry"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

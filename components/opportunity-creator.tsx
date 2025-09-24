"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { createOpportunityAction } from "@/app/admin-dashboard/actions"
import { toast } from "@/hooks/use-toast"

const opportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  setLength: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  applicationDeadline: z.string().optional(),
  isUrgent: z.boolean().optional(),
})

type OpportunityFormData = z.infer<typeof opportunitySchema>

interface OpportunityCreatorProps {
  userRole: "admin" | "venue"
  venueOptions?: { id: string; name: string }[]
  onOpportunityCreated?: () => void
}

export function OpportunityCreator({ userRole, venueOptions = [], onOpportunityCreated }: OpportunityCreatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      location: "Columbus, OH",
      isUrgent: false,
    },
  })

  const availableGenres = [
    "Rock",
    "Pop",
    "Hip-Hop",
    "R&B",
    "Electronic",
    "Jazz",
    "Folk",
    "Country",
    "Metal",
    "Indie",
    "Alternative",
    "Blues",
    "Reggae",
    "Punk",
    "Classical",
  ]

  const typeOptions = ["Supporting", "Headliner", "Open Mic", "Festival", "Private Event", "Showcase"]

  const today = new Date().toISOString().split("T")[0]

  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre))
  }

  const onSubmit = async (data: OpportunityFormData) => {
    if (new Date(data.date) < new Date(today)) {
      toast({
        title: "Error",
        description: "Event date cannot be in the past.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const result = await createOpportunityAction({
        title: data.title,
        venue_name: data.venue,
        location: data.location,
        event_date: data.date,
        event_time: data.time || "",
        opportunity_type: data.type,
        set_length: data.setLength || "",
        description: data.description,
        application_deadline: data.applicationDeadline || "",
        genres: selectedGenres,
        status: "active",
        venue_id: null,
        compensation: "",
        requirements: "",
        city: data.location.split(",")[0].trim(),
        state: data.location.split(",")[1]?.trim() || "OH",
      })

      if (result.success) {
        // Forward to Formspree for admin review in bootstrap flow (non-blocking)
        try {
          const fd = new FormData()
          fd.append("form", "opportunity")
          fd.append("_subject", `New Opportunity: ${data.title}`)
          fd.append("title", data.title)
          fd.append("venue", data.venue)
          fd.append("location", data.location)
          fd.append("date", data.date)
          if (data.time) fd.append("time", data.time)
          fd.append("type", data.type)
          if (data.setLength) fd.append("setLength", data.setLength)
          fd.append("description", data.description)
          if (data.applicationDeadline) fd.append("applicationDeadline", data.applicationDeadline)
          fd.append("genres", selectedGenres.join(", "))
          await fetch("/api/formspree", { method: "POST", body: fd })
        } catch (e) {
          console.warn("Failed to forward opportunity to Formspree (continuing):", e)
        }

        toast({ title: "Success", description: "Opportunity created successfully!" })
        reset()
        setSelectedGenres([])
        setIsOpen(false)
        onOpportunityCreated?.()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create opportunity",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating opportunity:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange" />
            Create New Opportunity
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-white">
              Title *
            </Label>
            <Input
              id="title"
              {...register("title")}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="e.g., Friday Night Show"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Venue */}
          <div>
            <Label htmlFor="venue" className="text-white">
              Venue *
            </Label>
            <Input
              id="venue"
              {...register("venue")}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="e.g., Newport Music Hall"
            />
            {errors.venue && <p className="text-red-400 text-sm mt-1">{errors.venue.message}</p>}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-white">
              Location *
            </Label>
            <Input
              id="location"
              {...register("location")}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Columbus, OH"
            />
            {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-white">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                min={today}
                {...register("date")}
                className="bg-gray-800 border-gray-600 text-white"
              />
              {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <Label htmlFor="time" className="text-white">
                Time
              </Label>
              <Input id="time" type="time" {...register("time")} className="bg-gray-800 border-gray-600 text-white" />
            </div>
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type" className="text-white">
              Type *
            </Label>
            <Select onValueChange={(value) => setValue("type", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 text-white">
                {typeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>}
          </div>

          {/* Genres */}
          <div>
            <Label className="text-white mb-2 block">Genres</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedGenres.map((genre) => (
                <Badge key={genre} className="bg-orange/20 text-orange border-none">
                  {genre}
                  <button onClick={() => removeGenre(genre)} className="ml-2 hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {availableGenres
                .filter((g) => !selectedGenres.includes(g))
                .map((genre) => (
                  <Button
                    key={genre}
                    type="button"
                    onClick={() => addGenre(genre)}
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-600 text-gray-300 hover:bg-orange hover:text-navy"
                  >
                    {genre}
                  </Button>
                ))}
            </div>
          </div>

          {/* Set Length */}
          <div>
            <Label htmlFor="setLength" className="text-white">
              Set Length
            </Label>
            <Input
              id="setLength"
              {...register("setLength")}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="e.g., 30 minutes, 1 hour"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white">
              Description *
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
              placeholder="Describe the opportunity..."
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Application Deadline */}
          <div>
            <Label htmlFor="applicationDeadline" className="text-white">
              Application Deadline
            </Label>
            <Input
              id="applicationDeadline"
              type="date"
              min={today}
              {...register("applicationDeadline")}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          {/* Is Urgent */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isUrgent"
              onCheckedChange={(checked) => setValue("isUrgent", !!checked)}
              className="border-gray-600"
            />
            <Label htmlFor="isUrgent" className="text-white">
              Mark as urgent
            </Label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isSubmitting ? "Creating..." : "Create Opportunity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

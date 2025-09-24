"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Loader2, FileText } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

const dealMemoSchema = z.object({
  artist_id: z.string().min(1, "Artist is required"),
  show_date: z.string().min(1, "Show date is required"),
  venue_name: z.string().min(1, "Venue name is required"),
  billing_percentage: z.number().min(0).max(100),
  deal_type: z.enum(["guarantee", "percentage", "hybrid"]),
  guarantee_amount: z.number().min(0).optional(),
  percentage_split: z.number().min(0).max(100).optional(),
  ticket_price_advance: z.number().min(0),
  ticket_price_day_of: z.number().min(0),
  advance_fees_included: z.boolean().default(false),
  day_of_fees_included: z.boolean().default(false),
  sellable_capacity: z.number().min(1),
  comp_tickets: z.number().min(0),
  merch_rate: z.number().min(0).max(100),
  age_restrictions: z.string().optional(),
  payment_method: z.string().min(1, "Payment method is required"),
  w9_required: z.boolean().default(false),
  advance_contact: z.string().optional(),
  ticketing_contact: z.string().optional(),
  marketing_contact: z.string().optional(),
  load_in_time: z.string().optional(),
  soundcheck_time: z.string().optional(),
  door_time: z.string().optional(),
  stage_time: z.string().optional(),
  curfew_time: z.string().optional(),
  additional_notes: z.string().optional(),
})

type DealMemoFormData = z.infer<typeof dealMemoSchema>

interface Artist {
  id: string
  name: string
  email: string
}

export function DealMemoBuilder() {
  const { profile } = useAuth()
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DealMemoFormData>({
    resolver: zodResolver(dealMemoSchema),
    defaultValues: {
      billing_percentage: 0,
      deal_type: "guarantee",
      guarantee_amount: 0,
      percentage_split: 0,
      ticket_price_advance: 0,
      ticket_price_day_of: 0,
      advance_fees_included: false,
      day_of_fees_included: false,
      sellable_capacity: 0,
      comp_tickets: 0,
      merch_rate: 0,
      w9_required: false,
    },
  })

  const dealType = watch("deal_type")

  // Fetch approved artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, email")
          .eq("role", "artist")
          .eq("status", "approved")
          .order("name")

        if (error) {
          console.error("Error fetching artists:", error)
          toast({
            title: "Error",
            description: "Failed to load artists",
            variant: "destructive",
          })
          return
        }

        setArtists(data || [])
      } catch (error) {
        console.error("Unexpected error fetching artists:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  // Check if user is admin
  if (profile?.role !== "admin") {
    return (
      <Card className="bg-navy-light border-navy">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-white mb-2">Access Denied</p>
            <p className="text-gray-400">Only administrators can access the Deal Memo Builder.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const onSubmit = async (data: DealMemoFormData) => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("deal_memos").insert([
        {
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error("Error creating deal memo:", error)
        toast({
          title: "Error",
          description: "Failed to create deal memo. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Deal memo created successfully!",
      })

      // Reset form
      reset()
    } catch (error) {
      console.error("Unexpected error creating deal memo:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while creating deal memo",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-navy-light border-navy">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading artists...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-navy-light border-navy">
      <CardHeader>
        <CardTitle className="text-white">Deal Memo Builder</CardTitle>
        <p className="text-gray-400">Create deal memos for booked artists</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Artist Selection */}
          <div>
            <Label htmlFor="artist_id" className="text-white">
              Artist *
            </Label>
            <Select onValueChange={(value) => setValue("artist_id", value)}>
              <SelectTrigger className="bg-navy border-navy-dark text-white mt-1">
                <SelectValue placeholder="Select an artist" />
              </SelectTrigger>
              <SelectContent className="bg-navy border-navy-dark text-white">
                {artists.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id}>
                    {artist.name} ({artist.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.artist_id && <p className="text-red-400 text-sm mt-1">{errors.artist_id.message}</p>}
          </div>

          {/* Show Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Show Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="show_date" className="text-white">
                  Show Date *
                </Label>
                <Input
                  id="show_date"
                  type="date"
                  {...register("show_date")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
                {errors.show_date && <p className="text-red-400 text-sm mt-1">{errors.show_date.message}</p>}
              </div>
              <div>
                <Label htmlFor="venue_name" className="text-white">
                  Venue Name *
                </Label>
                <Input
                  id="venue_name"
                  {...register("venue_name")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
                {errors.venue_name && <p className="text-red-400 text-sm mt-1">{errors.venue_name.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="billing_percentage" className="text-white">
                Billing Percentage (%)
              </Label>
              <Input
                id="billing_percentage"
                type="number"
                min="0"
                max="100"
                {...register("billing_percentage", { valueAsNumber: true })}
                className="bg-navy border-navy-dark text-white mt-1"
              />
            </div>
          </div>

          {/* Deal Points */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Deal Points</h3>
            <div>
              <Label htmlFor="deal_type" className="text-white">
                Deal Type *
              </Label>
              <Select onValueChange={(value) => setValue("deal_type", value as any)} defaultValue="guarantee">
                <SelectTrigger className="bg-navy border-navy-dark text-white mt-1">
                  <SelectValue placeholder="Select deal type" />
                </SelectTrigger>
                <SelectContent className="bg-navy border-navy-dark text-white">
                  <SelectItem value="guarantee">Guarantee</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="hybrid">Hybrid (Guarantee + Percentage)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {(dealType === "guarantee" || dealType === "hybrid") && (
                <div>
                  <Label htmlFor="guarantee_amount" className="text-white">
                    Guarantee Amount ($)
                  </Label>
                  <Input
                    id="guarantee_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    {...register("guarantee_amount", { valueAsNumber: true })}
                    className="bg-navy border-navy-dark text-white mt-1"
                  />
                </div>
              )}
              {(dealType === "percentage" || dealType === "hybrid") && (
                <div>
                  <Label htmlFor="percentage_split" className="text-white">
                    Percentage Split (%)
                  </Label>
                  <Input
                    id="percentage_split"
                    type="number"
                    min="0"
                    max="100"
                    {...register("percentage_split", { valueAsNumber: true })}
                    className="bg-navy border-navy-dark text-white mt-1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Ticketing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Ticketing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticket_price_advance" className="text-white">
                  Advance Ticket Price ($)
                </Label>
                <Input
                  id="ticket_price_advance"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("ticket_price_advance", { valueAsNumber: true })}
                  className="bg-navy border-navy-dark text-white"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="advance_fees_included"
                    {...register("advance_fees_included")}
                    className="border-gray-400"
                  />
                  <Label htmlFor="advance_fees_included" className="text-sm text-gray-300">
                    Fees included in price
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket_price_day_of" className="text-white">
                  Day-of Ticket Price ($)
                </Label>
                <Input
                  id="ticket_price_day_of"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("ticket_price_day_of", { valueAsNumber: true })}
                  className="bg-navy border-navy-dark text-white"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="day_of_fees_included"
                    {...register("day_of_fees_included")}
                    className="border-gray-400"
                  />
                  <Label htmlFor="day_of_fees_included" className="text-sm text-gray-300">
                    Fees included in price
                  </Label>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sellable_capacity" className="text-white">
                  Sellable Capacity *
                </Label>
                <Input
                  id="sellable_capacity"
                  type="number"
                  min="1"
                  {...register("sellable_capacity", { valueAsNumber: true })}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
                {errors.sellable_capacity && (
                  <p className="text-red-400 text-sm mt-1">{errors.sellable_capacity.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="comp_tickets" className="text-white">
                  Comp Tickets
                </Label>
                <Input
                  id="comp_tickets"
                  type="number"
                  min="0"
                  {...register("comp_tickets", { valueAsNumber: true })}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="merch_rate" className="text-white">
                  Merch Rate (%)
                </Label>
                <Input
                  id="merch_rate"
                  type="number"
                  min="0"
                  max="100"
                  {...register("merch_rate", { valueAsNumber: true })}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
            </div>
          </div>

          {/* Additional Terms */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Additional Terms</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age_restrictions" className="text-white">
                  Age Restrictions
                </Label>
                <Input
                  id="age_restrictions"
                  placeholder="e.g., 21+, All Ages"
                  {...register("age_restrictions")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="payment_method" className="text-white">
                  Payment Method *
                </Label>
                <Input
                  id="payment_method"
                  placeholder="e.g., Check, Venmo, Bank Transfer"
                  {...register("payment_method")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
                {errors.payment_method && <p className="text-red-400 text-sm mt-1">{errors.payment_method.message}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="w9_required" {...register("w9_required")} className="border-gray-400" />
              <Label htmlFor="w9_required" className="text-white">
                W-9 Required
              </Label>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contacts</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="advance_contact" className="text-white">
                  Advance Contact
                </Label>
                <Input
                  id="advance_contact"
                  placeholder="Name & contact info"
                  {...register("advance_contact")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ticketing_contact" className="text-white">
                  Ticketing Contact
                </Label>
                <Input
                  id="ticketing_contact"
                  placeholder="Name & contact info"
                  {...register("ticketing_contact")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="marketing_contact" className="text-white">
                  Marketing Contact
                </Label>
                <Input
                  id="marketing_contact"
                  placeholder="Name & contact info"
                  {...register("marketing_contact")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
            </div>
          </div>

          {/* Event Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Event Schedule</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="load_in_time" className="text-white">
                  Load-in Time
                </Label>
                <Input
                  id="load_in_time"
                  type="time"
                  {...register("load_in_time")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="soundcheck_time" className="text-white">
                  Soundcheck Time
                </Label>
                <Input
                  id="soundcheck_time"
                  type="time"
                  {...register("soundcheck_time")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="door_time" className="text-white">
                  Door Time
                </Label>
                <Input
                  id="door_time"
                  type="time"
                  {...register("door_time")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="stage_time" className="text-white">
                  Stage Time
                </Label>
                <Input
                  id="stage_time"
                  type="time"
                  {...register("stage_time")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="curfew_time" className="text-white">
                  Curfew Time
                </Label>
                <Input
                  id="curfew_time"
                  type="time"
                  {...register("curfew_time")}
                  className="bg-navy border-navy-dark text-white mt-1"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="additional_notes" className="text-white">
              Additional Notes
            </Label>
            <Textarea
              id="additional_notes"
              {...register("additional_notes")}
              className="bg-navy border-navy-dark text-white mt-1"
              placeholder="Any additional terms, requirements, or notes..."
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="bg-orange hover:bg-orange/90 text-navy">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Deal Memo
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

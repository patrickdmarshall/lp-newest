"use client"

import { useState } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Save, Send, CheckCircle, AlertCircle, User, Mail, Phone } from "lucide-react"

const dealMemoSchema = z.object({
  // Event Details
  eventTitle: z.string().min(1, "Event title is required"),
  venue: z.string().min(1, "Venue is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  loadInTime: z.string().optional(),
  soundCheckTime: z.string().optional(),

  // Artist Details
  artistName: z.string().min(1, "Artist name is required"),
  artistEmail: z.string().email("Valid email is required"),
  artistPhone: z.string().min(10, "Phone number is required"),

  // Production Contact (NEW)
  productionContactName: z.string().min(1, "Production contact name is required"),
  productionContactEmail: z.string().email("Valid production contact email is required"),
  productionContactPhone: z.string().min(10, "Production contact phone is required"),
  productionContactRole: z.string().min(1, "Production contact role is required"),

  // Performance Details
  setLength: z.string().min(1, "Set length is required"),
  genre: z.string().min(1, "Genre is required"),
  compensation: z.number().min(0, "Compensation must be 0 or greater"),
  paymentMethod: z.enum(["cash", "check", "bank_transfer", "paypal"]),
  paymentTiming: z.enum(["day_of_show", "within_7_days", "within_30_days"]),

  // Technical Requirements
  backlineProvided: z.boolean(),
  soundEngineerProvided: z.boolean(),
  lightingProvided: z.boolean(),
  additionalTechRequirements: z.string().optional(),

  // Terms and Conditions
  cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
  additionalTerms: z.string().optional(),

  // Marketing
  promotionRequirements: z.string().optional(),
  socialMediaRequirements: z.string().optional(),

  // Special Notes
  specialNotes: z.string().optional(),
})

type DealMemoForm = z.infer<typeof dealMemoSchema>

interface DealMemoEditorProps {
  initialData?: Partial<DealMemoForm>
  onSave?: (data: DealMemoForm) => Promise<void>
  onSend?: (data: DealMemoForm) => Promise<void>
  isEditing?: boolean
}

export function DealMemoEditor({ initialData, onSave, onSend, isEditing = false }: DealMemoEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DealMemoForm>({
    resolver: zodResolver(dealMemoSchema),
    defaultValues: {
      backlineProvided: true,
      soundEngineerProvided: true,
      lightingProvided: true,
      compensation: 0,
      paymentMethod: "cash",
      paymentTiming: "day_of_show",
      ...initialData,
    },
  })

  const handleSave = async (data: DealMemoForm) => {
    if (!onSave) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      await onSave(data)
      setSaveStatus("success")
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendMemo = async (data: DealMemoForm) => {
    if (!onSend) return

    setIsSending(true)
    setSendStatus("idle")

    try {
      await onSend(data)
      setSendStatus("success")
    } catch (error) {
      setSendStatus("error")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#ff6b35]" />
            {isEditing ? "Edit Deal Memo" : "Create Deal Memo"}
          </h1>
          <p className="text-gray-400">Create a comprehensive deal memo for the artist and production team</p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Event Details */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventTitle" className="text-white">
                  Event Title *
                </Label>
                <Input
                  id="eventTitle"
                  {...register("eventTitle")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="Friday Night Live"
                />
                {errors.eventTitle && <p className="text-red-400 text-sm mt-1">{errors.eventTitle.message}</p>}
              </div>

              <div>
                <Label htmlFor="venue" className="text-white">
                  Venue *
                </Label>
                <Input
                  id="venue"
                  {...register("venue")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="The Basement"
                />
                {errors.venue && <p className="text-red-400 text-sm mt-1">{errors.venue.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate" className="text-white">
                  Event Date *
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  {...register("eventDate")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
                {errors.eventDate && <p className="text-red-400 text-sm mt-1">{errors.eventDate.message}</p>}
              </div>

              <div>
                <Label htmlFor="eventTime" className="text-white">
                  Event Time *
                </Label>
                <Input
                  id="eventTime"
                  type="time"
                  {...register("eventTime")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
                {errors.eventTime && <p className="text-red-400 text-sm mt-1">{errors.eventTime.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loadInTime" className="text-white">
                  Load-In Time
                </Label>
                <Input
                  id="loadInTime"
                  type="time"
                  {...register("loadInTime")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              </div>

              <div>
                <Label htmlFor="soundCheckTime" className="text-white">
                  Sound Check Time
                </Label>
                <Input
                  id="soundCheckTime"
                  type="time"
                  {...register("soundCheckTime")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artist Details */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Artist Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="artistName" className="text-white">
                Artist/Band Name *
              </Label>
              <Input
                id="artistName"
                {...register("artistName")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Artist Name"
              />
              {errors.artistName && <p className="text-red-400 text-sm mt-1">{errors.artistName.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="artistEmail" className="text-white">
                  Artist Email *
                </Label>
                <Input
                  id="artistEmail"
                  type="email"
                  {...register("artistEmail")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="artist@example.com"
                />
                {errors.artistEmail && <p className="text-red-400 text-sm mt-1">{errors.artistEmail.message}</p>}
              </div>

              <div>
                <Label htmlFor="artistPhone" className="text-white">
                  Artist Phone *
                </Label>
                <Input
                  id="artistPhone"
                  {...register("artistPhone")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="(555) 123-4567"
                />
                {errors.artistPhone && <p className="text-red-400 text-sm mt-1">{errors.artistPhone.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Production Contact (NEW SECTION) */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Production Contact
            </CardTitle>
            <p className="text-gray-400 text-sm">
              This contact will handle production coordination, advances, and day-of-show logistics. The artist will
              only receive this contact information, not the booker's direct contact.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productionContactName" className="text-white">
                  Production Contact Name *
                </Label>
                <Input
                  id="productionContactName"
                  {...register("productionContactName")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="John Smith"
                />
                {errors.productionContactName && (
                  <p className="text-red-400 text-sm mt-1">{errors.productionContactName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="productionContactRole" className="text-white">
                  Role/Title *
                </Label>
                <Input
                  id="productionContactRole"
                  {...register("productionContactRole")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="Production Manager"
                />
                {errors.productionContactRole && (
                  <p className="text-red-400 text-sm mt-1">{errors.productionContactRole.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productionContactEmail" className="text-white">
                  Production Contact Email *
                </Label>
                <Input
                  id="productionContactEmail"
                  type="email"
                  {...register("productionContactEmail")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="production@venue.com"
                />
                {errors.productionContactEmail && (
                  <p className="text-red-400 text-sm mt-1">{errors.productionContactEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="productionContactPhone" className="text-white">
                  Production Contact Phone *
                </Label>
                <Input
                  id="productionContactPhone"
                  {...register("productionContactPhone")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="(555) 987-6543"
                />
                {errors.productionContactPhone && (
                  <p className="text-red-400 text-sm mt-1">{errors.productionContactPhone.message}</p>
                )}
              </div>
            </div>

            <Alert className="bg-blue-500/20 border-blue-500">
              <Mail className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-400 text-sm">
                <strong>Important:</strong> The production contact will be the artist's primary point of contact for
                show coordination, payment advances, and technical requirements. This protects the booker's direct
                contact information while ensuring smooth communication.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Performance Details */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white">Performance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="setLength" className="text-white">
                  Set Length *
                </Label>
                <Input
                  id="setLength"
                  {...register("setLength")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="45 minutes"
                />
                {errors.setLength && <p className="text-red-400 text-sm mt-1">{errors.setLength.message}</p>}
              </div>

              <div>
                <Label htmlFor="genre" className="text-white">
                  Genre *
                </Label>
                <Input
                  id="genre"
                  {...register("genre")}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="Hip-Hop"
                />
                {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>}
              </div>

              <div>
                <Label htmlFor="compensation" className="text-white">
                  Compensation *
                </Label>
                <Input
                  id="compensation"
                  type="number"
                  {...register("compensation", { valueAsNumber: true })}
                  className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                  placeholder="500"
                />
                {errors.compensation && <p className="text-red-400 text-sm mt-1">{errors.compensation.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentMethod" className="text-white">
                  Payment Method *
                </Label>
                <Select onValueChange={(value) => setValue("paymentMethod", value as any)}>
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentTiming" className="text-white">
                  Payment Timing *
                </Label>
                <Select onValueChange={(value) => setValue("paymentTiming", value as any)}>
                  <SelectTrigger className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]">
                    <SelectValue placeholder="Select payment timing" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2f46] border-[#3a3f56] text-white">
                    <SelectItem value="day_of_show">Day of Show</SelectItem>
                    <SelectItem value="within_7_days">Within 7 Days</SelectItem>
                    <SelectItem value="within_30_days">Within 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Requirements */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white">Technical Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="backlineProvided"
                  {...register("backlineProvided")}
                  className="border-[#3a3f56] data-[state=checked]:bg-[#ff6b35] data-[state=checked]:border-[#ff6b35]"
                />
                <Label htmlFor="backlineProvided" className="text-white">
                  Backline provided by venue
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="soundEngineerProvided"
                  {...register("soundEngineerProvided")}
                  className="border-[#3a3f56] data-[state=checked]:bg-[#ff6b35] data-[state=checked]:border-[#ff6b35]"
                />
                <Label htmlFor="soundEngineerProvided" className="text-white">
                  Sound engineer provided by venue
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lightingProvided"
                  {...register("lightingProvided")}
                  className="border-[#3a3f56] data-[state=checked]:bg-[#ff6b35] data-[state=checked]:border-[#ff6b35]"
                />
                <Label htmlFor="lightingProvided" className="text-white">
                  Lighting provided by venue
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalTechRequirements" className="text-white">
                Additional Technical Requirements
              </Label>
              <Textarea
                id="additionalTechRequirements"
                {...register("additionalTechRequirements")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Any special equipment, setup requirements, or technical notes..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cancellationPolicy" className="text-white">
                Cancellation Policy *
              </Label>
              <Textarea
                id="cancellationPolicy"
                {...register("cancellationPolicy")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Cancellation must be made 48 hours in advance..."
              />
              {errors.cancellationPolicy && (
                <p className="text-red-400 text-sm mt-1">{errors.cancellationPolicy.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="additionalTerms" className="text-white">
                Additional Terms
              </Label>
              <Textarea
                id="additionalTerms"
                {...register("additionalTerms")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Any additional terms and conditions..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Marketing Requirements */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white">Marketing & Promotion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="promotionRequirements" className="text-white">
                Promotion Requirements
              </Label>
              <Textarea
                id="promotionRequirements"
                {...register("promotionRequirements")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Artist must promote show on social media, share event posts..."
              />
            </div>

            <div>
              <Label htmlFor="socialMediaRequirements" className="text-white">
                Social Media Requirements
              </Label>
              <Textarea
                id="socialMediaRequirements"
                {...register("socialMediaRequirements")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Tag venue in posts, use event hashtags..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Special Notes */}
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white">Special Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="specialNotes" className="text-white">
                Special Notes
              </Label>
              <Textarea
                id="specialNotes"
                {...register("specialNotes")}
                className="bg-[#2a2f46] border-[#3a3f56] text-white focus:border-[#ff6b35]"
                placeholder="Any special instructions, notes, or important information..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            onClick={handleSubmit(handleSave)}
            disabled={isSaving}
            className="bg-[#2a2f46] hover:bg-[#3a3f56] text-white border border-[#3a3f56] flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>

          <Button
            type="button"
            onClick={handleSubmit(handleSendMemo)}
            disabled={isSending}
            className="bg-[#ff6b35] hover:bg-[#e55a2b] text-[#1a1f36] flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? "Sending..." : "Send Deal Memo"}
          </Button>
        </div>

        {/* Status Messages */}
        {saveStatus === "success" && (
          <Alert className="bg-green-500/20 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-400">
              <strong>Deal memo saved successfully!</strong>
              <br />
              You can continue editing or send it to the artist.
            </AlertDescription>
          </Alert>
        )}

        {sendStatus === "success" && (
          <Alert className="bg-green-500/20 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-400">
              <strong>Deal memo sent successfully!</strong>
              <br />
              The artist and production contact have been notified via email.
            </AlertDescription>
          </Alert>
        )}

        {(saveStatus === "error" || sendStatus === "error") && (
          <Alert className="bg-red-500/20 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">
              <strong>Error processing deal memo.</strong>
              <br />
              Please try again or contact support if the problem persists.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  )
}

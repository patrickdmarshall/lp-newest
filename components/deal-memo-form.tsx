"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DealMemoData {
  id: string
  venue: string
  artist: string
  opportunity: string
  dealType: "guarantee" | "percentage" | "hybrid"
  guaranteeAmount: string
  percentageSlip: string
  advanceFeesIncluded: boolean
  dayOfFeesIncluded: boolean
  sellableCapacity: string
  compTickets: string
  w9Required: boolean
  merchRate: string
  loadInTime: string
  doorTime: string
  showDate: string
  soundcheckTime: string
  stageTime: string
  productionContact: string
  billingPercentage: string
  status: "pending" | "sent" | "signed"
  dealPoints: string
  createdAt: string
}

interface DealMemoFormProps {
  memo?: DealMemoData
  onSave: (memo: DealMemoData) => void
  onCancel: () => void
  isEditing?: boolean
}

export function DealMemoForm({ memo, onSave, onCancel, isEditing = false }: DealMemoFormProps) {
  const [formData, setFormData] = useState<DealMemoData>({
    id: memo?.id || "",
    venue: memo?.venue || "",
    artist: memo?.artist || "",
    opportunity: memo?.opportunity || "",
    dealType: memo?.dealType || "guarantee",
    guaranteeAmount: memo?.guaranteeAmount || "",
    percentageSlip: memo?.percentageSlip || "",
    advanceFeesIncluded: memo?.advanceFeesIncluded || false,
    dayOfFeesIncluded: memo?.dayOfFeesIncluded || false,
    sellableCapacity: memo?.sellableCapacity || "",
    compTickets: memo?.compTickets || "",
    w9Required: memo?.w9Required || false,
    merchRate: memo?.merchRate || "",
    loadInTime: memo?.loadInTime || "",
    doorTime: memo?.doorTime || "",
    showDate: memo?.showDate || "",
    soundcheckTime: memo?.soundcheckTime || "",
    stageTime: memo?.stageTime || "",
    productionContact: memo?.productionContact || "",
    billingPercentage: memo?.billingPercentage || "",
    status: memo?.status || "pending",
    dealPoints: memo?.dealPoints || "",
    createdAt: memo?.createdAt || new Date().toISOString(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const memoToSave = {
      ...formData,
      id: formData.id || Date.now().toString(),
      createdAt: formData.createdAt || new Date().toISOString(),
    }

    onSave(memoToSave)
  }

  const updateField = (field: keyof DealMemoData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="bg-navy border-navy-dark">
        <CardHeader>
          <CardTitle className="text-white text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="venue" className="text-gray-300">
                Venue
              </Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => updateField("venue", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="Enter venue name"
                required
              />
            </div>
            <div>
              <Label htmlFor="artist" className="text-gray-300">
                Artist
              </Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => updateField("artist", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="Enter artist name"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="opportunity" className="text-gray-300">
              Opportunity
            </Label>
            <Input
              id="opportunity"
              value={formData.opportunity}
              onChange={(e) => updateField("opportunity", e.target.value)}
              className="bg-navy-light border-navy-dark text-white"
              placeholder="Enter opportunity name"
              required
            />
          </div>

          <div>
            <Label htmlFor="showDate" className="text-gray-300">
              Show Date
            </Label>
            <Input
              id="showDate"
              type="date"
              value={formData.showDate}
              onChange={(e) => updateField("showDate", e.target.value)}
              className="bg-navy-light border-navy-dark text-white"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Deal Terms */}
      <Card className="bg-navy border-navy-dark">
        <CardHeader>
          <CardTitle className="text-white text-lg">Deal Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dealType" className="text-gray-300">
              Deal Type
            </Label>
            <Select value={formData.dealType} onValueChange={(value) => updateField("dealType", value)}>
              <SelectTrigger className="bg-navy-light border-navy-dark text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-navy-light border-navy-dark">
                <SelectItem value="guarantee">Guarantee</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guaranteeAmount" className="text-gray-300">
                Guarantee Amount ($)
              </Label>
              <Input
                id="guaranteeAmount"
                value={formData.guaranteeAmount}
                onChange={(e) => updateField("guaranteeAmount", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="percentageSlip" className="text-gray-300">
                Percentage Split (%)
              </Label>
              <Input
                id="percentageSlip"
                value={formData.percentageSlip}
                onChange={(e) => updateField("percentageSlip", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="advanceFeesIncluded"
                checked={formData.advanceFeesIncluded}
                onCheckedChange={(checked) => updateField("advanceFeesIncluded", checked as boolean)}
              />
              <Label htmlFor="advanceFeesIncluded" className="text-gray-300">
                Advance Fees Included
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dayOfFeesIncluded"
                checked={formData.dayOfFeesIncluded}
                onCheckedChange={(checked) => updateField("dayOfFeesIncluded", checked as boolean)}
              />
              <Label htmlFor="dayOfFeesIncluded" className="text-gray-300">
                Day of Fees Included
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Venue Details */}
      <Card className="bg-navy border-navy-dark">
        <CardHeader>
          <CardTitle className="text-white text-lg">Venue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sellableCapacity" className="text-gray-300">
                Sellable Capacity
              </Label>
              <Input
                id="sellableCapacity"
                value={formData.sellableCapacity}
                onChange={(e) => updateField("sellableCapacity", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="compTickets" className="text-gray-300">
                Comp Tickets
              </Label>
              <Input
                id="compTickets"
                value={formData.compTickets}
                onChange={(e) => updateField("compTickets", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="merchRate" className="text-gray-300">
                Merch Rate (%)
              </Label>
              <Input
                id="merchRate"
                value={formData.merchRate}
                onChange={(e) => updateField("merchRate", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="w9Required"
              checked={formData.w9Required}
              onCheckedChange={(checked) => updateField("w9Required", checked as boolean)}
            />
            <Label htmlFor="w9Required" className="text-gray-300">
              W-9 Required
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card className="bg-navy border-navy-dark">
        <CardHeader>
          <CardTitle className="text-white text-lg">Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="loadInTime" className="text-gray-300">
                Load In Time
              </Label>
              <Input
                id="loadInTime"
                type="time"
                value={formData.loadInTime}
                onChange={(e) => updateField("loadInTime", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
              />
            </div>
            <div>
              <Label htmlFor="doorTime" className="text-gray-300">
                Door Time
              </Label>
              <Input
                id="doorTime"
                type="time"
                value={formData.doorTime}
                onChange={(e) => updateField("doorTime", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
              />
            </div>
            <div>
              <Label htmlFor="soundcheckTime" className="text-gray-300">
                Soundcheck Time
              </Label>
              <Input
                id="soundcheckTime"
                type="time"
                value={formData.soundcheckTime}
                onChange={(e) => updateField("soundcheckTime", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
              />
            </div>
            <div>
              <Label htmlFor="stageTime" className="text-gray-300">
                Stage Time
              </Label>
              <Input
                id="stageTime"
                type="time"
                value={formData.stageTime}
                onChange={(e) => updateField("stageTime", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts & Additional Info */}
      <Card className="bg-navy border-navy-dark">
        <CardHeader>
          <CardTitle className="text-white text-lg">Contacts & Additional Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productionContact" className="text-gray-300">
                Production Contact
              </Label>
              <Input
                id="productionContact"
                value={formData.productionContact}
                onChange={(e) => updateField("productionContact", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="Contact name"
              />
            </div>
            <div>
              <Label htmlFor="billingPercentage" className="text-gray-300">
                Billing Percentage (%)
              </Label>
              <Input
                id="billingPercentage"
                value={formData.billingPercentage}
                onChange={(e) => updateField("billingPercentage", e.target.value)}
                className="bg-navy-light border-navy-dark text-white"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dealPoints" className="text-gray-300">
              Deal Points
            </Label>
            <Textarea
              id="dealPoints"
              value={formData.dealPoints}
              onChange={(e) => updateField("dealPoints", e.target.value)}
              className="bg-navy-light border-navy-dark text-white"
              placeholder="Enter any special terms, requirements, or notes..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-navy-dark text-gray-300 hover:bg-navy bg-transparent"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-orange hover:bg-orange/90 text-white">
          {isEditing ? "Update" : "Create"} & Export PDF
        </Button>
      </div>
    </form>
  )
}

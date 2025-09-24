"use client"

import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"

interface InitialDateSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onDateSelect: (date: Date) => void
  artistName?: string // Optional, for better dialog title
}

export function InitialDateSelectionModal({
  isOpen,
  onClose,
  onDateSelect,
  artistName,
}: InitialDateSelectionModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDateSelectAndProceed = () => {
    if (selectedDate) {
      onDateSelect(selectedDate)
      // onClose(); // The parent component will close this and open the next modal
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-navy-dark border-navy-light text-white">
        <DialogHeader>
          <DialogTitle>Select a Date to Book {artistName || "Artist"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose your preferred date for the performance.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date)
              if (date) {
                // Automatically proceed if a date is selected
                onDateSelect(date)
              }
            }}
            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} // Disable past dates
            initialFocus
            className="bg-navy rounded-md" // Match theme
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
        </div>
        {/* Optional: Add a confirm button if auto-proceed on select is not desired
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="rounded-full">Cancel</Button>
          <Button onClick={handleDateSelectAndProceed} disabled={!selectedDate} className="rounded-full">
            Next
          </Button>
        </DialogFooter>
        */}
      </DialogContent>
    </Dialog>
  )
}

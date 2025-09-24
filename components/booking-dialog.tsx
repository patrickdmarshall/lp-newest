"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArtistBookingForm } from "@/components/artist-booking-form"
import { VenueBookingForm } from "@/components/venue-booking-form"

interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
  artistName?: string
  venueName?: string
  type: "artist" | "venue"
}

export function BookingDialog({ isOpen, onClose, artistName = "", venueName = "", type }: BookingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-navy-light border-navy max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">{type === "venue" ? "Book This Artist" : "Book This Venue"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {type === "venue"
              ? "Fill out the form below to request a booking with this artist."
              : "Fill out the form below to request a booking at this venue."}
          </DialogDescription>
        </DialogHeader>

        {type === "venue" ? (
          <VenueBookingForm artistName={artistName} onClose={onClose} />
        ) : (
          <ArtistBookingForm venueName={venueName} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}

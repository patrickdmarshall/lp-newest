import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArtistBookingForm } from "@/components/artist-booking-form"

export default function KembaLiveApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />
      <main className="flex-1">
        <ArtistBookingForm venueName="Kemba Live" venueId="kemba-live" />
      </main>
      <Footer />
    </div>
  )
}

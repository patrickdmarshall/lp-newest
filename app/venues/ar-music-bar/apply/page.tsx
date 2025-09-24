import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArtistBookingForm } from "@/components/artist-booking-form"

export default function ARMusicBarApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />
      <main className="flex-1">
        <ArtistBookingForm venueName="A&R Music Bar" venueId="ar-music-bar" />
      </main>
      <Footer />
    </div>
  )
}

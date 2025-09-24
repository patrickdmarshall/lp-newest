import OpportunitiesClientPage from "./OpportunitiesClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Performance Opportunities - Columbus Music Venues | Level Play",
  description:
    "Discover live music performance opportunities at Columbus's top venues. Apply for gigs, find supporting slots, and headliner opportunities. Join Level Play to advance your music career.",
  keywords: [
    "Columbus music gigs",
    "Ohio performance opportunities",
    "music venue bookings",
    "live music jobs Columbus",
    "artist opportunities Ohio",
    "music venue applications",
    "Columbus concert bookings",
    "music industry jobs",
  ],
  openGraph: {
    title: "Performance Opportunities - Columbus Music Venues",
    description:
      "Discover live music performance opportunities at Columbus's top venues. Apply for gigs and advance your music career.",
    url: "https://www.levelplay.co/opportunities",
  },
}

export default function OpportunitiesPage() {
  return <OpportunitiesClientPage />
}

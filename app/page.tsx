import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Level Play - Columbus Music Venue & Artist Booking Platform",
  description:
    "Connect with Columbus's top music venues and talented artists. Level Play is the premier platform for booking live music performances, finding gigs, and growing your music career in Ohio.",
  keywords: [
    "Columbus music booking",
    "Ohio music venues",
    "artist booking platform",
    "live music Columbus",
    "music gigs Ohio",
    "venue booking system",
    "Columbus entertainment",
    "music industry platform",
  ],
  openGraph: {
    title: "Level Play - Columbus Music Venue & Artist Booking Platform",
    description:
      "Connect with Columbus's top music venues and talented artists. Find performance opportunities and grow your music career.",
    url: "https://www.levelplay.co",
    type: "website",
  },
}

export default function HomePage() {
  redirect("/maintenance")
}

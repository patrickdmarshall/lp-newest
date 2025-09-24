import { notFound } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { VenueProfileLayout } from "@/components/venue-profile-layout"

const venues = {
  "the-basement": {
    id: "the-basement",
    name: "The Basement",
    description:
      "An intimate underground venue in the heart of Columbus, The Basement has been showcasing emerging and established artists for over a decade. Known for its exceptional acoustics and cozy atmosphere, it's the perfect place for artists to connect with their audience.",
    location: "Columbus, OH",
    capacity: 300,
    image: "/images/the-basement-new.jpg",
    genres: ["Indie", "Alternative", "Folk", "Singer-Songwriter"],
    amenities: [
      "Professional Sound System",
      "Stage Lighting",
      "Green Room",
      "Full Bar",
      "Merchandise Table",
      "Parking Available",
    ],
    opportunities: [], // No current opportunities
  },
  "ar-music-bar": {
    id: "ar-music-bar",
    name: "A&R Music Bar",
    description:
      "A&R Music Bar is Columbus's premier destination for live music, craft cocktails, and culinary excellence. Located in the vibrant Short North Arts District, we feature both emerging local talent and established touring acts across multiple genres. Our state-of-the-art sound system and intimate atmosphere create the perfect setting for unforgettable performances.",
    location: "Columbus, OH",
    capacity: 400,
    image: "/images/ar-music-bar-new.jpg",
    genres: ["Rock", "Pop", "R&B", "Hip-Hop", "Electronic"],
    amenities: [
      "Full Kitchen & Craft Cocktail Bar",
      "Professional Audio/Visual System",
      "LED Stage Lighting",
      "Dance Floor",
      "VIP Seating Area",
      "Green Room",
      "Merchandise Sales Area",
      "Street Parking & Nearby Garages",
    ],
    opportunities: [], // Will be populated by component
  },
  "newport-music-hall": {
    id: "newport-music-hall",
    name: "Newport Music Hall",
    description:
      "One of Columbus's most iconic venues, Newport Music Hall has hosted legendary acts since 1970. With its historic charm, excellent acoustics, and balcony viewing area, it's a dream venue for any serious musician looking to perform on a stage with decades of musical history.",
    location: "Columbus, OH",
    capacity: 1400,
    image: "/images/newport-music-hall-new.jpg",
    genres: ["Rock", "Metal", "Punk", "Alternative", "Electronic"],
    amenities: [
      "Historic Venue with Rich Musical Heritage",
      "Professional Lighting Rig",
      "Balcony Viewing Area",
      "Full Production Support",
      "Artist Hospitality Suite",
      "Merchandise Sales Area",
      "Ample Parking",
    ],
    opportunities: [], // Will be populated by component
  },
  "kemba-live": {
    id: "kemba-live",
    name: "KEMBA Live!",
    description:
      "Columbus's premier indoor/outdoor amphitheater, KEMBA Live! offers an unparalleled concert experience with both intimate indoor shows and large-scale outdoor festivals. With a capacity of 2,100 indoors and 4,500 outdoors, it's perfect for artists ready to take their performance to the next level and reach larger audiences.",
    location: "Columbus, OH",
    capacity: "2,100 Indoor / 4,500 Outdoor",
    image: "/images/kemba-live-new.jpg",
    genres: ["All Genres", "Festival Style", "Electronic", "Hip-Hop", "Rock"],
    amenities: [
      "Indoor/Outdoor Amphitheater",
      "Festival-Grade Sound System",
      "LED Video Walls",
      "Multiple VIP Areas",
      "Full Food & Beverage Service",
      "Artist Hospitality Complex",
      "Large Parking Lot",
    ],
    opportunities: [], // No current opportunities
  },
}

interface VenuePageProps {
  params: {
    slug: string
  }
}

export default function VenuePage({ params }: VenuePageProps) {
  const venue = venues[params.slug as keyof typeof venues]

  if (!venue) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1 pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <VenueProfileLayout venue={venue} opportunities={venue.opportunities} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(venues).map((slug) => ({
    slug,
  }))
}

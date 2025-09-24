import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Music } from "lucide-react"
import Link from "next/link"

const venue = {
  name: "KEMBA Live!",
  location: "Columbus, OH",
  description:
    "Columbus' premier outdoor amphitheater, offering an unparalleled concert experience under the stars. With its expansive lawn and covered pavilion, KEMBA Live! hosts major touring acts and festivals.",
  image: "/images/kemba-live-new.jpg",
  capacity: "2,100 Indoor / 4,500 Outdoor",
  genres: ["Rock", "Pop", "Country", "Hip-Hop", "Electronic", "Alternative"],
  amenities: [
    "Outdoor Amphitheater",
    "Covered Pavilion",
    "Lawn Seating",
    "Multiple Concession Stands",
    "VIP Boxes",
    "Parking",
  ],
  photos: ["/images/kemba-live-new.jpg"],
}

export default function KembaLivePage() {
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <Image src={venue.image || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{venue.name}</h1>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-orange" />
              <span>{venue.location}</span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-orange" />
                <span>{venue.capacity} capacity</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white">About The Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{venue.description}</p>
              </CardContent>
            </Card>

            {/* Genres & Amenities */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Music className="h-5 w-5 text-orange" />
                    Preferred Genres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {venue.genres.map((genre) => (
                      <Badge key={genre} className="bg-orange/20 text-orange border-none">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {venue.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-gray-300">
                        <div className="h-2 w-2 bg-orange rounded-full" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white">Perform Here</CardTitle>
                <CardDescription className="text-gray-400">Apply for opportunities at {venue.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Check out our current opportunities and submit your application through our platform.
                </p>
                <Link href="/opportunities">
                  <Button className="w-full bg-orange hover:bg-orange/90 text-navy">View Opportunities</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white">Venue Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Capacity</span>
                  <span className="text-white font-semibold">{venue.capacity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white font-semibold">{venue.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

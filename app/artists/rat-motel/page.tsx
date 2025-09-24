import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Music, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RatMotelPage() {
  const artist = {
    name: "Rat Motel",
    profile_picture: "/images/rat-motel.webp",
    location: "Columbus, OH",
    genres: ["Rock"],
    bio: 'Rat Motel is the Columbus-born buzz rock duo of Seth and Clayton Peacock. The brothers released their debut album in 2023, cementing their droney, artfully orchestrated nightscapes and massive, dual-cylinder live sets as an integral part of Ohio\'s rock scene. The band went on to open for The Beths, Pile, The Dirty Nil, and Twen among others, playing support as well as headlining shows across the Midwest and East Coast. They will host their fourth annual RATFEST music festival in Columbus this summer. Now half-based in Brooklyn, Rat Motel returns with their latest single, "The Pile."',
    notable_shows: [
      "Opened for The Beths",
      "Opened for Pile",
      "Opened for The Dirty Nil",
      "Opened for Twen",
      "Host of annual RATFEST music festival",
    ],
    social_links: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/ratmotel/",
        icon: Instagram,
        colorClass: "text-pink-400",
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/artist/1MaudIlmXk99BWvcMmSsp3?si=j_ysWz2iTiSwkGiEvg6MXw",
        icon: Music,
        colorClass: "text-green-400",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image src={artist.profile_picture || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{artist.name}</h1>
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{artist.location}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {artist.genres.map((genre, index) => (
                  <Badge key={index} className="bg-orange text-white border-none">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                  <p className="text-gray-300 leading-relaxed">{artist.bio}</p>
                </CardContent>
              </Card>

              {/* Notable Shows */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-white">Notable Shows</h2>
                    <Badge className="bg-orange/20 text-orange border-orange text-xs">BETA</Badge>
                  </div>
                  <ul className="space-y-2">
                    {artist.notable_shows.map((show, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange mt-1">•</span>
                        {show}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Connect */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                  <div className="space-y-3">
                    {artist.social_links.map((link, index) => {
                      const IconComponent = link.icon
                      return (
                        <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-3 bg-transparent border-navy-dark text-white hover:bg-navy hover:border-orange"
                          >
                            <IconComponent className={`h-5 w-5 ${link.colorClass}`} />
                            {link.platform}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Book This Artist */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Book This Artist</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Interested in booking {artist.name} for your venue or event?
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-white">Get in Touch</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

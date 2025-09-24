"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Music, Instagram, ExternalLink } from "lucide-react"

export default function CherimondisJPage() {
  const artist = {
    name: "Cherimondis J",
    location: "Columbus, OH",
    genres: ["Noir Neo Soul"],
    bio: "Cherimondis J is a captivating noir neo soul artist from Columbus, Ohio. With a distinctive sound that blends dark, atmospheric elements with soulful melodies, Cherimondis J creates music that is both haunting and beautiful, establishing a unique presence in the neo soul scene.",
    profile_picture: "/images/cherimondis-j.jpg",
    social_links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/artist/cherimondis-j",
        followers: "1.2K",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/cherimondisj",
        followers: "2.8K",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div
          className="relative h-96 md:h-[500px] bg-cover bg-center bg-no-repeat flex items-end p-6"
          style={{ backgroundImage: `url(${artist.profile_picture})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{artist.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-orange" />
              <span className="text-lg">{artist.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre, index) => (
                <Badge key={index} className="bg-orange/20 text-orange border-none">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 md:px-6 py-8 space-y-8">
          {/* About Section */}
          <Card className="bg-navy-light border-navy">
            <CardHeader>
              <CardTitle className="text-white text-xl">About {artist.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{artist.bio}</p>
            </CardContent>
          </Card>

          {/* Notable Shows Section */}
          <Card className="bg-navy-light border-navy">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                Notable Shows
                <Badge className="bg-orange/20 text-orange border-none text-xs">BETA</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-300 space-y-2">
                <li>• Soul Sessions Columbus - Featured Performance</li>
                <li>• The Basement - Intimate Set</li>
                <li>• Neo Soul Showcase - Headliner</li>
              </ul>
            </CardContent>
          </Card>

          {/* Connect Section */}
          <Card className="bg-navy-light border-navy">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Music className="h-5 w-5 text-orange" />
                Connect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artist.social_links.map((link, index) => {
                  const IconComponent = link.platform === "Spotify" ? Music : Instagram
                  const colorClass = link.platform === "Spotify" ? "text-green-400" : "text-pink-400"

                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-navy rounded-lg hover:bg-navy-dark transition-colors group border border-navy-dark hover:border-orange/30"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-6 w-6 ${colorClass}`} />
                        <div>
                          <div className="text-white font-medium">{link.platform}</div>
                          <div className="text-gray-400 text-sm">{link.followers} followers</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-orange transition-colors" />
                    </a>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

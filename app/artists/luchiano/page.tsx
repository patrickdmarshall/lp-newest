"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Music, Instagram, ExternalLink } from "lucide-react"

export default function LuchianoPage() {
  const artist = {
    name: "LUCHIANO",
    location: "Nashville, TN",
    genres: ["Alternative"],
    bio: "LUCHIANO is an alternative artist from Nashville, Tennessee, known for his distinctive sound and artistic vision. With a style that blends alternative rock with experimental elements, LUCHIANO creates music that pushes boundaries while remaining accessible, establishing himself as an innovative force in the alternative scene.",
    profile_picture: "/images/luchiano.jpeg",
    social_links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/artist/luchiano",
        followers: "5.3K",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/luchiano",
        followers: "7.8K",
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
                <li>• The Basement East - Featured Performance</li>
                <li>• Exit/In - Alternative Showcase</li>
                <li>• Nashville Alternative Festival - Rising Artist</li>
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

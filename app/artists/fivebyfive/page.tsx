import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Music, Instagram } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ExternalLink } from "@/components/ui/external-link"

const artist = {
  id: "24",
  name: "FiveByFive",
  slug: "fivebyfive",
  profile_picture: "/metal-band-silhouette.png",
  location: "Columbus, OH",
  genres: ["Metal"],
  bio: 'FivebyFive is a gritty, dynamic 5 piece combining genres like nu-metal, trap, hardcore and pop to create an electrifying sound that is compared to the feeling of getting the right hook. With a strong emphasis on powerful lyrics, hard hitting riffs and infectious hooks, FivebyFive delivers raw and honest portrayals of their personal experiences. Tackling heavier themes of mental health, addiction and societal struggles while also exploring the lighter side of life and the more fun times. Their music serves as a cathartic outlet for both band and fan, fostering a sense of unity under the motto "Fight for what you believe in" Having shared the stage with renowned acts such as Dropout Kings, Nekrogoblikon and Everclear. FivebyFive has proven their ability to captivate crowds of all sizes with high energy performances and connecting with people on a deeper level, creating an unforgettable musical experience.',
  notable_shows: ["Shared stage with Dropout Kings", "Performance with Nekrogoblikon", "Opened for Everclear"],
  social_links: [
    {
      platform: "Instagram",
      url: "https://www.instagram.com/fivebyfiveoh/?hl=en",
      icon: Instagram,
      colorClass: "text-pink-400",
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/artist/1EzbSIgxt91vHZgFsLNFfW?si=1yPR_fVBTN6HE_dNfXF-xg",
      icon: Music,
      colorClass: "text-green-400",
    },
  ],
}

export default function FiveByFivePage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-b from-navy-dark to-navy">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container px-4 md:px-6 h-full flex items-center">
            <div className="flex items-center gap-8">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-orange">
                <Image
                  src={artist.profile_picture || "/placeholder.svg"}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{artist.name}</h1>
                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{artist.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {artist.genres.map((genre, index) => (
                    <Badge key={index} className="bg-orange/20 text-orange border-orange/30 text-sm">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{artist.bio}</p>
                </CardContent>
              </Card>

              {/* Notable Shows */}
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-2">
                    Notable Shows
                    <Badge className="bg-orange/20 text-orange border-none text-xs">BETA</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {artist.notable_shows.map((show, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange mt-1">•</span>
                        <span>{show}</span>
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
                <CardHeader>
                  <CardTitle className="text-white text-xl">Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {artist.social_links.map((link, index) => {
                    const IconComponent = link.icon
                    return (
                      <ExternalLink
                        key={index}
                        href={link.url}
                        className="flex items-center gap-3 p-3 rounded-lg bg-navy hover:bg-navy-dark transition-colors group"
                      >
                        <IconComponent className={`h-5 w-5 ${link.colorClass}`} />
                        <span className="text-gray-300 group-hover:text-white">{link.platform}</span>
                      </ExternalLink>
                    )
                  })}
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

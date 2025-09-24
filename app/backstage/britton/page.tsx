"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Instagram, Music } from "lucide-react"
import Link from "next/link"

export default function BrittonPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div
          className="relative h-[600px] md:h-[700px] bg-contain bg-no-repeat bg-center flex items-end"
          style={{
            backgroundImage: "url('/images/britton.jpg')",
            backgroundColor: "#1a1f2e",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          <div className="relative z-10 container px-4 md:px-6 pb-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Britton</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">Brand President & Co-Founder</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange text-white border-none px-4 py-2">Brand President</Badge>
                <Badge className="bg-navy-light text-white border-navy px-4 py-2">Co-Founder</Badge>
                <Badge className="bg-navy-light text-white border-navy px-4 py-2">Promotion Specialist</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-navy py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* About Section */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">About Britton</h2>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                      Britton is the Brand President and co-founder of Level Play. Britton, admittedly, can't play any
                      instruments, he can't sing, and he doesn't know anything about music theory – but when he hears
                      something special, he shares it with anyone that will listen. Working in live entertainment
                      promotions since 2012, Britton has a saying he often shares with artists he admires who are
                      chasing a seemingly impossible dream, "a bet on a hard worker is always a safe bet, but when they
                      are talented it's a perfect storm."
                    </p>
                    <p>
                      Britton firmly believes that artists, no matter how small or ambitious their goals may be, should
                      spend most of their time working hard on their craft and less time figuring out how to share it
                      with their communities, surrounding areas and the world. If your net worth is your network, he
                      wants to connect you with all the amazing people he has met in this industry.
                    </p>
                    <p>
                      Level Play was a brainchild built from roadblocks he has heard from artists over the years and a
                      need to help bridge the gaps between artist and industry. Level Play isn't a guarantee for
                      success; it's a tool to make things just a little bit easier to break through! It's a tool to
                      bring people together, to sing, to dance and to celebrate the joys of life music has brought him
                      in abundance. Level Play is a love letter to the artists, venues and fans that never want the
                      music to end – this platform is his encore for "the scene."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Platform & Leadership Section */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Platform & Leadership</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-orange mb-2">Artist Development</h3>
                      <p className="text-gray-300">
                        Strategist of artist profiles that can help set themselves apart in a crowded and competitive
                        landscape and providing tips and tricks from promotion to negotiation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-orange mb-2">Venue Liaison</h3>
                      <p className="text-gray-300">
                        Providing venues an easy way to discover new talent, book more shows and nurture fans of spaces
                        as much as artists.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Stats */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Platform Stats</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange mb-2">13+</div>
                      <div className="text-gray-300">Years Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white mb-2">Brand President</div>
                      <div className="text-gray-300">Role</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white mb-2">Promotion</div>
                      <div className="text-gray-300">Specialty</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connect Section */}
              <Card className="bg-navy-light border-navy">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Connect</h2>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="https://instagram.com/doctor_dove"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-full transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>@doctor_dove</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://open.spotify.com/playlist/2ZZpvrUzzepCmMlIwkT9EG?si=9f6b7b6ccf3344fc&nd=1&dlsi=a880022277464c66"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors"
                    >
                      <Music className="h-5 w-5" />
                      <span>Credo</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
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

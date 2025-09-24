"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Featured opportunities for the homepage - these are mock/example opportunities
const featuredOpportunities = [
  {
    id: "1",
    title: "Friday Night Live",
    venue: {
      name: "A&R Music Bar",
      location: "Columbus, OH",
      image: "/images/ar-music-bar-new.jpg",
    },
    description: "Join us for our weekly Friday Night Live series featuring emerging rock and alternative acts.",
  },
  {
    id: "3",
    title: "Metal Mayhem",
    venue: {
      name: "Newport Music Hall",
      location: "Columbus, OH",
      image: "/images/newport-music-hall-new.jpg",
    },
    description: "Heavy music showcase at Columbus's most iconic venue.",
  },
  {
    id: "4",
    title: "Summer Festival Kickoff",
    venue: {
      name: "KEMBA Live!",
      location: "Columbus, OH",
      image: "/images/kemba-live-new.jpg",
    },
    description: "Kick off the summer festival season at Columbus's premier outdoor venue.",
  },
]

export function OpportunitiesSection() {
  return (
    <section className="py-20 bg-navy-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Opportunities</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sign up to unlock exclusive performance opportunities at Columbus's top venues
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredOpportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="bg-navy border-navy hover:border-orange/50 transition-colors overflow-hidden group relative"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={opportunity.venue.image || "/placeholder.svg"}
                  alt={opportunity.venue.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange text-navy font-semibold">Featured</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold text-lg">{opportunity.venue.name}</h4>
                  <p className="text-sm opacity-90">{opportunity.venue.location}</p>
                </div>
              </div>

              {/* Blurred Content Overlay */}
              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-sm bg-navy/60 z-10 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <p className="text-sm mb-2">Sign up to view details</p>
                    <Link href="/sign-up">
                      <Button size="sm" className="bg-orange hover:bg-orange/90 text-navy">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-xl">{opportunity.title}</CardTitle>
                  <CardDescription className="text-gray-300 line-clamp-2">{opportunity.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Blurred placeholder content */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="h-4 w-4 bg-orange/50 rounded"></div>
                      <span className="text-white font-medium">••• ••</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="h-4 w-4 bg-orange/50 rounded"></div>
                      <span className="text-white font-medium">•••</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-orange/20 text-orange border-none text-xs opacity-50">•••••</Badge>
                    <Badge className="bg-orange/20 text-orange border-none text-xs opacity-50">•••••</Badge>
                  </div>

                  <Button className="w-full bg-orange/50 text-navy opacity-50 cursor-not-allowed" disabled>
                    Sign Up to Apply
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/sign-up">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-navy">
              Sign Up to View All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

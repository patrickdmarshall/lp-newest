"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Phone, Mail, Globe, Calendar, Music, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { VenueOpportunities } from "@/components/venue-opportunities"

export default function NewportMusicHallPage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/newport-music-hall-new.jpg"
          alt="Newport Music Hall"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Newport Music Hall</h1>
                <div className="flex items-center gap-4 text-white/90 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-orange text-orange" />
                    <span className="font-semibold">4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>Columbus, OH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>1,400 capacity</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-orange/20 text-orange border-none">Rock</Badge>
                  <Badge className="bg-orange/20 text-orange border-none">Alternative</Badge>
                  <Badge className="bg-orange/20 text-orange border-none">Metal</Badge>
                </div>
              </div>
              <Link href="/venues/newport-music-hall/apply">
                <Button className="bg-orange hover:bg-orange/90 text-navy font-semibold px-8 py-3">
                  Apply to Perform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="h-5 w-5 text-orange" />
                  About Newport Music Hall
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Newport Music Hall has been the cornerstone of Columbus' music scene for decades. This historic venue
                  has hosted legendary performances and continues to be a premier destination for both emerging and
                  established artists.
                </p>
                <p>
                  With its intimate atmosphere and world-class sound system, Newport Music Hall provides an unparalleled
                  live music experience. The venue's rich history and commitment to showcasing diverse musical talent
                  makes it a must-play destination for artists looking to connect with passionate music fans.
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white">Venue Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-orange rounded-full" />
                      <span>World-Class Sound System</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-orange rounded-full" />
                      <span>Professional Lighting</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-orange rounded-full" />
                      <span>Multiple Bars</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-orange rounded-full" />
                      <span>VIP Areas</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-orange rounded-full" />
                      <span>Artist Green Room</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-orange rounded-full" />
                      <span>Merchandise Area</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Opportunities Section */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange" />
                  Performance Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <VenueOpportunities venueSlug="newport-music-hall" />
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <h3 className="text-2xl font-semibold text-white">Want to See Performance Opportunities?</h3>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                      Sign in to view current performance opportunities at Newport Music Hall and apply directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <Link href="/sign-in" className="flex-1">
                        <Button className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold py-3">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/contact" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-3 bg-transparent"
                        >
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-orange" />
                  <div>
                    <p className="font-medium text-white">Address</p>
                    <p>1722 N High St, Columbus, OH 43201</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 text-orange" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p>(614) 294-1659</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-orange" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p>booking@newportmusichall.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe className="h-5 w-5 text-orange" />
                  <div>
                    <p className="font-medium text-white">Website</p>
                    <a
                      href="https://www.newportmusichall.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange hover:text-orange/80 transition-colors"
                    >
                      newportmusichall.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="bg-navy-light border-navy">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange" />
                  Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Monday - Thursday</span>
                  <span>7:00 PM - 2:00 AM</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Friday - Saturday</span>
                  <span>7:00 PM - 2:30 AM</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Sunday</span>
                  <span>7:00 PM - 12:00 AM</span>
                </div>
                <p className="text-sm text-gray-400 mt-3">*Hours may vary based on events</p>
              </CardContent>
            </Card>

            {/* Quick Apply */}
            <Card className="bg-gradient-to-br from-orange/20 to-orange/10 border-orange/30">
              <CardHeader>
                <CardTitle className="text-white">Ready to Perform?</CardTitle>
                <CardDescription className="text-gray-300">
                  Submit your application to perform at Newport Music Hall
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/venues/newport-music-hall/apply">
                  <Button className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold">Apply Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

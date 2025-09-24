"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Music, MapPin, Calendar, Users } from "lucide-react"

export function PathwaysSection() {
  return (
    <section className="py-16 md:py-24 bg-navy-light">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">
            How <span className="text-orange">Level Play</span> Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We connect artists and venues through a streamlined platform that makes booking shows simple and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-navy border-navy-dark">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Create Profile</h3>
              <p className="text-gray-300 text-sm">
                Artists and venues create detailed profiles showcasing their style, experience, and preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy border-navy-dark">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Discover Opportunities</h3>
              <p className="text-gray-300 text-sm">
                Browse available venues and performance opportunities that match your style and location.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy border-navy-dark">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Apply & Connect</h3>
              <p className="text-gray-300 text-sm">
                Submit applications with your music, bio, and availability. Venues review and respond directly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-navy border-navy-dark">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Book Shows</h3>
              <p className="text-gray-300 text-sm">
                Finalize details, sign agreements, and get ready to perform at amazing venues across Columbus.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

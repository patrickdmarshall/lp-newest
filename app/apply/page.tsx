"use client"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Building2, Users, Calendar, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Join Level Play</h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect artists and venues across Columbus. Whether you're looking to book shows or find talent, Level
              Play is your gateway to the local music scene.
            </p>
          </div>
        </section>

        {/* Application Options */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Artist Application */}
              <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange/30 transition-colors">
                    <Music className="h-10 w-10 text-orange" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-3">Apply as an Artist</CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Showcase your talent and connect with venues looking for live music
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="h-5 w-5 text-orange" />
                      <span>Build your fanbase</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="h-5 w-5 text-orange" />
                      <span>Book more shows</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Star className="h-5 w-5 text-orange" />
                      <span>Get discovered by venues</span>
                    </div>
                  </div>

                  <Link href="/apply/artist" className="block">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold py-3 group-hover:shadow-lg transition-all">
                      Apply as Artist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Venue Application */}
              <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange/30 transition-colors">
                    <Building2 className="h-10 w-10 text-orange" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-3">Apply as a Venue</CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Find talented artists and fill your calendar with great live music
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Music className="h-5 w-5 text-orange" />
                      <span>Discover new talent</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="h-5 w-5 text-orange" />
                      <span>Fill your event calendar</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Star className="h-5 w-5 text-orange" />
                      <span>Connect with local artists</span>
                    </div>
                  </div>

                  <Link href="/apply/venue" className="block">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold py-3 group-hover:shadow-lg transition-all">
                      Apply as Venue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 md:px-6 bg-navy-light/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Application Process</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Get started in minutes with our streamlined application process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fill Application</h3>
                <p className="text-gray-400">Complete our simple application form with your details</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quick Review</h3>
                <p className="text-gray-400">We review applications within 24-48 hours</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Start Connecting</h3>
                <p className="text-gray-400">Get approved and start booking shows or finding talent</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

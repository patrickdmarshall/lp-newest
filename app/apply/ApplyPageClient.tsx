"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArtistSignUpForm } from "@/components/artist-sign-up-form"
import { VenueSignUpForm } from "@/components/venue-sign-up-form"

export default function ApplyPageClient() {
  return (
    <main className="flex-1">
      {" "}
      {/* Changed min-h-screen to flex-1 to allow Footer to be at bottom */}
      <section id="apply" className="bg-navy text-white py-16 md:py-24">
        {" "}
        {/* Reduced py padding */}
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            {" "}
            {/* Reduced mb */}
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Join Level Play</h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Apply to join our community of artists and venues. Fill out the form below to get started on your journey
              with Level Play.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="artists" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-navy-light rounded-full p-1">
                  <TabsTrigger
                    value="artists"
                    className="rounded-full px-8 py-2 text-base data-[state=active]:bg-orange data-[state=active]:text-navy"
                  >
                    For Artists
                  </TabsTrigger>
                  <TabsTrigger
                    value="venues"
                    className="rounded-full px-8 py-2 text-base data-[state=active]:bg-orange data-[state=active]:text-navy"
                  >
                    For Venues
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="artists" className="mt-0">
                <div className="glass-effect rounded-xl p-6 md:p-8">
                  <h3 className="font-display text-2xl font-bold mb-6 text-center">Artist Application</h3>
                  <ArtistSignUpForm />
                </div>
              </TabsContent>

              <TabsContent value="venues" className="mt-0">
                <div className="glass-effect rounded-xl p-6 md:p-8">
                  <h3 className="font-display text-2xl font-bold mb-6 text-center">Venue Application</h3>
                  <VenueSignUpForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  )
}

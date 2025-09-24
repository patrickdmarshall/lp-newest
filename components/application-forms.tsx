"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArtistForm } from "@/components/artist-form"
import { VenueForm } from "@/components/venue-form"

export function ApplicationForms() {
  const [activeTab, setActiveTab] = useState("artists")

  return (
    <div className="bg-navy-dark py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-navy border border-gray-700 h-14">
              <TabsTrigger
                value="artists"
                className="text-lg font-medium text-gray-300 data-[state=active]:bg-orange data-[state=active]:text-white data-[state=active]:shadow-none transition-all duration-200"
              >
                For Artists
              </TabsTrigger>
              <TabsTrigger
                value="venues"
                className="text-lg font-medium text-gray-300 data-[state=active]:bg-orange data-[state=active]:text-white data-[state=active]:shadow-none transition-all duration-200"
              >
                For Venues
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artists" className="mt-0">
              <div className="bg-navy border border-gray-700 rounded-lg p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Artist Application</h2>
                  <p className="text-gray-400">
                    Join our community of talented artists and get discovered by venues looking for performers.
                  </p>
                </div>
                <ArtistForm />
              </div>
            </TabsContent>

            <TabsContent value="venues" className="mt-0">
              <div className="bg-navy border border-gray-700 rounded-lg p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Venue Application</h2>
                  <p className="text-gray-400">
                    Partner with Level Play to connect with talented artists and fill your venue with great
                    performances.
                  </p>
                </div>
                <VenueForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Music, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VenueAccountPage() {
  // Mock venue data
  const venue = {
    id: "v1",
    name: "Newport Music Hall",
    location: "Columbus, OH",
    type: "Concert Hall",
    capacity: "1,700",
    rating: 4.8,
    reviews: 124,
    description:
      "America's Longest Running Rock Club. Newport Music Hall is a live music venue located at 1722 North High Street, Columbus, Ohio. It has been managed by PromoWest Productions since 1984, known for its intimate atmosphere and historic architecture.",
    profileImage: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=800&width=1600",
    amenities: ["Full Bar", "Sound System", "Lighting", "Green Room", "Security", "Parking"],
    genres: ["Rock", "Indie", "Alternative", "Hip-Hop", "Electronic"],
    upcomingEvents: [
      {
        id: "e1",
        title: "Friday Night Live",
        date: "June 15, 2025",
        artist: "Doc Robinson",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "e2",
        title: "Summer Showcase",
        date: "June 22, 2025",
        artist: "The Worn Flints",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "e3",
        title: "Acoustic Sessions",
        date: "July 5, 2025",
        artist: "Honey and Blue",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    socialLinks: [
      { platform: "Website", url: "https://promowestlive.com/newport-music-hall" },
      { platform: "Instagram", url: "https://instagram.com/newportmusichall" },
      { platform: "Facebook", url: "https://facebook.com/newportmusichall" },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 pt-20">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 w-full">
          <Image src={venue.coverImage || "/placeholder.svg"} alt={venue.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
        </div>

        <div className="container px-4 md:px-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-navy">
              <AvatarImage src={venue.profileImage} alt={venue.name} />
              <AvatarFallback className="bg-orange/20 text-orange text-4xl">NM</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{venue.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-orange" />
                    <span className="text-gray-300">{venue.location}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">{venue.type}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">Capacity: {venue.capacity}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="rounded-full">Contact Venue</Button>
                  <Button variant="outline" className="rounded-full border-orange text-orange hover:bg-orange/10">
                    Follow
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= Math.floor(venue.rating) ? "text-orange fill-orange" : "text-gray-500"}`}
                    />
                  ))}
                </div>
                <span className="text-white font-medium">{venue.rating}</span>
                <span className="text-gray-400">({venue.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="bg-navy-light rounded-full p-1 w-full max-w-md">
              <TabsTrigger value="about" className="rounded-full px-6">
                About
              </TabsTrigger>
              <TabsTrigger value="events" className="rounded-full px-6">
                Events
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full px-6">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card className="bg-navy-light border-navy">
                    <CardHeader>
                      <CardTitle className="text-white">About {venue.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{venue.description}</p>

                      <div className="mt-6">
                        <h3 className="text-white font-medium mb-3">Preferred Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {venue.genres.map((genre) => (
                            <Badge key={genre} className="bg-navy text-white border border-navy-light">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-white font-medium mb-3">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                          {venue.amenities.map((amenity) => (
                            <div key={amenity} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-orange mr-2"></div>
                              <span className="text-gray-300">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-navy-light border-navy">
                    <CardHeader>
                      <CardTitle className="text-white">Featured Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {venue.upcomingEvents.map((event) => (
                          <div key={event.id} className="bg-navy rounded-lg overflow-hidden group">
                            <div className="aspect-video relative">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="text-white font-medium">{event.title}</h4>
                              <p className="text-gray-400 text-sm">{event.date}</p>
                              <p className="text-orange text-sm">{event.artist}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-center">
                        <Button variant="outline" className="rounded-full" asChild>
                          <Link href="#events">View All Events</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-navy-light border-navy">
                    <CardHeader>
                      <CardTitle className="text-white">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-gray-400 text-sm">Address</h4>
                          <p className="text-white">1722 North High Street, Columbus, OH 43201</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm">Phone</h4>
                          <p className="text-white">(614) 461-5483</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm">Email</h4>
                          <p className="text-white">booking@newportmusichall.com</p>
                        </div>

                        <div className="pt-4 border-t border-navy">
                          <h4 className="text-gray-400 text-sm mb-2">Social Media</h4>
                          <div className="space-y-2">
                            {venue.socialLinks.map((link) => (
                              <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-orange transition-colors"
                              >
                                <span>{link.platform}</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-4 h-4 ml-1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-navy-light border-navy">
                    <CardHeader>
                      <CardTitle className="text-white">Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-navy p-4 rounded-lg text-center">
                          <Calendar className="h-6 w-6 text-orange mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">126</div>
                          <div className="text-gray-400 text-sm">Events Hosted</div>
                        </div>
                        <div className="bg-navy p-4 rounded-lg text-center">
                          <Users className="h-6 w-6 text-orange mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">85</div>
                          <div className="text-gray-400 text-sm">Artists Booked</div>
                        </div>
                        <div className="bg-navy p-4 rounded-lg text-center">
                          <Music className="h-6 w-6 text-orange mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">5</div>
                          <div className="text-gray-400 text-sm">Open Slots</div>
                        </div>
                        <div className="bg-navy p-4 rounded-lg text-center">
                          <Star className="h-6 w-6 text-orange mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">4.8</div>
                          <div className="text-gray-400 text-sm">Rating</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Events</CardTitle>
                  <CardDescription className="text-gray-400">
                    Check out the upcoming performances at {venue.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {venue.upcomingEvents.concat(venue.upcomingEvents).map((event, index) => (
                      <div key={`${event.id}-${index}`} className="bg-navy p-4 rounded-lg flex items-center">
                        <div className="h-16 w-16 relative rounded-md overflow-hidden mr-4">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{event.title}</h3>
                          <p className="text-gray-400 text-sm">{event.date}</p>
                          <p className="text-orange text-sm">{event.artist}</p>
                        </div>
                        <Button className="rounded-full">Get Tickets</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white">Reviews</CardTitle>
                  <CardDescription className="text-gray-400">
                    See what artists and attendees are saying about {venue.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-navy pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center mb-3">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-orange/20 text-orange">
                              {["JD", "SM", "KL"][review - 1]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-medium">
                              {["Jane Doe", "Sam Miller", "Kate Lee"][review - 1]}
                            </div>
                            <div className="text-gray-400 text-sm">{["Artist", "Attendee", "Artist"][review - 1]}</div>
                          </div>
                          <div className="ml-auto flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= [5, 4, 5][review - 1] ? "text-orange fill-orange" : "text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300">
                          {
                            [
                              "Amazing venue with great acoustics. The staff was incredibly helpful and professional. I had a fantastic experience performing here and would love to come back!",
                              "Attended a show last weekend and had a blast. The sound quality was excellent and the atmosphere was perfect. Definitely coming back for more shows.",
                              "One of the best venues I've performed at. The sound system is top-notch and the audience was very engaged. The booking process was smooth and the staff was accommodating.",
                            ][review - 1]
                          }
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline" className="rounded-full">
                      Load More Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

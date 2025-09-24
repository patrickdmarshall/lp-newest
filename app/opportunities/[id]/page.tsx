"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, Star, Zap, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

// Updated opportunities data with correct IDs
const opportunities = [
  {
    id: "hunter-metts",
    title: "Hunter Metts Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "November 2, 2025",
    time: "6:00 PM",
    type: "Supporting",
    genre: ["Folk"],
    setLength: "30 min",
    description:
      "Singer-songwriter / producer from Franklin, TN. He cites artists like Bon Iver, Fleet Foxes and Novo Amor as influences. We're looking for an opening act that can complement the dreamy, atmospheric sound. This is a great opportunity to play in front of an engaged audience that appreciates thoughtful, indie folk music.",
    image: "/images/ar-music-bar-new.jpg",
    urgent: false,
    featured: true,
    applicationDeadline: "September 28, 2025",
    status: "open",
    requirements: [
      "Must have original material",
      "Professional sound equipment preferred",
      "Must be able to perform 30-minute set",
      "Local or touring acts welcome",
    ],
    compensation: "Door split + merchandise sales",
    contactInfo: "Applications processed through Level Play platform",
  },
  {
    id: "marlon-funaki",
    title: "Marlon Funaki Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "September 4, 2025",
    time: "7:00 PM",
    type: "Supporting",
    genre: ["Alternative", "Indie"],
    setLength: "30 min",
    description:
      'Listen to his song "Red Hearts" and you\'ll become a fan of this young talent! Looking for support that matches sonically. This is a great opportunity for alternative and indie acts to showcase their talent to an engaged audience.',
    image: "/images/ar-music-bar-new.jpg",
    urgent: true,
    featured: true,
    applicationDeadline: "August 7, 2025",
    status: "open",
    requirements: [
      "Alternative/Indie genre preferred",
      "Must have original material",
      "Professional performance experience",
      "Must be available for sound check at 5:00 PM",
    ],
    compensation: "Door split + merchandise sales",
    contactInfo: "Applications processed through Level Play platform",
  },
  {
    id: "hayden-coffman",
    title: "Hayden Coffman Support",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "August 29, 2025",
    time: "8:00 PM",
    type: "Supporting",
    genre: ["Country"],
    setLength: "30 min",
    description:
      "A rising star in the world of country music that infuses his own unique flair and authenticity into every song he creates. We're looking for an opening act that can complement the country sound and energy.",
    image: "/images/ar-music-bar-new.jpg",
    urgent: true,
    featured: true,
    applicationDeadline: "August 1, 2025",
    status: "open",
    requirements: [
      "Country genre preferred",
      "Must have original material",
      "Professional performance experience",
      "Must be available for sound check at 6:00 PM",
    ],
    compensation: "Door split + merchandise sales",
    contactInfo: "Urgent - apply immediately through Level Play",
  },
  {
    id: "headliner-ar-music-bar",
    title: "Headliner Opportunity – A&R Music Bar",
    venue: "A&R Music Bar",
    location: "Columbus, OH",
    date: "September 19, 2025",
    time: "7:00 PM",
    type: "Headliner",
    genre: ["All Genres"],
    setLength: "60 min",
    description:
      "Looking for acts of any genre looking to promote their music or art. This is a prime headliner slot for established acts looking to showcase their talent to a diverse Columbus audience.",
    image: "/images/ar-music-bar-new.jpg",
    urgent: false,
    featured: false,
    applicationDeadline: "July 25, 2025",
    status: "open",
    requirements: [
      "Must have original material",
      "Professional performance experience",
      "Able to draw audience",
      "Professional equipment required",
    ],
    compensation: "Door split + merchandise sales",
    contactInfo: "Applications processed through Level Play platform",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function OpportunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [opportunity, setOpportunity] = useState<any>(null)

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (params.id) {
      const found = opportunities.find((opp) => opp.id === params.id)
      setOpportunity(found)
    }
  }, [params.id])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render content if not authenticated
  if (!user) {
    return null
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-navy pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Opportunity Not Found</h1>
          <Link href="/opportunities">
            <Button className="bg-orange hover:bg-orange/90 text-navy">Back to Opportunities</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy pt-24">
      <div className="container px-4 md:px-6 py-12">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
          <Link
            href="/opportunities"
            className="inline-flex items-center text-orange hover:text-orange/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunities
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-navy-light border-navy-dark">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={opportunity.image || "/placeholder.svg"}
                    alt={opportunity.venue}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {opportunity.featured && (
                      <Badge className="bg-orange text-navy hover:bg-orange font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {opportunity.urgent && (
                      <Badge className="bg-red-500 text-white hover:bg-red-500 font-semibold animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        URGENT
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={opportunity.type === "Headliner" ? "default" : "secondary"}
                      className={`font-semibold ${
                        opportunity.type === "Headliner"
                          ? "bg-gradient-to-r from-orange to-amber-500 text-navy"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {opportunity.type}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <h1 className="text-3xl font-bold text-white mb-2">{opportunity.title}</h1>
                  <p className="text-orange font-semibold text-xl mb-6">{opportunity.venue}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="h-5 w-5 text-orange" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="h-5 w-5 text-orange" />
                      <span>{opportunity.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="h-5 w-5 text-orange" />
                      <span>{opportunity.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="h-5 w-5 text-orange" />
                      <span>{opportunity.setLength}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.genre.map((genre: string) => (
                      <Badge key={genre} variant="outline" className="border-orange/30 text-orange">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-xl font-semibold text-white mb-3">About This Opportunity</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{opportunity.description}</p>

                    {opportunity.requirements && (
                      <>
                        <h3 className="text-xl font-semibold text-white mb-3">Requirements</h3>
                        <ul className="text-gray-300 space-y-2 mb-6">
                          {opportunity.requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {opportunity.compensation && (
                      <>
                        <h3 className="text-xl font-semibold text-white mb-3">Compensation</h3>
                        <p className="text-gray-300 mb-6">{opportunity.compensation}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-navy-light border-navy-dark sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">Apply for This Show</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Application Deadline:</strong>
                    <br />
                    {opportunity.applicationDeadline}
                  </div>

                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Status:</strong>
                    <br />
                    <Badge variant="outline" className="border-green-500 text-green-400 mt-1">
                      Open for Applications
                    </Badge>
                  </div>

                  <Link href={`/opportunities/${opportunity.id}/apply`} className="block">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold text-lg py-3">
                      Apply Now
                    </Button>
                  </Link>

                  <p className="text-xs text-gray-400 text-center">Applications are reviewed within 24-48 hours</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

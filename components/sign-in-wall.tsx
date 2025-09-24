"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Star, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface SignInWallProps {
  title?: string
  description?: string
  showPreview?: boolean
}

export function SignInWall({
  title = "Sign In to View Opportunities",
  description = "Create an account or sign in to access exclusive performance opportunities from Columbus's top venues.",
  showPreview = true,
}: SignInWallProps) {
  return (
    <div className="bg-navy py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <Lock className="h-16 w-16 text-orange mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-syne">{title}</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{description}</p>
          </div>

          {showPreview && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-navy-light/50 border-navy-dark backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Featured Opportunities</h3>
                  <p className="text-gray-400 text-sm">Get access to premium gigs at top venues</p>
                </CardContent>
              </Card>

              <Card className="bg-navy-light/50 border-navy-dark backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Direct Applications</h3>
                  <p className="text-gray-400 text-sm">Apply directly to venues with one click</p>
                </CardContent>
              </Card>

              <Card className="bg-navy-light/50 border-navy-dark backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Real-Time Updates</h3>
                  <p className="text-gray-400 text-sm">Get notified about new opportunities instantly</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-orange hover:bg-orange/90 text-navy font-semibold px-8 py-3">
                Create Account
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="border-orange/30 text-orange hover:bg-orange/10 bg-transparent px-8 py-3"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-6">
            Join hundreds of artists already using Level Play to book their next gig
          </p>
        </motion.div>
      </div>
    </div>
  )
}

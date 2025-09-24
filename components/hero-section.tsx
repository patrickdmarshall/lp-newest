"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Music, Users, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/live-performance-hero.jpg"
          alt="Live music performance"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Music className="h-16 w-16 text-orange" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-16 opacity-15"
        >
          <Users className="h-12 w-12 text-orange" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 left-20 opacity-25"
        >
          <Star className="h-8 w-8 text-orange" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-2 text-orange text-sm font-medium backdrop-blur-sm"
          >
            <Play className="h-4 w-4" />
            Columbus's Premier Music Platform
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Connect.{" "}
            <span className="bg-gradient-to-r from-orange to-orange-light bg-clip-text text-transparent">Perform.</span>{" "}
            Level Up.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
          >
            The platform connecting Columbus artists with premier venues for unforgettable live performances.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange to-orange-light hover:from-orange-light hover:to-orange text-navy font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/apply/artist" className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Apply as Artist
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-orange text-orange hover:bg-orange hover:text-navy font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              <Link href="/apply/venue" className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                List Your Venue
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 text-center"
          >
            <p className="text-sm text-gray-400 mb-4">Trusted by Columbus's top venues</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
              <div className="text-xs font-medium text-gray-500">Newport Music Hall</div>
              <div className="text-xs font-medium text-gray-500">A&R Music Bar</div>
              <div className="text-xs font-medium text-gray-500">KEMBA Live!</div>
              <div className="text-xs font-medium text-gray-500">The Basement</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-orange/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-orange rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

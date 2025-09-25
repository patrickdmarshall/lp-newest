"use client";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Music, Megaphone, Users, Target } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BrittonPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-navy pt-24">
          <div className="container px-4 md:px-6 py-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <Link href="/backstage" className="inline-block mb-8">
                <Button variant="outline" className="border-navy-light text-white hover:bg-navy-light bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Team
                </Button>
              </Link>

              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-12">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-navy-light border-4 border-orange/20">
                    <img
                      src="/images/britton.jpg"
                      alt="Britton"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange rounded-full flex items-center justify-center">
                    <span className="text-navy text-sm font-bold">🎵</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-syne">Britton</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-orange" />
                    <span className="text-lg text-gray-300">Columbus, OH</span>
                  </div>
                  <Badge className="bg-orange/20 text-orange border-orange/30 text-lg px-4 py-2 mb-4">
                    Brand President & Co-Founder
                  </Badge>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Driving Level Play's brand vision and community engagement to create meaningful connections in the Columbus music scene.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-navy-light">
          <div className="container px-4 md:px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-8">

            {/* About Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Music className="h-6 w-6 text-orange" />
                    About Britton
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Britton is the Brand President and co-founder of Level Play. While he may not play instruments or sing,
                    when he hears something special, he shares it with anyone that will listen. Working in live entertainment
                    for over a decade, Britton has developed an eye for talent and a passion for connecting artists with their audiences.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    His unique perspective as a non-musician in the music industry brings fresh insights to how we can better
                    serve both artists and venues. Britton's focus on community building and authentic connections drives
                    Level Play's mission to make the music industry more accessible and rewarding for everyone.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Brand & Promotion Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Megaphone className="h-6 w-6 text-orange" />
                    Brand & Promotion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-orange font-semibold text-lg">Brand Strategy</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Community Building & Engagement</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Artist Discovery & Promotion</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Venue Partnership Development</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Event Marketing & Promotion</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-orange font-semibold text-lg">Industry Experience</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Live Entertainment Production</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Talent Scouting & Development</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Audience Engagement Strategies</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange rounded-full"></div>
                          <span className="text-gray-300">Music Industry Networking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Target className="h-6 w-6 text-orange" />
                    Vision & Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Britton envisions Level Play as more than just a booking platform – it's a community hub where
                    artists, venues, and music lovers can discover, connect, and grow together. His passion for
                    authentic music experiences drives the platform's commitment to supporting emerging talent and
                    creating meaningful connections in the Columbus music scene.
                  </p>
                  <div className="p-6 bg-gradient-to-r from-orange/10 to-orange/5 rounded-xl border border-orange/20">
                    <p className="text-orange font-medium italic text-lg">
                      "Great music deserves to be heard. Level Play exists to break down barriers and create
                      opportunities for every artist to find their perfect stage and every venue to discover their next favorite act."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-navy border border-navy-light rounded-xl hover:border-orange/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-orange mb-2">10+</div>
                  <div className="text-gray-300">Years in Entertainment</div>
                </div>
                <div className="text-center p-6 bg-navy border border-navy-light rounded-xl hover:border-orange/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-orange mb-2">500+</div>
                  <div className="text-gray-300">Artists Discovered</div>
                </div>
                <div className="text-center p-6 bg-navy border border-navy-light rounded-xl hover:border-orange/30 transition-all duration-300">
                  <div className="text-3xl font-bold text-orange mb-2">1000+</div>
                  <div className="text-gray-300">Events Promoted</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
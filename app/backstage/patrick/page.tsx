"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft, Terminal, Cpu, Globe } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function PatrickPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[600px] md:h-[700px] bg-navy-dark flex items-end p-6">
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(/images/patrick.jpeg)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 text-white max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-syne">Patrick</h1>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-orange" />
                <span className="text-lg">Los Angeles, CA</span>
              </div>
              <Badge className="bg-orange/20 text-orange border-orange/30 text-lg px-4 py-2">Senior Engineer</Badge>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Back Button */}
            <Link href="/backstage">
              <Button variant="outline" className="border-navy-light text-white hover:bg-navy-light bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Team
              </Button>
            </Link>

            {/* About Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-orange" />
                    About Patrick
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    As Senior Engineer at Level Play, Patrick brings world-class technical expertise from Los Angeles to
                    power the platform that connects Columbus's music community. With extensive experience in full-stack
                    development and system architecture, Patrick ensures Level Play operates at peak performance.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Patrick's remote collaboration from the West Coast demonstrates Level Play's commitment to accessing
                    top talent regardless of location. His technical leadership and innovative solutions drive the
                    platform's reliability, scalability, and user experience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Technical Expertise Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Cpu className="h-6 w-6 text-orange" />
                    Technical Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-orange font-semibold text-lg">Core Technologies</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• React & Next.js Development</li>
                        <li>• Node.js & Backend Systems</li>
                        <li>• Database Design & Optimization</li>
                        <li>• Cloud Infrastructure & DevOps</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-orange font-semibold text-lg">Specializations</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Performance Optimization</li>
                        <li>• Security & Data Protection</li>
                        <li>• API Design & Integration</li>
                        <li>• Mobile-First Development</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact Section */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <Card className="bg-navy-light border-navy">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange" />
                    Impact & Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Patrick's engineering excellence ensures that Level Play can handle the demands of a growing music
                    community while maintaining the speed and reliability that users expect. His attention to detail and
                    commitment to best practices make the platform a joy to use for both artists and venues.
                  </p>
                  <div className="mt-6 p-4 bg-orange/10 rounded-lg border border-orange/20">
                    <p className="text-orange font-medium italic">
                      "Great software should be invisible to the user but powerful under the hood. Every line of code
                      should serve the mission of connecting artists with their perfect stage."
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-navy/50 rounded-lg">
                      <h5 className="text-orange font-semibold mb-2">Platform Performance</h5>
                      <p className="text-gray-300 text-sm">
                        Optimized for sub-second load times and 99.9% uptime, ensuring artists never miss an
                        opportunity.
                      </p>
                    </div>
                    <div className="p-4 bg-navy/50 rounded-lg">
                      <h5 className="text-orange font-semibold mb-2">Security First</h5>
                      <p className="text-gray-300 text-sm">
                        Enterprise-grade security protecting sensitive artist and venue data with industry best
                        practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

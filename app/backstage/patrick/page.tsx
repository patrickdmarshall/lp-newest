"use client";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ArrowLeft, Terminal, Cpu, Globe, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DiscoverHero from "@/components/DiscoverHero";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PatrickPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <div className="bg-navy pt-24">
        <DiscoverHero
          title="Meet Patrick"
          subtitle="Senior Engineer powering Level Play's technical infrastructure with world-class engineering expertise from the West Coast."
          searchPlaceholder="Search team members..."
          className="fixed-hero-bg"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Search team members..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-navy-light border-navy focus:ring-orange focus:border-orange text-white placeholder-gray-400 sm:pl-12 sm:py-3"
                />
              </div>
            </div>
          </div>
        </DiscoverHero>

        {/* Content */}
        <div className="bg-navy py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Back Button */}
              <Link href="/backstage" className="inline-block mb-8">
                <Button variant="outline" className="border-navy-light text-white hover:bg-navy-light bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Team
                </Button>
              </Link>

              {/* Profile Header */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                      <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-navy border-4 border-orange/20">
                          <img
                            src="/images/patrick.jpeg"
                            alt="Patrick"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange rounded-full flex items-center justify-center">
                          <span className="text-navy text-sm font-bold">⚡</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-syne">Patrick</h1>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-orange" />
                          <span className="text-lg text-gray-300">Los Angeles, CA</span>
                        </div>
                        <Badge className="bg-orange/20 text-orange border-orange/30 text-lg px-4 py-2 mb-4">
                          Senior Engineer
                        </Badge>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Powering Level Play's technical infrastructure with world-class engineering expertise from the West Coast.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* About Section */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
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
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Cpu className="h-6 w-6 text-orange" />
                      Technical Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-orange font-semibold text-lg">Core Technologies</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">React & Next.js Development</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">Node.js & Backend Systems</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">Database Design & Optimization</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">Cloud Infrastructure & DevOps</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-orange font-semibold text-lg">Specializations</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">Performance Optimization</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">Security & Data Protection</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">API Design & Integration</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">Mobile-First Development</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Impact Section */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Globe className="h-6 w-6 text-orange" />
                      Impact & Innovation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Patrick's engineering excellence ensures that Level Play can handle the demands of a growing music
                      community while maintaining the speed and reliability that users expect. His attention to detail and
                      commitment to best practices make the platform a joy to use for both artists and venues.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-navy/50 rounded-xl border border-navy-light">
                        <div className="flex items-center gap-3 mb-3">
                          <Cpu className="h-5 w-5 text-orange" />
                          <h5 className="text-orange font-semibold">Platform Performance</h5>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Optimized for sub-second load times and high availability, ensuring artists never miss an
                          opportunity.
                        </p>
                      </div>
                      <div className="p-6 bg-navy/50 rounded-xl border border-navy-light">
                        <div className="flex items-center gap-3 mb-3">
                          <Terminal className="h-5 w-5 text-orange" />
                          <h5 className="text-orange font-semibold">Security First</h5>
                        </div>
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
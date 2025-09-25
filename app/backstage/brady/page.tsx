"use client";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Code, Zap, Target } from "lucide-react";
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

export default function BradyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <div className="bg-navy pt-24">
        <DiscoverHero
          title="Meet Brady"
          subtitle="CEO & Co-Founder leading Level Play's strategic vision to revolutionize how artists and venues connect in Columbus."
          searchPlaceholder="Search team members..."
          showFilters={false}
        />

        {/* Content */}
        <div className="bg-navy py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Back Button */}
              <Link href="/backstage" className="inline-block mb-8">
                <Button
                  variant="outline"
                  className="border-navy-light text-white hover:bg-navy-light bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Team
                </Button>
              </Link>

              {/* Profile Header */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                      <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-navy border-4 border-orange/20">
                          <img
                            src="/images/brady-new.png"
                            alt="Brady"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange rounded-full flex items-center justify-center">
                          <span className="text-navy text-sm font-bold">
                            👑
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-syne">
                          Brady
                        </h1>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-orange" />
                          <span className="text-lg text-gray-300">
                            Columbus, OH
                          </span>
                        </div>
                        <Badge className="bg-orange/20 text-orange border-orange/30 text-lg px-4 py-2 mb-4">
                          CEO & Co-Founder
                        </Badge>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Leading Level Play's strategic vision and operational
                          excellence to revolutionize how artists and venues
                          connect in Columbus.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* About Section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Code className="h-6 w-6 text-orange" />
                      About Brady
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      As CEO and Co-Founder of Level Play, Brady combines
                      technical expertise with entrepreneurial vision to
                      revolutionize how artists and venues connect in Columbus.
                      With a background in technology and a passion for music,
                      Brady leads the strategic direction and operational
                      excellence of the platform.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Brady's leadership focuses on scaling Level Play's impact
                      while maintaining the personal touch that makes the
                      Columbus music scene special. Through data-driven insights
                      and user-centered design, Brady ensures that every feature
                      serves the real needs of artists and venues.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Leadership Section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Zap className="h-6 w-6 text-orange" />
                      Leadership & Innovation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-orange font-semibold text-lg">
                          Core Responsibilities
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Strategic Planning & Execution
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Product Development & Innovation
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Team Leadership & Culture
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Investor Relations & Growth
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-orange font-semibold text-lg">
                          Technical Expertise
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Platform Architecture & Scaling
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              User Experience Design
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Data Analytics & Insights
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange rounded-full"></div>
                            <span className="text-gray-300">
                              Technology Strategy
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vision Section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Target className="h-6 w-6 text-orange" />
                      Vision & Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Brady envisions Level Play as the definitive platform for
                      music discovery and booking, not just in Columbus but
                      across the Midwest. By leveraging technology to solve real
                      problems in the music industry, Brady is building a
                      sustainable ecosystem that benefits everyone involved.
                    </p>
                    <div className="p-6 bg-gradient-to-r from-orange/10 to-orange/5 rounded-xl border border-orange/20">
                      <p className="text-orange font-medium italic text-lg">
                        "Technology should amplify human connections, not
                        replace them. Level Play exists to make the music
                        industry more accessible, transparent, and rewarding for
                        everyone."
                      </p>
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

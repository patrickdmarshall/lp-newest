"use client";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Code,
  Zap,
  Target,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BradyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[500px] md:h-[600px] bg-navy-dark flex flex-col justify-end items-center p-6 text-center">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(/images/brady-new.png)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          <Link href="/backstage" className="absolute top-6 left-6 z-20">
            <Button
              variant="outline"
              className="border-navy-light text-white hover:bg-navy-light bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Button>
          </Link>

          <div className="relative z-10 text-white max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-2 font-syne">
                Brady
              </h1>
              <p className="text-xl text-gray-300 mb-6 font-semibold text-orange">
                CEO & Co-Founder
              </p>

              <div className="flex justify-center gap-4">
                <Link
                  href="https://www.instagram.com/brady/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-orange"
                  >
                    <Instagram className="h-6 w-6" />
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/brady/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-orange"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="mailto:brady@levelplay.io">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-orange"
                  >
                    <Mail className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-navy-light">
          <div className="container px-4 md:px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* About Section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
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
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
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
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
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
      </main>

      <Footer />
    </div>
  );
}

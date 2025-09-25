"use client";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal, Cpu, Globe, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PatrickPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[500px] md:h-[600px] bg-navy-dark flex flex-col justify-end items-center p-6 text-center">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(/images/patrick.jpeg)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          <Link href="/backstage" className="absolute top-6 left-6 z-20">
            <Button variant="outline" className="border-navy-light text-white hover:bg-navy-light bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Button>
          </Link>

          <div className="relative z-10 text-white max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 font-syne">Patrick</h1>
              <p className="text-xl text-gray-300 mb-6 font-semibold text-orange">Senior Engineer</p>

              <div className="flex justify-center gap-4">
                <Link href="https://www.instagram.com/patrick/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-orange">
                    <Instagram className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/patrick/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-orange">
                    <Linkedin className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="mailto:patrick@levelplay.io">
                  <Button variant="ghost" size="icon" className="text-white hover:text-orange">
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
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
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
                <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
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
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <Card className="bg-navy border-navy-light hover:border-orange/30 transition-all duration-300">
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
      </main>

      <Footer />
    </div>
  );
}
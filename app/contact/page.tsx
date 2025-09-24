"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function ContactPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="bg-navy pt-24">
      <section className="bg-navy-light text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.1),transparent_50%)]"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-syne"
            >
              Get in <span className="text-orange">Touch</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
              Have questions about Level Play? Ready to join our community? We're here to help you connect with the
              music scene.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="container px-4 md:px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
              {/* Contact Info */}
              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Whether you're an artist looking to get booked or a venue seeking fresh talent, we're here to help
                    you make meaningful connections in the music industry.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Response Time</h3>
                      <p className="text-gray-300">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Based In</h3>
                      <p className="text-gray-300">Columbus, Ohio</p>
                    </div>
                  </div>
                </div>

                <div className="bg-navy-light rounded-xl p-6">
                  <h3 className="text-white font-semibold text-xl mb-4">About Level Play</h3>
                  <p className="text-gray-300 mb-4">
                    Level Play is Columbus's premier platform connecting talented artists with amazing venues. We're
                    passionate about supporting the local music scene and creating opportunities for unforgettable live
                    performances.
                  </p>
                  <p className="text-gray-300">
                    Join our community of artists and venues working together to elevate the live music experience in
                    Columbus and beyond.
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={fadeInUp} className="bg-navy-light rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2 font-medium">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="bg-navy border-gray-700 text-white placeholder:text-gray-400 focus:border-orange"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white mb-2 font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="bg-navy border-gray-700 text-white placeholder:text-gray-400 focus:border-orange"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2 font-medium">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="What's this about?"
                      className="bg-navy border-gray-700 text-white placeholder:text-gray-400 focus:border-orange"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white mb-2 font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us more about your inquiry..."
                      className="bg-navy border-gray-700 text-white placeholder:text-gray-400 focus:border-orange min-h-[120px] resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange hover:bg-orange/90 text-white font-semibold py-3">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

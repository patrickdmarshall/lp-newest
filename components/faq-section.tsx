"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "How does Level Play work?",
    answer:
      "Level Play connects artists and venues in Columbus through our platform. Artists create profiles showcasing their talent, venues post opportunities, and we facilitate meaningful connections that lead to bookings and long-term relationships.",
  },
  {
    question: "Is Level Play free to use?",
    answer:
      "Yes, Level Play is free for artists to join and apply for opportunities. Venues can also post basic opportunities at no cost. We offer premium features for enhanced visibility and additional tools.",
  },
  {
    question: "What types of venues are on Level Play?",
    answer:
      "We work with a variety of venues including music halls, bars, clubs, restaurants, event spaces, and more. From intimate acoustic settings to large concert venues, there's something for every type of artist.",
  },
  {
    question: "How do I get approved as an artist?",
    answer:
      "After submitting your application with your music samples, bio, and performance history, our team reviews your profile. We look for quality, professionalism, and fit within the Columbus music scene.",
  },
  {
    question: "Can I apply for multiple opportunities?",
    answer:
      "You can apply for as many opportunities as you'd like, as long as they fit your style and availability. We encourage artists to be active and apply for opportunities that align with their goals.",
  },
  {
    question: "What happens after I apply for an opportunity?",
    answer:
      "Venues review applications and reach out directly to artists they're interested in booking. Response times vary, but we encourage venues to respond within a week of the application deadline.",
  },
]

export function FaqSection() {
  return (
    <section className="py-24 bg-navy-light">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about Level Play and how it works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-navy-dark border-navy-light rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-orange text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

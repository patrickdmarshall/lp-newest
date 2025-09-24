"use client"

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { FaqSection } from "@/components/faq-section"
import { HeroSection } from "@/components/hero-section"
import { PathwaysSection } from "@/components/pathways-section"
import { OpportunitiesSection } from "@/components/opportunities-section"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function ClientHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Level Play",
    url: "https://www.levelplay.co",
    description: "Columbus's premier platform connecting talented artists with top music venues",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.levelplay.co/opportunities?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "Service",
      name: "Music Venue Booking Platform",
      description: "Platform connecting artists with music venues in Columbus, Ohio",
      provider: {
        "@type": "Organization",
        name: "Level Play",
      },
      areaServed: {
        "@type": "City",
        name: "Columbus",
        containedInPlace: {
          "@type": "State",
          name: "Ohio",
        },
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-navy text-white overflow-x-hidden">
        <MainNav />
        <HeroSection />
        <PathwaysSection />
        <OpportunitiesSection />
        <FaqSection />
        <NewsletterSignup />
        <Footer />
      </div>
    </>
  )
}

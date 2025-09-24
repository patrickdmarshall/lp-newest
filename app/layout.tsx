import type React from "react"
import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { SubscriptionProvider } from "@/contexts/subscription-context"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/main-nav"

// Optimize font loading with display swap and preload
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  title: {
    default: "Level Play - Connecting Artists and Venues in Columbus",
    template: "%s | Level Play",
  },
  description:
    "Level Play is Columbus's premier platform connecting talented artists with top music venues. Find performance opportunities, book shows, and grow your music career in Ohio's vibrant music scene.",
  keywords: [
    "Columbus music venues",
    "Ohio music booking",
    "artist booking platform",
    "live music Columbus",
    "music venue booking",
    "Columbus artists",
    "Ohio music scene",
    "performance opportunities",
    "music gigs Columbus",
    "venue management",
    "artist promotion",
    "live music booking",
    "Columbus entertainment",
    "music industry Ohio",
    "artist development",
  ],
  authors: [{ name: "Level Play" }],
  creator: "Level Play",
  publisher: "Level Play",
  metadataBase: new URL("https://www.levelplay.co"),
  alternates: {
    canonical: "https://www.levelplay.co",
  },
  openGraph: {
    title: "Level Play - Connecting Artists and Venues in Columbus",
    description:
      "Columbus's premier platform connecting talented artists with top music venues. Find performance opportunities and grow your music career.",
    url: "https://www.levelplay.co",
    siteName: "Level Play",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Level Play - Connecting Artists and Venues in Columbus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Level Play - Connecting Artists and Venues in Columbus",
    description:
      "Columbus's premier platform connecting talented artists with top music venues. Find performance opportunities and grow your music career.",
    images: ["/og-image.png"],
    creator: "@levelplayco",
    site: "@levelplayco",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Music & Entertainment",
    generator: 'v0.app'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Level Play",
  description: "Columbus's premier platform connecting talented artists with top music venues",
  url: "https://www.levelplay.co",
  logo: "https://www.levelplay.co/og-image.png",
  sameAs: [
    "https://www.instagram.com/levelplayco",
    "https://www.twitter.com/levelplayco",
    "https://www.facebook.com/levelplayco",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbus",
    addressRegion: "OH",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://www.levelplay.co/contact",
  },
  founder: {
    "@type": "Person",
    name: "Level Play Team",
  },
  foundingDate: "2024",
  industry: "Music & Entertainment",
  knowsAbout: [
    "Music venue booking",
    "Artist development",
    "Live music events",
    "Columbus music scene",
    "Performance opportunities",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Optimized resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.levelplay.co" />

        {/* Comprehensive favicon setup */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Preload critical resources */}
        <link rel="preload" href="/og-image.png" as="image" type="image/png" />

        {/* Structured data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* Force favicon refresh */}
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="pragma" content="no-cache" />
      </head>
      <body className={`${inter.variable} ${syne.variable} font-sans bg-navy text-white antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="level-play-theme"
        >
          <AuthProvider>
            <SubscriptionProvider>
              <div className="flex min-h-screen flex-col">
                <MainNav />
                <main className="flex-1" role="main">
                  {children}
                </main>
              </div>
              <Toaster />
            </SubscriptionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

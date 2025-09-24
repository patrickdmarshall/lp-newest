import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Music, MapPin } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <MainNav />
      <main className="flex-1 flex flex-col items-center justify-center py-16 md:py-24 px-4">
        <div className="text-center mb-12">
          <Music className="h-16 w-16 text-orange mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Join Level Play</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Ready to showcase your talent? Sign up to join our platform and start getting booked at amazing venues.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Link href="/apply/artist">
            <Card className="bg-navy-light border-orange/30 hover:border-orange transition-all duration-300 transform hover:scale-105 cursor-pointer h-full">
              <CardHeader className="items-center text-center">
                <Music className="h-12 w-12 text-orange mb-3" />
                <CardTitle className="text-2xl font-bold text-white">Sign Up as Artist</CardTitle>
                <CardDescription className="text-gray-300">
                  Create your artist profile and start applying to perform at venues.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/apply/venue">
            <Card className="bg-navy-light border-orange/30 hover:border-orange transition-all duration-300 transform hover:scale-105 cursor-pointer h-full">
              <CardHeader className="items-center text-center">
                <MapPin className="h-12 w-12 text-orange mb-3" />
                <CardTitle className="text-2xl font-bold text-white">Sign Up as Venue</CardTitle>
                <CardDescription className="text-gray-300">
                  Register your venue and start discovering talented artists to book.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function InvalidLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1 pt-24 md:pt-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <Card className="bg-navy-light border-navy">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Invalid Link</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    The sign-in link you used is invalid or has expired. This can happen if the link is old or has
                    already been used.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/contact">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-white">
                      Contact Support
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <Link href="/">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

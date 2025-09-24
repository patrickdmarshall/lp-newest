"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Clock, Mail, Phone, CheckCircle, Info } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function VenueApplicationStatusPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-navy text-white">
        <MainNav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange mx-auto mb-4"></div>
            <p className="text-gray-300">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <MainNav />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Clock className="h-16 w-16 text-orange mx-auto mb-4" />
            <h1 className="font-display text-4xl font-bold mb-4">Application Under Review</h1>
            <p className="text-lg text-gray-300">Thank you for applying to join Level Play as a venue partner.</p>
          </div>

          <Card className="bg-navy-light border-navy mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Application Submitted Successfully
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-500/20 border-blue-500">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-400">
                  <strong>What happens next?</strong>
                  <br />
                  Our team reviews all venue applications to ensure quality and authenticity. This process typically
                  takes 24-48 hours.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h3 className="text-white font-semibold">Review Process:</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Application received and logged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span>Venue information verification in progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>Final approval and account activation</span>
                  </div>
                </div>
              </div>

              <div className="bg-navy p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">We'll contact you via:</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-orange" />
                    <span>{user.email}</span>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-navy-light border-navy">
            <CardHeader>
              <CardTitle className="text-white">Questions or Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                If you have any questions about your application or need to update your information, please don't
                hesitate to reach out.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Contact Support
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-orange hover:bg-orange/90 text-navy">Return Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

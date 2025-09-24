import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 pt-20 pb-20">
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-navy-light border-navy">
              <CardHeader className="text-center pb-2">
                <CheckCircle className="h-16 w-16 text-orange mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Application Submitted!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  Thank you for your interest in Level Play. We carefully review each application to maintain a curated
                  community of talent.
                </p>
                <p className="text-gray-300 mb-8">
                  Please allow up to 72 hours for our team to review your submission. If approved, you'll receive an
                  email with instructions to complete your account setup.
                </p>
                <Button asChild className="rounded-full w-full">
                  <Link href="/">Return to Home</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

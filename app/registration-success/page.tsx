import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-navy-dark bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <img src="/logo.png" alt="Level Play" className="h-15 w-30" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-orange hover:bg-orange/90 text-navy px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="bg-navy-light border-navy-dark">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-orange mx-auto" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">Application Submitted!</h1>

              <p className="text-gray-300 mb-6">
                Thank you for your interest in Level Play. We carefully review each application to maintain a curated
                community of talent.
              </p>

              <p className="text-gray-300 mb-8">
                Please allow up to 72 hours for our team to review your submission. If approved, you'll receive an email
                with instructions to complete your account setup.
              </p>

              <Button asChild className="w-full bg-orange hover:bg-orange/90 text-navy">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-gray-400 text-sm mt-6">
            Have questions?{" "}
            <Link href="/contact" className="text-orange hover:text-orange/80">
              Contact our support team
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

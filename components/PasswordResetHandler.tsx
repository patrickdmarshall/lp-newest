"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PasswordResetHandler() {
  const router = useRouter()
  const supabase = createPagesBrowserClient()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handlePasswordReset = async () => {
      try {
        // Check if URL contains the required parameters
        const hash = window.location.hash
        const params = new URLSearchParams(hash.substring(1))
        const accessToken = params.get("access_token")
        const type = params.get("type")

        if (accessToken && type === "recovery") {
          // Use the full URL for exchangeCodeForSession
          const url = new URL(window.location.href)

          const { error } = await supabase.auth.exchangeCodeForSession(url)

          if (error) {
            console.error("Password reset error:", error)
            router.push("/invalid-link")
          } else {
            // Successfully exchanged code for session
            router.push("/new-password")
          }
        } else {
          // Missing required parameters
          router.push("/invalid-link")
        }
      } catch (error) {
        console.error("Unexpected error during password reset:", error)
        router.push("/invalid-link")
      } finally {
        setIsProcessing(false)
      }
    }

    handlePasswordReset()
  }, [router, supabase])

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />
      <div className="flex-1 flex items-center justify-center p-4 pt-24">
        <Card className="w-full max-w-md bg-navy-light border-navy-light shadow-xl">
          <CardContent className="p-8 text-center space-y-6">
            <Loader2 className="h-8 w-8 animate-spin text-orange mx-auto" />
            <h1 className="text-2xl font-bold text-white">Verifying Reset Link</h1>
            <p className="text-gray-300">Please wait while we process your password reset request...</p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

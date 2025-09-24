"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get("code")

        if (!code) {
          console.error("No code parameter found")
          router.push("/invalid-link")
          return
        }

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error("Auth error:", error)
          router.push("/invalid-link")
          return
        }

        if (data.session) {
          console.log("Sign in successful, redirecting to dashboard")
          router.push("/dashboard")
        } else {
          console.error("No session found after exchange")
          router.push("/invalid-link")
        }
      } catch (err) {
        console.error("Unexpected error:", err)
        router.push("/invalid-link")
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-4">
      <div className="bg-navy-light rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <p className="text-white text-lg">Finishing sign in...</p>
        </div>
      </div>
    </div>
  )
}

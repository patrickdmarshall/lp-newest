"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function ResetPassword() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const hash = window.location.hash

    if (hash.includes("access_token")) {
      supabase.auth
        .exchangeCodeForSession()
        .then(({ data, error }) => {
          if (error) {
            console.error("Auth error:", error)
            return
          }

          // Redirect based on role or just to dashboard
          router.replace("/dashboard")
        })
    }
  }, [])

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-navy-light border border-gray-700 rounded-lg p-8">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function ProfileRedirectPage() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user?.role === "artist") {
        redirect("/dashboard/artist-profile")
      } else if (user?.role === "venue") {
        redirect("/dashboard/venue-profile")
      }
    }
  }, [user, loading])

  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
    </div>
  )
}

"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "artist" | "venue" | "admin"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/sign-in" }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && profile?.role !== requiredRole) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, profile, loading, requiredRole, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}

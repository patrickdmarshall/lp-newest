"use client"

import type React from "react"

import { useSubscription, type PremiumFeature } from "@/contexts/subscription-context"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface PremiumFeatureProps {
  feature: PremiumFeature
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PremiumFeature({ feature, children, fallback }: PremiumFeatureProps) {
  const { hasAccess, currentPlan } = useSubscription()
  const router = useRouter()

  const hasFeatureAccess = hasAccess(feature)

  if (hasFeatureAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div className="premium-feature relative rounded-lg overflow-hidden">
      {children}

      <div className="premium-lock">
        <div className="bg-orange/20 rounded-full p-3">
          <Lock className="h-6 w-6 text-orange" />
        </div>
        <p className="text-white font-medium text-center max-w-xs">
          This feature requires a {feature === "featured_listing" || feature === "custom_branding" ? "Pro" : "Basic"}{" "}
          subscription
        </p>
        <Button onClick={() => router.push("/dashboard/subscription")} className="mt-2 bg-orange hover:bg-orange-light">
          Upgrade Now
        </Button>
      </div>
    </div>
  )
}

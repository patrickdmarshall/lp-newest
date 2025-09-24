"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

export type SubscriptionTier = "free" | "basic" | "pro"

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  tier: SubscriptionTier
  recommended?: boolean
}

export interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null
  isLoading: boolean
  hasAccess: (feature: PremiumFeature) => boolean
  upgradeToPlan: (planId: string) => Promise<void>
  cancelSubscription: () => Promise<void>
  allPlans: SubscriptionPlan[]
}

export type PremiumFeature =
  | "messaging"
  | "advanced_profile"
  | "priority_booking"
  | "analytics"
  | "featured_listing"
  | "unlimited_applications"
  | "custom_branding"

// Define available plans
const artistPlans: SubscriptionPlan[] = [
  {
    id: "artist-free",
    name: "Free",
    description: "Get started with basic features",
    price: 0,
    tier: "free",
    features: ["Basic profile", "Browse opportunities", "Apply to 3 gigs per month", "Limited visibility"],
  },
  {
    id: "artist-basic",
    name: "Basic",
    description: "Essential tools for emerging artists",
    price: 9.99,
    tier: "basic",
    recommended: true,
    features: [
      "Enhanced profile",
      "Direct messaging with venues",
      "Unlimited applications",
      "Priority in search results",
      "Performance analytics",
    ],
  },
  {
    id: "artist-pro",
    name: "Pro",
    description: "Complete toolkit for professional artists",
    price: 19.99,
    tier: "pro",
    features: [
      "All Basic features",
      "Featured artist listing",
      "Advanced analytics",
      "Custom branding",
      "Priority support",
      "Early access to exclusive opportunities",
    ],
  },
]

const venuePlans: SubscriptionPlan[] = [
  {
    id: "venue-free",
    name: "Free",
    description: "Get started with basic features",
    price: 0,
    tier: "free",
    features: ["Basic venue profile", "Browse artists", "Post 1 opportunity per month", "Limited visibility"],
  },
  {
    id: "venue-basic",
    name: "Basic",
    description: "Essential tools for venues",
    price: 19.99,
    tier: "basic",
    recommended: true,
    features: [
      "Enhanced venue profile",
      "Direct messaging with artists",
      "Post up to 10 opportunities per month",
      "Basic analytics",
      "Featured in venue directory",
    ],
  },
  {
    id: "venue-pro",
    name: "Pro",
    description: "Complete toolkit for professional venues",
    price: 39.99,
    tier: "pro",
    features: [
      "All Basic features",
      "Unlimited opportunity postings",
      "Advanced artist search filters",
      "Custom branding",
      "Priority support",
      "Comprehensive analytics dashboard",
    ],
  },
]

// Feature access by tier
const featureAccess: Record<PremiumFeature, SubscriptionTier[]> = {
  messaging: ["basic", "pro"],
  advanced_profile: ["basic", "pro"],
  priority_booking: ["basic", "pro"],
  analytics: ["basic", "pro"],
  featured_listing: ["pro"],
  unlimited_applications: ["basic", "pro"],
  custom_branding: ["pro"],
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get all plans based on user role
  const allPlans = user?.role === "artist" ? artistPlans : venuePlans

  // Initialize subscription on user load
  useEffect(() => {
    const loadSubscription = async () => {
      if (!user) {
        setCurrentPlan(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        // In a real app, this would fetch from an API
        // For demo, we'll simulate a subscription based on user ID
        const planId =
          localStorage.getItem(`${user.id}_subscription`) || (user.role === "artist" ? "artist-free" : "venue-free")

        const plan = allPlans.find((p) => p.id === planId) || allPlans[0]
        setCurrentPlan(plan)
      } catch (error) {
        console.error("Failed to load subscription:", error)
        // Default to free plan on error
        setCurrentPlan(allPlans[0])
      } finally {
        setIsLoading(false)
      }
    }

    loadSubscription()
  }, [user, allPlans])

  // Check if user has access to a premium feature
  const hasAccess = (feature: PremiumFeature): boolean => {
    if (!currentPlan) return false

    const allowedTiers = featureAccess[feature]
    return allowedTiers.includes(currentPlan.tier)
  }

  // Upgrade to a new plan
  const upgradeToPlan = async (planId: string): Promise<void> => {
    if (!user) throw new Error("User must be logged in to upgrade")

    setIsLoading(true)

    try {
      // In a real app, this would call a payment API
      // For demo, we'll just update the local state
      const newPlan = allPlans.find((p) => p.id === planId)
      if (!newPlan) throw new Error("Invalid plan selected")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentPlan(newPlan)
      localStorage.setItem(`${user.id}_subscription`, planId)
    } catch (error) {
      console.error("Failed to upgrade plan:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Cancel subscription
  const cancelSubscription = async (): Promise<void> => {
    if (!user) throw new Error("User must be logged in to cancel")

    setIsLoading(true)

    try {
      // In a real app, this would call an API
      // For demo, we'll just revert to the free plan
      const freePlan = allPlans.find((p) => p.tier === "free")
      if (!freePlan) throw new Error("Free plan not found")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentPlan(freePlan)
      localStorage.setItem(`${user.id}_subscription`, freePlan.id)
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        isLoading,
        hasAccess,
        upgradeToPlan,
        cancelSubscription,
        allPlans,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}

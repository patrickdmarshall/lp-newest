"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { useRouter, usePathname } from "next/navigation"

interface Profile {
  id: string
  name: string
  email: string
  role: "artist" | "venue" | "admin" | "pending_venue"
  slug?: string
  bio?: string
  city?: string
  state?: string
  profile_picture?: string
  genres?: string[]
  social_links?: { platform: string; url: string }[]
  availability?: { date: string; start_time: string; end_time: string }[]
  travel_plans?: { location: string; start_date: string; end_date: string; notes?: string }[]
  location?: string
  genre?: string
  instagram?: string
  spotify?: string
  youtube?: string
  website?: string
  phone?: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string; data?: Profile }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: "Not implemented" }),
  signUp: async () => ({ error: "Not implemented" }),
  signOut: async () => {},
  updateProfile: async () => ({ error: "Not implemented" }),
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [redirectRef, setRedirectRef] = useState(false)

  // Load user session
  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        setUser(session?.user ?? null)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Handle different auth events properly
      switch (event) {
        case "INITIAL_SESSION":
          setUser(session?.user ?? null)
          setLoading(false)
          break
        case "SIGNED_IN":
          setUser(session?.user ?? null)
          setRedirectRef(false)
          break
        case "SIGNED_OUT":
          setUser(null)
          setProfile(null)
          setRedirectRef(false)
          break
        case "TOKEN_REFRESHED":
          setUser(session?.user ?? null)
          break
        case "USER_UPDATED":
          setUser(session?.user ?? null)
          break
        case "PASSWORD_RECOVERY":
          break
        default:
          break
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load user profile when user changes
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        setProfileLoading(true)
        try {
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (data && !error) {
            setProfile(data)
          } else if (error) {
            if (error.code !== "PGRST116") {
              // Handle error
            }
            setProfile(null)
          }
        } catch (err) {
          setProfile(null)
        } finally {
          setProfileLoading(false)
        }
      } else {
        setProfile(null)
        setProfileLoading(false)
      }
    }
    loadProfile()
  }, [user])

  // Redirect logic
  useEffect(() => {
    if (loading || profileLoading) return

    if (user && profile && !redirectRef) {
      const authPages = ["/sign-in", "/sign-up"]
      const isAuthPage = authPages.includes(pathname)

      if (isAuthPage) {
        setRedirectRef(true)
        let targetDashboard = "/dashboard"
        if (profile.role === "admin") targetDashboard = "/dashboard/admin"
        else if (profile.role === "venue") targetDashboard = "/dashboard/venue"
        else if (profile.role === "pending_venue") targetDashboard = "/application-status/venue"

        router.push(targetDashboard)
      }
    }
  }, [user, profile, loading, profileLoading, router, pathname, redirectRef])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }
      return {}
    } catch (error) {
      return { error: "An unexpected error occurred" }
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        const profileData = {
          id: data.user.id,
          email: email,
          name: userData.name || "",
          role: userData.role || "artist",
          bio: userData.bio || "",
          location: userData.location || "",
          genre: userData.genre || "",
          instagram: userData.instagram || "",
          spotify: userData.spotify || "",
          phone: userData.phone || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const { error: profileError } = await supabase.from("profiles").insert(profileData)

        if (profileError) {
          return { error: "Account created but profile setup failed. Please contact support." }
        }
      }

      return {}
    } catch (error) {
      return { error: "An unexpected error occurred during sign up" }
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      setProfile(null)
      setRedirectRef(false)

      await supabase.auth.signOut()
    } catch (error) {
      // Handle error silently
    }
    window.location.href = "/"
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user?.id) return { error: "Not authenticated" }

    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase.from("profiles").update(updateData).eq("id", user.id).select().single()

      if (error) {
        return { error: error.message }
      }

      if (data) {
        setProfile(data)
      }

      return { data }
    } catch (err) {
      return { error: "An unexpected error occurred" }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading: loading || profileLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

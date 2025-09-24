"use server"

import { supabase } from "@/lib/supabase"

export async function getAdminDashboardStats() {
  try {
    // Get total users
    const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    // Get active opportunities
    const { count: activeOpportunities } = await supabase
      .from("opportunities")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")

    // Get total applications
    const { count: totalApplications } = await supabase.from("applications").select("*", { count: "exact", head: true })

    // Get confirmed shows (approved applications)
    const { count: confirmedShows } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")

    // Get pending venue registrations
    const { data: pendingVenueRegistrations } = await supabase
      .from("venue_registrations")
      .select("*")
      .eq("status", "pending_approval")
      .order("submitted_at", { ascending: false })

    return {
      totalUsers: totalUsers || 0,
      activeOpportunities: activeOpportunities || 0,
      totalApplications: totalApplications || 0,
      confirmedShows: confirmedShows || 0,
      pendingVenueRegistrations: pendingVenueRegistrations || [],
    }
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error)
    return {
      totalUsers: 0,
      activeOpportunities: 0,
      totalApplications: 0,
      confirmedShows: 0,
      pendingVenueRegistrations: [],
    }
  }
}

export async function getArtistDashboardStats(artistId: string) {
  try {
    // Get artist's applications
    const { data: applications, count: totalApplied } = await supabase
      .from("applications")
      .select("*, opportunities(title, venue_name_manual, event_date)", { count: "exact" })
      .eq("applicant_id", artistId)
      .order("applied_at", { ascending: false })

    // Get pending applications
    const { count: pendingApplications } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("applicant_id", artistId)
      .eq("status", "pending")

    // Get confirmed shows
    const { count: confirmedShows } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("applicant_id", artistId)
      .eq("status", "approved")

    // Get profile completion percentage
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", artistId).single()

    let profileCompletion = 0
    if (profile) {
      const fields = ["name", "bio", "city", "state", "genres", "social_links"]
      const completedFields = fields.filter((field) => {
        const value = profile[field]
        return value && (Array.isArray(value) ? value.length > 0 : value.trim().length > 0)
      })
      profileCompletion = Math.round((completedFields.length / fields.length) * 100)
    }

    return {
      totalApplied: totalApplied || 0,
      pendingApplications: pendingApplications || 0,
      confirmedShows: confirmedShows || 0,
      profileCompletion,
      recentApplications: applications?.slice(0, 5) || [],
    }
  } catch (error) {
    console.error("Error fetching artist dashboard stats:", error)
    return {
      totalApplied: 0,
      pendingApplications: 0,
      confirmedShows: 0,
      profileCompletion: 0,
      recentApplications: [],
    }
  }
}

export async function getVenueDashboardStats(venueId: string) {
  try {
    // Get venue's opportunities
    const { data: opportunities } = await supabase
      .from("opportunities")
      .select("id")
      .eq("created_by_profile_id", venueId)

    const opportunityIds = opportunities?.map((o) => o.id) || []

    // Get total applicants to venue's opportunities
    const { count: totalApplicants } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .in("opportunity_id", opportunityIds)

    // Get confirmed shows
    const { count: confirmedShows } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .in("opportunity_id", opportunityIds)
      .eq("status", "approved")

    // Get pending applications
    const { data: pendingApplications, count: pendingCount } = await supabase
      .from("applications")
      .select("*, profiles(name, profile_picture), opportunities(title, event_date)", { count: "exact" })
      .in("opportunity_id", opportunityIds)
      .eq("status", "pending")
      .order("applied_at", { ascending: false })

    // Get profile completion
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", venueId).single()

    let profileCompletion = 0
    if (profile) {
      const fields = ["name", "bio", "city", "state"]
      const completedFields = fields.filter((field) => {
        const value = profile[field]
        return value && value.trim().length > 0
      })
      profileCompletion = Math.round((completedFields.length / fields.length) * 100)
    }

    return {
      totalApplicants: totalApplicants || 0,
      confirmedShows: confirmedShows || 0,
      pendingApplications: pendingCount || 0,
      profileCompletion,
      recentApplications: pendingApplications?.slice(0, 5) || [],
    }
  } catch (error) {
    console.error("Error fetching venue dashboard stats:", error)
    return {
      totalApplicants: 0,
      confirmedShows: 0,
      pendingApplications: 0,
      profileCompletion: 0,
      recentApplications: [],
    }
  }
}

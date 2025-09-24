"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// --- Profile Management ---
const profileStatusSchema = z.enum(["pending", "approved", "rejected"])

export async function updateProfileStatus(profileId: string, status: z.infer<typeof profileStatusSchema>) {
  const validation = profileStatusSchema.safeParse(status)
  if (!validation.success) {
    return { success: false, error: "Invalid status provided." }
  }

  const { data, error } = await supabase.from("profiles").update({ status }).eq("id", profileId).select().single()

  if (error) {
    console.error("Error updating profile status:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin-dashboard")
  return { success: true, data }
}

// --- Opportunity Management ---
const opportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  venue_name: z.string().min(1, "Venue name is required"),
  description: z.string().min(1, "Description is required"),
  event_date: z.string().min(1, "Event date is required"),
  event_time: z.string().optional(),
  genres: z.array(z.string()).optional(),
  opportunity_type: z.enum(["Headliner", "Supporting", "Open Mic"]), // Added "Open Mic" to enum
  status: z.enum(["active", "closed", "draft"]),
  application_deadline: z.string().optional().nullable(),
  set_length: z.string().optional(),
  location: z.string().optional(),
})

export async function createOpportunityAction(params: z.infer<typeof opportunitySchema>) {
  const validation = opportunitySchema.safeParse(params)
  if (!validation.success) {
    console.error("Validation error:", validation.error.flatten().fieldErrors)
    return { success: false, error: validation.error.flatten().fieldErrors }
  }

  const { data, error } = await supabase.from("opportunities").insert([params]).select().single()

  if (error) {
    console.error("Error creating opportunity:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin-dashboard")
  revalidatePath("/opportunities")
  return { success: true, data }
}

export async function updateOpportunityAction(id: string, params: Partial<z.infer<typeof opportunitySchema>>) {
  const { data, error } = await supabase.from("opportunities").update(params).eq("id", id).select().single()

  if (error) {
    console.error("Error updating opportunity:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin-dashboard")
  revalidatePath("/opportunities")
  return { success: true, data }
}

// --- Application Management ---
const applicationStatusSchema = z.enum(["pending", "approved", "declined"])

export async function updateOpportunityApplicationStatus(
  applicationId: string,
  status: z.infer<typeof applicationStatusSchema>,
) {
  const validation = applicationStatusSchema.safeParse(status)
  if (!validation.success) {
    return { success: false, error: "Invalid status provided." }
  }

  const { data, error } = await supabase
    .from("opportunity_applications")
    .update({ status })
    .eq("id", applicationId)
    .select()
    .single()

  if (error) {
    console.error("Error updating application status:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin-dashboard")
  // Optionally revalidate artist dashboard
  revalidatePath("/dashboard")
  return { success: true, data }
}

// --- Data Fetching for Dashboard ---
export async function fetchAdminDashboardData() {
  try {
    const profilesPromise = supabase
      .from("profiles")
      .select("id, name, email, role, city, state, created_at, profile_picture, status")
      .order("created_at", { ascending: false })

    const opportunitiesPromise = supabase.from("opportunities").select("*").order("created_at", { ascending: false })

    const applicationsPromise = supabase
      .from("opportunity_applications")
      .select(
        `
        id,
        status,
        applied_at,
        message,
        artist:profiles (id, name, email, profile_picture),
        opportunity:opportunities (id, title, venue_name)
      `,
      )
      .order("applied_at", { ascending: false })

    const [
      { data: profiles, error: profilesError },
      { data: opportunities, error: opportunitiesError },
      { data: applications, error: applicationsError },
    ] = await Promise.all([profilesPromise, opportunitiesPromise, applicationsPromise])

    if (profilesError || opportunitiesError || applicationsError) {
      console.error("Error fetching admin data:", { profilesError, opportunitiesError, applicationsError })
      return {
        profiles: [],
        opportunities: [],
        applications: [],
        stats: {
          totalUsers: 0,
          totalArtists: 0,
          totalVenues: 0,
          totalOpportunities: 0,
          activeOpportunities: 0,
          totalApplications: 0,
          pendingApplications: 0,
          approvedApplications: 0,
        },
      }
    }

    // Calculate real stats from actual data
    const stats = {
      totalUsers: profiles?.length || 0,
      totalArtists: profiles?.filter((p) => p.role === "artist").length || 0,
      totalVenues: profiles?.filter((p) => p.role === "venue").length || 0,
      totalOpportunities: opportunities?.length || 0,
      activeOpportunities: opportunities?.filter((o) => o.status === "active").length || 0,
      totalApplications: applications?.length || 0,
      pendingApplications: applications?.filter((a) => a.status === "pending").length || 0,
      approvedApplications: applications?.filter((a) => a.status === "approved").length || 0,
    }

    return {
      profiles: profiles || [],
      opportunities: opportunities || [],
      applications: applications || [],
      stats,
    }
  } catch (error) {
    console.error("Error in fetchAdminDashboardData:", error)
    return {
      profiles: [],
      opportunities: [],
      applications: [],
      stats: {
        totalUsers: 0,
        totalArtists: 0,
        totalVenues: 0,
        totalOpportunities: 0,
        activeOpportunities: 0,
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
      },
    }
  }
}

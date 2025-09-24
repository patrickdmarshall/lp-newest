"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// For Artists applying to specific show opportunities
export interface SubmitShowApplicationParams {
  applicant_id: string // This should be the profile ID of the artist
  opportunity_id: string
  cover_letter?: string
  // Add other relevant fields from your schema for show applications
}

export async function submitShowApplication(params: SubmitShowApplicationParams) {
  const { data, error } = await supabase
    .from("applications") // Assuming 'applications' is for artist-show applications
    .insert({
      ...params,
      status: "pending",
      applied_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error submitting show application:", error)
    return { success: false, error: error.message }
  }
  revalidatePath(`/opportunities/${params.opportunity_id}`)
  revalidatePath("/dashboard") // Artist dashboard
  // Potentially revalidate venue dashboard if they see applications immediately
  return { success: true, data }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "approved" | "declined" | "waitlisted", // etc.
  reviewerId: string, // ID of the venue admin or platform admin who reviewed
) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      status: status,
      reviewed_by: reviewerId, // Assuming a 'reviewed_by' column
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single()

  if (error) {
    console.error("Error updating application status:", error)
    return { success: false, error: error.message }
  }
  // Revalidate paths where this application might be visible
  revalidatePath("/dashboard") // Artist dashboard
  revalidatePath("/admin-dashboard") // Venue/Admin dashboard
  return { success: true, data }
}

export async function approveVenueRegistration(registrationId: string, approverId: string) {
  const { data, error } = await supabase
    .from("venue_registrations")
    .update({
      status: "approved",
      approved_by: approverId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", registrationId)
    .select()
    .single()

  if (error) {
    console.error("Error approving venue registration:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin-dashboard")
  return { success: true, data }
}

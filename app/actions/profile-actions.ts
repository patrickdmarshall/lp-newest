"use server"

import { supabase } from "@/lib/supabase"
import type { UserProfile } from "@/contexts/auth-context"
import { revalidatePath } from "next/cache"

export async function getProfileByUserId(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Failed to fetch profile: ${error.message} (Code: ${error.code})`)
    }
    return data as UserProfile
  } catch (err) {
    if (err instanceof Error) throw err
    throw new Error("An unexpected error occurred while fetching profile.")
  }
}

export async function createOrUpdateProfile(
  userId: string,
  email: string,
  profileData: Partial<UserProfile>,
): Promise<UserProfile> {
  const existingProfile = await getProfileByUserId(userId)

  const dataToUpsert = {
    id: userId,
    email: email,
    name: profileData.name || email.split("@")[0],
    role: profileData.role || "artist",
    slug: profileData.slug || (profileData.name || email.split("@")[0]).toLowerCase().replace(/\s+/g, "-"),
    bio: profileData.bio || "",
    genres: profileData.genres || [],
    social_links: profileData.social_links || [],
    availability: profileData.availability || [],
    travel_plans: profileData.travel_plans || [],
    city: profileData.city || "",
    state: profileData.state || "",
    profile_picture: profileData.profile_picture || "",
    updated_at: new Date().toISOString(),
    ...profileData,
  }

  if (!existingProfile) {
    dataToUpsert.created_at = new Date().toISOString()
  }

  const { data, error } = await supabase.from("profiles").upsert(dataToUpsert, { onConflict: "id" }).select().single()

  if (error) {
    throw new Error(`Failed to create/update profile: ${error.message}`)
  }

  revalidatePath("/admin-dashboard")
  revalidatePath("/dashboard")
  if (profileData.slug) revalidatePath(`/artists/${profileData.slug}`)

  return data as UserProfile
}

export async function updateProfileDetails(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
  if (updates.name && !updates.slug) {
    updates.slug = updates.name.toLowerCase().replace(/\s+/g, "-")
  }
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }
  revalidatePath(`/dashboard/profile`)
  revalidatePath(`/admin-dashboard/users`)
  if (data.slug) revalidatePath(`/artists/${data.slug}`)
  return data as UserProfile
}

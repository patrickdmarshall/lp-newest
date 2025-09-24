import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { applicationId } = body

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 })
    }

    // Get user's profile to check email
    const { data: profile } = await supabase.from("profiles").select("email").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get application with related data
    const { data: application } = await supabase
      .from("applications")
      .select(`
        *,
        opportunities (
          *,
          venues (
            *,
            venue_admins (
              email
            )
          )
        ),
        profiles (
          name,
          email
        )
      `)
      .eq("id", applicationId)
      .single()

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Check if user is authorized (venue admin for this opportunity's venue)
    const venueAdmins = application.opportunities?.venues?.venue_admins || []
    const isAuthorized = venueAdmins.some((admin: any) => admin.email === profile.email)

    if (!isAuthorized) {
      return NextResponse.json({ error: "Not authorized to create deal memo for this application" }, { status: 403 })
    }

    // Check if application is approved
    if (application.application_status !== "approved") {
      return NextResponse.json({ error: "Application must be approved before creating deal memo" }, { status: 400 })
    }

    // Generate deal memo terms
    const venue = application.opportunities.venues
    const opportunity = application.opportunities
    const artist = application.profiles

    const terms = {
      artist_name: application.artist_name || artist.name,
      venue_name: venue.venue_name,
      event_date: opportunity.event_date,
      event_time: opportunity.event_time,
      performance_type: opportunity.type,
      genre: opportunity.genre,
      compensation: "Door split + merchandise sales", // Default compensation
      requirements: [
        "Professional performance",
        "Arrive for sound check 1 hour before show",
        "Provide own instruments and equipment",
        "Promote show on social media",
      ],
    }

    // Create deal memo
    const dealMemoData = {
      application_id: applicationId,
      venue_id: opportunity.venue_id,
      artist_id: application.applicant_id,
      terms: JSON.stringify(terms),
      status: "draft",
      created_at: new Date().toISOString(),
    }

    const { data: dealMemo, error: insertError } = await supabase
      .from("deal_memos")
      .insert(dealMemoData)
      .select()
      .single()

    if (insertError) {
      console.error("Insert error:", insertError)
      return NextResponse.json({ error: "Failed to create deal memo" }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      id: dealMemo.id,
      terms,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

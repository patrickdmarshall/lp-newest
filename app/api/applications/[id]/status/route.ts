import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const { status } = body
    const applicationId = params.id

    if (!status || !["approved", "declined"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Get user's profile to check email
    const { data: profile } = await supabase.from("profiles").select("email").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get application and check authorization
    const { data: application } = await supabase
      .from("applications")
      .select(`
        id,
        opportunities (
          id,
          venue_id,
          venues (
            id,
            venue_admins (
              email
            )
          )
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
      return NextResponse.json({ error: "Not authorized to update this application" }, { status: 403 })
    }

    // Update the application status
    const { data: updatedApplication, error: updateError } = await supabase
      .from("applications")
      .update({
        application_status: status,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", applicationId)
      .select()
      .single()

    if (updateError) {
      console.error("Update error:", updateError)
      return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
    }

    return NextResponse.json({ success: true, application: updatedApplication })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

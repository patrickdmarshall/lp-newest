import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { id } = params

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

    if (!status || !["open", "closed", "filled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Get user's profile to check email
    const { data: profile } = await supabase.from("profiles").select("email").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Check if user is authorized to update this opportunity's status
    const { data: opportunity } = await supabase
      .from("opportunities")
      .select(`
        id,
        venue_id,
        venues (
          id,
          venue_admins (
            email
          )
        )
      `)
      .eq("id", id)
      .single()

    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 })
    }

    // Check if user is authorized (venue admin for this opportunity's venue)
    const venueAdmins = opportunity.venues?.venue_admins || []
    const isAuthorized = venueAdmins.some((admin: any) => admin.email === profile.email)

    if (!isAuthorized) {
      return NextResponse.json({ error: "Not authorized to update this opportunity" }, { status: 403 })
    }

    // Update the opportunity status
    const { data: updatedOpportunity, error: updateError } = await supabase
      .from("opportunities")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("Update error:", updateError)
      return NextResponse.json({ error: "Failed to update opportunity status" }, { status: 500 })
    }

    return NextResponse.json({ success: true, opportunity: updatedOpportunity })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

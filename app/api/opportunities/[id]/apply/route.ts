import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if opportunity exists and is open
    const { data: opportunity, error: oppError } = await supabase
      .from("opportunities")
      .select("id, status")
      .eq("id", id)
      .single()

    if (oppError || !opportunity) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 })
    }

    if (opportunity.status !== "open") {
      return NextResponse.json({ error: "This opportunity is no longer accepting applications" }, { status: 400 })
    }

    // Check if user has already applied
    const { data: existingApplication } = await supabase
      .from("applications")
      .select("id")
      .eq("opportunity_id", id)
      .eq("applicant_id", user.id)
      .single()

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied to this opportunity" }, { status: 400 })
    }

    // Create the application
    const applicationData = {
      opportunity_id: id,
      applicant_id: user.id,
      application_status: "pending",
      artist_name: body.artistName,
      email: body.email,
      phone: body.phone,
      genre: body.genre,
      experience: body.experience,
      social_media: body.socialMedia,
      cover_letter: body.coverLetter,
      applied_at: new Date().toISOString(),
    }

    const { data: application, error: insertError } = await supabase
      .from("applications")
      .insert(applicationData)
      .select()
      .single()

    if (insertError) {
      console.error("Insert error:", insertError)
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    return NextResponse.json({ success: true, application })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

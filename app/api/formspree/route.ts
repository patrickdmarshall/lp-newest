import { NextResponse } from "next/server"

// Known Formspree IDs discovered in your project
// contact: xgvyqdyo (components/contact-form.tsx)
// artist:  xkgbyawv (components/artist-sign-up-form.tsx and apply/artist)
// venue:   xgvablkk (components/venue-form.tsx)
// venue-apply currently posted to artist form id (bug) — we fix by routing to venue here

// Optional env for opportunities. Fallback to contact so you still receive them.
// Add FORMSPREE_OPPORTUNITY_FORM_ID in your project settings when ready.
const FORMS: Record<string, string> = {
  contact: "xgvyqdyo",
  artist: "xkgbyawv",
  venue: "xgvablkk",
  opportunity: process.env.FORMSPREE_OPPORTUNITY_FORM_ID || "xgvyqdyo",
}

export async function POST(req: Request) {
  try {
    const incoming = await req.formData()

    // Require a "form" type
    const formType = (incoming.get("form") || "").toString().toLowerCase()
    if (!formType || !FORMS[formType]) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Missing or invalid "form" type. Use one of: contact, artist, venue, opportunity.',
        },
        { status: 400 }
      )
    }

    // Build a new payload to send on to Formspree
    // We forward everything the client sent, and we also add a robust default subject if not present
    const forward = new FormData()
    let hasSubject = false
    for (const [key, value] of incoming.entries()) {
      if (key === "form") continue // internal only
      if (key === "_subject") hasSubject = true
      forward.append(key, value as string | Blob)
    }
    if (!hasSubject) {
      forward.append("_subject", `Level Play ${formType[0].toUpperCase() + formType.slice(1)} Submission`)
    }

    // Improve deliverability and traceability
    forward.append("_format", (incoming.get("_format") as string) || "plain")
    if (!forward.has("_replyto") && forward.has("email")) {
      forward.append("_replyto", (forward.get("email") as string) || "")
    }

    const formId = FORMS[formType]
    const target = `https://formspree.io/f/${formId}`

    const res = await fetch(target, {
      method: "POST",
      body: forward,
      headers: { Accept: "application/json" },
      // Do not set Content-Type for multipart; fetch handles it for FormData
    })

    // Pass through status and basic message
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return NextResponse.json(
        {
          ok: false,
          error: "Formspree forwarding failed",
          status: res.status,
          detail: text?.slice(0, 500) || undefined,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, forwardedTo: formType }, { status: 200 })
  } catch (err) {
    console.error("Formspree proxy error:", err)
    return NextResponse.json({ ok: false, error: "Unexpected server error" }, { status: 500 })
  }
}

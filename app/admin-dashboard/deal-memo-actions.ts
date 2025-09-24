"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface DealMemoData {
  artistName: string
  venue: string
  date: string
  setLength: string
  compensation?: string
  artistEmail: string
}

function generateDealMemoHTML(data: DealMemoData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deal Memo - ${data.artistName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .memo-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1em;
        }
        .content {
            padding: 40px;
        }
        .deal-details {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 30px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
            font-size: 1.1em;
        }
        .detail-value {
            font-size: 1.1em;
            color: #212529;
            font-weight: 500;
        }
        .footer {
            background: #343a40;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer p {
            margin: 5px 0;
            opacity: 0.8;
        }
        .logo {
            font-size: 1.5em;
            font-weight: bold;
            color: #ff6b35;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .content, .header {
                padding: 20px;
            }
            .deal-details {
                padding: 20px;
            }
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="memo-container">
        <div class="header">
            <h1>Deal Memo</h1>
            <p>Performance Agreement</p>
        </div>
        
        <div class="content">
            <h2 style="color: #ff6b35; margin-bottom: 30px;">Performance Details</h2>
            
            <div class="deal-details">
                <div class="detail-row">
                    <span class="detail-label">Artist/Band:</span>
                    <span class="detail-value">${data.artistName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Venue:</span>
                    <span class="detail-value">${data.venue}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Performance Date:</span>
                    <span class="detail-value">${new Date(data.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Set Length:</span>
                    <span class="detail-value">${data.setLength}</span>
                </div>
                ${
                  data.compensation
                    ? `
                <div class="detail-row">
                    <span class="detail-label">Compensation:</span>
                    <span class="detail-value">${data.compensation}</span>
                </div>
                `
                    : ""
                }
            </div>
            
            <div style="margin-top: 40px; padding: 20px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
                <h3 style="margin-top: 0; color: #1976d2;">Next Steps</h3>
                <p style="margin-bottom: 0;">Please review the details above and confirm your participation through your Level Play dashboard. If you have any questions or need to make changes, please contact us immediately.</p>
            </div>
        </div>
        
        <div class="footer">
            <div class="logo">Level Play</div>
            <p>Connecting Artists & Venues</p>
            <p style="font-size: 0.9em;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
    </div>
</body>
</html>
  `
}

async function uploadDealMemoToStorage(html: string, applicationId: string): Promise<string> {
  try {
    // Convert HTML to blob
    const blob = new Blob([html], { type: "text/html" })
    const fileName = `deal_memos/deal_memo_${applicationId}_${Date.now()}.html`

    // Upload to Supabase storage
    const { data, error } = await supabase.storage.from("deal-memos").upload(fileName, blob, {
      contentType: "text/html",
      upsert: false,
    })

    if (error) {
      console.error("Storage upload error:", error)
      throw error
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("deal-memos").getPublicUrl(fileName)

    return urlData.publicUrl
  } catch (error) {
    console.error("Error uploading deal memo:", error)
    // Fallback to data URL if storage fails
    return `data:text/html;base64,${Buffer.from(html).toString("base64")}`
  }
}

export async function approveApplicationAndGenerateMemo(applicationId: string) {
  try {
    // Get application details with opportunity info
    const { data: application, error: fetchError } = await supabase
      .from("opportunity_applications")
      .select(`
        *,
        opportunity:opportunities (
          title,
          venue_name,
          event_date,
          set_length
        )
      `)
      .eq("id", applicationId)
      .single()

    if (fetchError || !application) {
      return { success: false, error: "Application not found" }
    }

    // Generate deal memo HTML
    const memoData: DealMemoData = {
      artistName: application.artist_name,
      venue: application.opportunity.venue_name,
      date: application.opportunity.event_date,
      setLength: application.opportunity.set_length || "Not specified",
      compensation: application.compensation || undefined,
      artistEmail: application.email,
    }

    const memoHTML = generateDealMemoHTML(memoData)

    // Upload to Supabase storage and get public URL
    const memoUrl = await uploadDealMemoToStorage(memoHTML, applicationId)

    // Update application status and add memo URL
    const { error: updateError } = await supabase
      .from("opportunity_applications")
      .update({
        status: "approved",
        deal_memo_url: memoUrl,
      })
      .eq("id", applicationId)

    if (updateError) {
      return { success: false, error: "Failed to update application" }
    }

    // Send email via Formspree
    const emailData = new FormData()
    emailData.append("to", application.email)
    emailData.append("subject", `Your Level Play Application Has Been Approved!`)
    emailData.append(
      "message",
      `
Hi ${application.artist_name},

Great news! Your application for "${application.opportunity.title}" at ${application.opportunity.venue_name} has been approved.

Please log into your Level Play dashboard to view your deal memo and confirm your participation.

Performance Details:
- Venue: ${application.opportunity.venue_name}
- Date: ${new Date(application.opportunity.event_date).toLocaleDateString()}
- Set Length: ${application.opportunity.set_length || "Not specified"}

Deal Memo: ${memoUrl}

We're excited to have you perform!

Best regards,
The Level Play Team
    `,
    )

    await fetch("https://formspree.io/f/xgvablkk", {
      method: "POST",
      body: emailData,
    })

    revalidatePath("/admin-dashboard")
    revalidatePath("/dashboard")

    return { success: true, message: "Application approved and memo generated" }
  } catch (error) {
    console.error("Error approving application:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

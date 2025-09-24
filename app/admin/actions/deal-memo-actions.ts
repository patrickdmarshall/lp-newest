"use server"

import { supabase } from "@/lib/supabase"
import htmlPdf from "html-pdf-node"

export interface DealMemoData {
  // Basic Info
  venue: string
  artist: string
  opportunity: string
  dealType: "guarantee" | "percentage" | "hybrid"

  // Financial Terms
  guaranteeAmount: string
  percentageSlip: string
  advanceFeesIncluded: boolean
  dayOfFeesIncluded: boolean
  sellableCapacity: string
  compTickets: string
  w9Required: boolean
  merchRate: string

  // Schedule
  loadInTime: string
  doorTime: string
  showDate: string
  soundcheckTime: string
  stageTime: string

  // Contacts
  productionContact: string
  billingPercentage: string

  // Status & Notes
  status: "pending" | "sent" | "signed"
  dealPoints: string
}

function generateDealMemoHTML(data: DealMemoData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deal Memo - ${data.artist}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.4;
          color: #000;
          background: #ffffff;
          padding: 40px;
          font-size: 12px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #ff6b35;
        }
        
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #ff6b35;
          margin-bottom: 5px;
        }
        
        .deal-memo-title {
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
          color: #000;
        }
        
        .form-section {
          margin-bottom: 20px;
        }
        
        .form-row {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
        }
        
        .form-row.half {
          width: 48%;
          display: inline-flex;
          margin-right: 4%;
        }
        
        .form-row.full {
          width: 100%;
        }
        
        .label {
          font-weight: bold;
          min-width: 120px;
          margin-right: 10px;
        }
        
        .field {
          border-bottom: 1px solid #000;
          flex: 1;
          min-height: 20px;
          padding-bottom: 2px;
        }
        
        .checkbox-group {
          display: flex;
          gap: 20px;
          margin: 10px 0;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .checkbox {
          width: 12px;
          height: 12px;
          border: 1px solid #000;
          display: inline-block;
          text-align: center;
          line-height: 10px;
          font-size: 10px;
        }
        
        .checkbox.checked {
          background: #000;
          color: white;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin: 20px 0 10px 0;
          text-decoration: underline;
        }
        
        .deal-type-section {
          margin: 15px 0;
        }
        
        .deal-type-options {
          display: flex;
          gap: 30px;
          margin: 10px 0;
        }
        
        .schedule-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 15px 0;
        }
        
        .contacts-section {
          margin: 20px 0;
        }
        
        .status-section {
          margin: 20px 0;
          border: 1px solid #000;
          padding: 10px;
        }
        
        .deal-points-section {
          margin: 20px 0;
          min-height: 100px;
        }
        
        .signature-section {
          margin-top: 50px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }
        
        .signature-box {
          text-align: center;
          padding: 20px 0;
        }
        
        .signature-line {
          border-bottom: 1px solid #000;
          width: 200px;
          margin: 30px auto 10px auto;
          height: 1px;
        }
        
        .date-line {
          border-bottom: 1px solid #000;
          width: 150px;
          margin: 20px auto;
          height: 1px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">LP</div>
      </div>
      
      <h1 class="deal-memo-title">DEAL MEMO</h1>
      
      <div class="form-section">
        <div class="form-row">
          <span class="label">Venue:</span>
          <span class="field">${data.venue}</span>
        </div>
        
        <div class="form-row">
          <span class="label">Artist:</span>
          <span class="field">${data.artist}</span>
        </div>
        
        <div class="form-row">
          <span class="label">Opportunity:</span>
          <span class="field">${data.opportunity}</span>
        </div>
      </div>
      
      <div class="deal-type-section">
        <div class="label">Deal Type:</div>
        <div class="deal-type-options">
          <div class="checkbox-item">
            <span class="checkbox ${data.dealType === "guarantee" ? "checked" : ""}">${data.dealType === "guarantee" ? "✓" : ""}</span>
            <span>Guarantee</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox ${data.dealType === "percentage" ? "checked" : ""}">${data.dealType === "percentage" ? "✓" : ""}</span>
            <span>Percentage</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox ${data.dealType === "hybrid" ? "checked" : ""}">${data.dealType === "hybrid" ? "✓" : ""}</span>
            <span>Hybrid</span>
          </div>
        </div>
      </div>
      
      <div class="form-section">
        <div class="form-row half">
          <span class="label">Guarantee Amount:</span>
          <span class="field">$${data.guaranteeAmount}</span>
        </div>
        <div class="form-row half">
          <span class="label">Percentage Slip:</span>
          <span class="field">${data.percentageSlip}%</span>
        </div>
      </div>
      
      <div class="checkbox-group">
        <div class="checkbox-item">
          <span class="checkbox ${data.advanceFeesIncluded ? "checked" : ""}">${data.advanceFeesIncluded ? "✓" : ""}</span>
          <span>Advance Fees Included</span>
        </div>
        <div class="checkbox-item">
          <span class="checkbox ${data.dayOfFeesIncluded ? "checked" : ""}">${data.dayOfFeesIncluded ? "✓" : ""}</span>
          <span>Day of Fees Included</span>
        </div>
      </div>
      
      <div class="form-section">
        <div class="form-row half">
          <span class="label">Sellable Capacity:</span>
          <span class="field">${data.sellableCapacity}</span>
        </div>
        <div class="form-row half">
          <span class="label">Comp Tickets:</span>
          <span class="field">${data.compTickets}</span>
        </div>
      </div>
      
      <div class="checkbox-group">
        <div class="checkbox-item">
          <span class="label">W-9 Required:</span>
          <div style="margin-left: 10px;">
            <span class="checkbox-item" style="margin-right: 15px;">
              <span class="checkbox ${data.w9Required ? "checked" : ""}">${data.w9Required ? "✓" : ""}</span>
              <span>Yes</span>
            </span>
            <span class="checkbox-item">
              <span class="checkbox ${!data.w9Required ? "checked" : ""}">${!data.w9Required ? "✓" : ""}</span>
              <span>No</span>
            </span>
          </div>
        </div>
      </div>
      
      <div class="form-row">
        <span class="label">Merch Rate:</span>
        <span class="field">${data.merchRate}%</span>
      </div>
      
      <div class="section-title">Schedule</div>
      <div class="schedule-grid">
        <div class="form-row">
          <span class="label">Load In Time:</span>
          <span class="field">${data.loadInTime}</span>
        </div>
        <div class="form-row">
          <span class="label">Door Time:</span>
          <span class="field">${data.doorTime}</span>
        </div>
        <div class="form-row">
          <span class="label">Show Date:</span>
          <span class="field">${data.showDate}</span>
        </div>
        <div class="form-row">
          <span class="label">Soundcheck Time:</span>
          <span class="field">${data.soundcheckTime}</span>
        </div>
        <div class="form-row">
          <span class="label">Stage Time:</span>
          <span class="field">${data.stageTime}</span>
        </div>
      </div>
      
      <div class="section-title">Contacts</div>
      <div class="contacts-section">
        <div class="form-row">
          <span class="label">Production Contact:</span>
          <span class="field">${data.productionContact}</span>
        </div>
        <div class="form-row">
          <span class="label">Billing Percentage:</span>
          <span class="field">${data.billingPercentage}%</span>
        </div>
      </div>
      
      <div class="status-section">
        <div class="label">Status: ${data.status.toUpperCase()}</div>
      </div>
      
      <div class="section-title">Deal Points</div>
      <div class="deal-points-section">
        <div class="field" style="min-height: 80px; border: 1px solid #000; padding: 10px;">
          ${data.dealPoints}
        </div>
      </div>
      
      <div class="signature-section">
        <div class="signature-box">
          <div class="signature-line"></div>
          <div>Venue Representative</div>
          <div class="date-line"></div>
          <div>Date</div>
        </div>
        <div class="signature-box">
          <div class="signature-line"></div>
          <div>Artist Representative</div>
          <div class="date-line"></div>
          <div>Date</div>
        </div>
      </div>
    </body>
    </html>
  `
}

async function convertHtmlToPdfBuffer(html: string): Promise<Buffer> {
  const options = {
    format: "A4",
    border: {
      top: "0.5in",
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
  }

  const file = { content: html }
  const pdfBuffer = await htmlPdf.generatePdf(file, options)
  return pdfBuffer
}

export async function saveDealMemo(data: DealMemoData, applicationId?: string) {
  try {
    const { data: memo, error } = await supabase
      .from("deal_memos")
      .upsert({
        application_id: applicationId,
        ...data,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, memo }
  } catch (error) {
    console.error("Error saving deal memo:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendDealMemo(data: DealMemoData, applicationId?: string) {
  try {
    // Generate HTML and convert to PDF
    const html = generateDealMemoHTML(data)
    const pdfBuffer = await convertHtmlToPdfBuffer(html)

    // Upload PDF to Supabase Storage
    const fileName = `deal-memo-${Date.now()}.pdf`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("deal-memos")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      })

    if (uploadError) {
      throw new Error(`Failed to upload PDF: ${uploadError.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("deal-memos").getPublicUrl(fileName)
    const dealMemoUrl = urlData.publicUrl

    // Save memo to database
    const saveResult = await saveDealMemo({ ...data, status: "sent" }, applicationId)
    if (!saveResult.success) {
      return saveResult
    }

    return { success: true, memo: saveResult.memo, pdfUrl: dealMemoUrl }
  } catch (error) {
    console.error("Error sending deal memo:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getDealMemo(applicationId: string) {
  try {
    const { data, error } = await supabase.from("deal_memos").select("*").eq("application_id", applicationId).single()

    if (error && error.code !== "PGRST116") throw error

    return { success: true, memo: data }
  } catch (error) {
    console.error("Error fetching deal memo:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

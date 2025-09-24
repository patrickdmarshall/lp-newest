"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, FileText, Download, Upload } from "lucide-react"
import { DealMemoForm } from "@/components/deal-memo-form"
import { toast } from "@/hooks/use-toast"

interface DealMemo {
  id: string
  venue: string
  artist: string
  opportunity: string
  dealType: "guarantee" | "percentage" | "hybrid"
  guaranteeAmount: string
  percentageSlip: string
  advanceFeesIncluded: boolean
  dayOfFeesIncluded: boolean
  sellableCapacity: string
  compTickets: string
  w9Required: boolean
  merchRate: string
  loadInTime: string
  doorTime: string
  showDate: string
  soundcheckTime: string
  stageTime: string
  productionContact: string
  billingPercentage: string
  status: "pending" | "sent" | "signed"
  dealPoints: string
  createdAt: string
}

export function DealMemosTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateAndExport = (memoData: DealMemo) => {
    // Export immediately after creation
    exportToPDF(memoData)
    setIsCreateDialogOpen(false)
    toast({
      title: "Deal memo exported",
      description: "The deal memo has been generated and is ready for download.",
    })
  }

  const exportToPDF = (memo: DealMemo) => {
    // Create a printable version
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Deal Memo - ${memo.artist}</title>
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
                <span class="field">${memo.venue}</span>
              </div>
              
              <div class="form-row">
                <span class="label">Artist:</span>
                <span class="field">${memo.artist}</span>
              </div>
              
              <div class="form-row">
                <span class="label">Opportunity:</span>
                <span class="field">${memo.opportunity}</span>
              </div>
            </div>
            
            <div class="deal-type-section">
              <div class="label">Deal Type:</div>
              <div class="deal-type-options">
                <div class="checkbox-item">
                  <span class="checkbox ${memo.dealType === "guarantee" ? "checked" : ""}">${memo.dealType === "guarantee" ? "✓" : ""}</span>
                  <span>Guarantee</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox ${memo.dealType === "percentage" ? "checked" : ""}">${memo.dealType === "percentage" ? "✓" : ""}</span>
                  <span>Percentage</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox ${memo.dealType === "hybrid" ? "checked" : ""}">${memo.dealType === "hybrid" ? "✓" : ""}</span>
                  <span>Hybrid</span>
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <div class="form-row half">
                <span class="label">Guarantee Amount:</span>
                <span class="field">$${memo.guaranteeAmount}</span>
              </div>
              <div class="form-row half">
                <span class="label">Percentage Split:</span>
                <span class="field">${memo.percentageSlip}%</span>
              </div>
            </div>
            
            <div class="checkbox-group">
              <div class="checkbox-item">
                <span class="checkbox ${memo.advanceFeesIncluded ? "checked" : ""}">${memo.advanceFeesIncluded ? "✓" : ""}</span>
                <span>Advance Fees Included</span>
              </div>
              <div class="checkbox-item">
                <span class="checkbox ${memo.dayOfFeesIncluded ? "checked" : ""}">${memo.dayOfFeesIncluded ? "✓" : ""}</span>
                <span>Day of Fees Included</span>
              </div>
            </div>
            
            <div class="form-section">
              <div class="form-row half">
                <span class="label">Sellable Capacity:</span>
                <span class="field">${memo.sellableCapacity}</span>
              </div>
              <div class="form-row half">
                <span class="label">Comp Tickets:</span>
                <span class="field">${memo.compTickets}</span>
              </div>
            </div>
            
            <div class="checkbox-group">
              <div class="checkbox-item">
                <span class="label">W-9 Required:</span>
                <div style="margin-left: 10px;">
                  <span class="checkbox-item" style="margin-right: 15px;">
                    <span class="checkbox ${memo.w9Required ? "checked" : ""}">${memo.w9Required ? "✓" : ""}</span>
                    <span>Yes</span>
                  </span>
                  <span class="checkbox-item">
                    <span class="checkbox ${!memo.w9Required ? "checked" : ""}">${!memo.w9Required ? "✓" : ""}</span>
                    <span>No</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <span class="label">Merch Rate:</span>
              <span class="field">${memo.merchRate}%</span>
            </div>
            
            <div class="section-title">Schedule</div>
            <div class="schedule-grid">
              <div class="form-row">
                <span class="label">Load In Time:</span>
                <span class="field">${memo.loadInTime}</span>
              </div>
              <div class="form-row">
                <span class="label">Door Time:</span>
                <span class="field">${memo.doorTime}</span>
              </div>
              <div class="form-row">
                <span class="label">Show Date:</span>
                <span class="field">${memo.showDate}</span>
              </div>
              <div class="form-row">
                <span class="label">Soundcheck Time:</span>
                <span class="field">${memo.soundcheckTime}</span>
              </div>
              <div class="form-row">
                <span class="label">Stage Time:</span>
                <span class="field">${memo.stageTime}</span>
              </div>
            </div>
            
            <div class="section-title">Contacts</div>
            <div class="contacts-section">
              <div class="form-row">
                <span class="label">Production Contact:</span>
                <span class="field">${memo.productionContact}</span>
              </div>
              <div class="form-row">
                <span class="label">Billing Percentage:</span>
                <span class="field">${memo.billingPercentage}%</span>
              </div>
            </div>
            
            <div class="section-title">Deal Points</div>
            <div class="deal-points-section">
              <div class="field" style="min-height: 80px; border: 1px solid #000; padding: 10px;">
                ${memo.dealPoints}
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
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Deal Memo Generator</h2>
          <p className="text-gray-400 text-sm">Create and export professional deal memos</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Deal Memo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1f36] border-[#2a2f46]">
            <DialogHeader>
              <DialogTitle className="text-white">Create Deal Memo</DialogTitle>
            </DialogHeader>
            <DealMemoForm onSave={handleCreateAndExport} onCancel={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#ff6b35]" />
              Deal Memo Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">
              Create professional deal memos with all necessary contract details including:
            </p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Venue and artist information</li>
              <li>• Financial terms and guarantees</li>
              <li>• Show schedule and logistics</li>
              <li>• Production contacts</li>
              <li>• Deal points and special terms</li>
            </ul>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Deal Memo
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f36] border-[#2a2f46]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Download className="h-5 w-5 text-[#ff6b35]" />
              Export Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">Professional PDF export with:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Level Play branding</li>
              <li>• Professional formatting</li>
              <li>• Signature lines</li>
              <li>• Print-ready layout</li>
              <li>• Instant download</li>
            </ul>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Upload className="h-4 w-4" />
              <span>No storage required - export on demand</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-[#1a1f36] border-[#2a2f46]">
        <CardHeader>
          <CardTitle className="text-white">How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Fill Out Form</h3>
              <p className="text-gray-400 text-sm">
                Enter all deal details including venue, artist, financial terms, and schedule
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Generate PDF</h3>
              <p className="text-gray-400 text-sm">Click save to instantly generate a professional PDF document</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Print & Sign</h3>
              <p className="text-gray-400 text-sm">Download, print, and get signatures from both parties</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

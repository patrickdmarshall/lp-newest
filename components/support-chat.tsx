"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="flex items-center gap-2 bg-navy-light hover:bg-navy-light/80 text-white border-navy-light"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Chat with us</span>
        </Button>
      ) : (
        <div className="bg-white rounded-md shadow-lg p-4 w-full max-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-navy">Community Support</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-4">Have questions? Our community team is here to help!</p>
          <div className="space-y-2">
            <input type="text" placeholder="Your name" className="w-full px-3 py-2 border rounded-md text-sm" />
            <textarea
              placeholder="How can we help you?"
              rows={3}
              className="w-full px-3 py-2 border rounded-md text-sm"
            ></textarea>
            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      )}
    </div>
  )
}

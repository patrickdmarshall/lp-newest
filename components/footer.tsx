"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy border-t border-navy-light py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm text-gray-400">&copy; {currentYear} Level Play. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

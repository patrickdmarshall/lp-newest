import type React from "react"
import { ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

export function ExternalLink({ href, children, className, showIcon = true, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1 text-orange hover:text-orange/80 transition-colors", className)}
      {...props}
    >
      {children}
      {showIcon && <ExternalLinkIcon className="h-4 w-4" />}
    </a>
  )
}

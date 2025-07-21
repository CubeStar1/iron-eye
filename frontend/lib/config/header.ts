import { LucideIcon } from "lucide-react"

export interface HeaderLink {
  href: string
  label: string
  icon?: LucideIcon
  description?: string
}

export interface HeaderConfig {
  brand: {
    title: string
    icon: string
  }
  navigationLinks: HeaderLink[]
}

export const headerConfig: HeaderConfig = {
  brand: {
    title: "IronEye",
    icon: "/logos/aerothon-logo.webp"
  },
  navigationLinks: [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/chat",
      label: "Chat",
    },
  ],
}
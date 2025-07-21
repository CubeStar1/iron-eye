export interface FooterLink {
  href: string
  label: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterConfig {
  brand: {
    title: string
    description: string
  }
  sections: FooterSection[]
  copyright: string
}

export const footerConfig: FooterConfig = {
  brand: {
    title: "IronEye",
    description: "EO/IR Object Detection & Analysis Platform"
  },
  sections: [
    {
      title: "Platform",
      links: [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/chat", label: "Chat" },
      ]
    },
  ],
  copyright: ` ${new Date().getFullYear()} IronEye`
}

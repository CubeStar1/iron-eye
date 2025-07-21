import Icons from "@/components/global/icons";
import { SidebarConfig } from "@/components/global/app-sidebar";

const sidebarConfig: SidebarConfig = {
  brand: {
    title: "IronEye",
    icon: Icons.shield,
    href: "/dashboard"
  },
  sections: [
    {
      label: "Platform",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: Icons.layoutDashboard
        },
        {
          title: "Chat",
          href: "/chat",
          icon: Icons.message
        }
        ,
        {
          title: "Voice Assistant",
          href: "/voice-assistant",
          icon: Icons.mic
        },
        {
          title: "Analytics",
          href: "/analytics",
          icon: Icons.activity
        }
      ]
    },
    {
        label: "Account",
        items: [
          {
            title: "Profile",
            href: "/profile",
            icon: Icons.user
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Icons.settings
          }
        ]
      }
    
  ]
}

export default sidebarConfig
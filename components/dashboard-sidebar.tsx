"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CalendarDays,
  Heart,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Store,
  User,
  Users,
  Wallet,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { Role } from "@/lib/session"
import { findActiveItem } from "@/lib/utils"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  customer: [
    {
      id: "overview",
      name: "Overview",
      url: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      id: "bookings",
      name: "My Bookings",
      url: "/dashboard/customer/bookings",
      icon: CalendarDays,
    },
    {
      id: "favorites",
      name: "Favorites",
      url: "/dashboard/customer/favorites",
      icon: Heart,
    },
    {
      id: "messages",
      name: "Messages",
      url: "/dashboard/customer/messages",
      icon: MessageCircle,
    },
    {
      id: "profile",
      name: "Profile Settings",
      url: "/dashboard/customer/profile",
      icon: User,
    },
  ],
  vendor: [
    {
      id: "overview",
      name: "Overview",
      url: "/dashboard/vendor",
      icon: LayoutDashboard,
    },
    {
      id: "services",
      name: "My Services",
      url: "/dashboard/vendor/services",
      icon: Store,
    },
    {
      id: "bookings",
      name: "Bookings",
      url: "/dashboard/vendor/bookings",
      icon: CalendarDays,
    },
    {
      id: "earnings",
      name: "Earnings",
      url: "/dashboard/vendor/earnings",
      icon: Wallet,
    },
    {
      id: "messages",
      name: "Messages",
      url: "/dashboard/vendor/messages",
      icon: MessageCircle,
    },
    {
      id: "profile",
      name: "Profile Settings",
      url: "/dashboard/vendor/profile",
      icon: User,
    },
  ],
  admin: [
    {
      id: "overview",
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "vendors",
      name: "Vendors",
      url: "/dashboard/admin/vendors",
      icon: Store,
    },
    {
      id: "bookings",
      name: "Bookings",
      url: "/dashboard/admin/bookings",
      icon: CalendarDays,
    },
    {
      id: "reports",
      name: "Reports",
      url: "/dashboard/admin/reports",
      icon: BarChart3,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname()
  const activeItem = findActiveItem(pathname, menuItemsByRole[role])

  return (
    // The marketing navbar sits above the dashboard (112px = py-6 + h-16), so
    // the fixed sidebar is pushed down to clear it instead of running underneath.
    <Sidebar className="top-28! h-[calc(100svh-7rem)]!">
      <SidebarHeader>
        <span className="px-2 text-sm font-semibold tracking-[0.2em] text-[#f7f0e8] uppercase">
          WedPlan
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={activeItem?.id === item.id}
                  className="data-active:bg-[#8e2333] data-active:text-white"
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

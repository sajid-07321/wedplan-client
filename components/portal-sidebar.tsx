"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  CalendarCheck,
  CalendarDays,
  CirclePlus,
  Crown,
  LayoutGrid,
  Settings,
  Store,
} from "lucide-react"
import { cn, findActiveItem } from "@/lib/utils"

type PortalMenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const vendorMenu: PortalMenuItem[] = [
  {
    id: "overview",
    name: "Overview",
    url: "/dashboard/vendor",
    icon: LayoutGrid,
  },
  {
    id: "services",
    name: "My Services",
    url: "/dashboard/vendor/services",
    icon: Store,
  },
  {
    id: "add-service",
    name: "Add Service",
    url: "/dashboard/vendor/services/new",
    icon: CirclePlus,
  },
  {
    id: "bookings",
    name: "Booking Requests",
    url: "/dashboard/vendor/bookings",
    icon: CalendarCheck,
  },
  {
    id: "subscription",
    name: "Subscription",
    url: "/dashboard/vendor/subscription",
    icon: Crown,
  },
  {
    id: "profile",
    name: "Profile Settings",
    url: "/dashboard/vendor/profile",
    icon: Settings,
  },
]

const customerMenu: PortalMenuItem[] = [
  {
    id: "overview",
    name: "Overview",
    url: "/dashboard/customer",
    icon: LayoutGrid,
  },
  {
    id: "bookings",
    name: "My Bookings",
    url: "/dashboard/customer/bookings",
    icon: CalendarDays,
  },
  {
    id: "profile",
    name: "Profile Settings",
    url: "/dashboard/customer/profile",
    icon: Settings,
  },
]

export type PortalConfig = {
  title: string
  plan?: string
  menu: PortalMenuItem[]
}

export const portalConfig: Record<"vendor" | "customer", PortalConfig> = {
  vendor: { title: "Vendor Portal", plan: "Free", menu: vendorMenu },
  customer: { title: "Customer Portal", menu: customerMenu },
}

type PortalSidebarProps = {
  title: string
  menu: PortalMenuItem[]
  userName?: string | null
  plan?: string
}

export function PortalSidebar({
  title,
  menu,
  userName,
  plan,
}: PortalSidebarProps) {
  const pathname = usePathname()
  const activeItem = findActiveItem(pathname, menu)

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-38 lg:w-64 lg:self-start">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_48px_-32px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        {/* Workspace header */}
        <div className="border-b border-white/10 pb-4">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-[#9c8a80] uppercase">
            Workspace
          </span>

          <div className="mt-2 flex items-center justify-between gap-2">
            <h2 className="font-serif text-lg font-semibold text-[#f7f0e8]">
              {title}
            </h2>

            {plan && (
              <span className="rounded-full bg-[#b12c2c]/30 px-2.5 py-0.5 text-[11px] font-semibold text-[#f0bcbc] ring-1 ring-[#b12c2c]/40">
                {plan}
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-xs text-[#9c8a80]">
            {userName || "WedPlan member"}
          </p>
        </div>

        {/* Navigation */}
        <nav
          aria-label={`${title} navigation`}
          className="mt-3 flex flex-col gap-1"
        >
          {menu.map((item) => {
            const isActive = activeItem?.id === item.id

            return (
              <Link
                key={item.id}
                href={item.url}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-[#8e2333] font-medium text-white shadow-[0_12px_26px_-18px_rgba(142,35,51,1)]"
                    : "text-[#c2b4ab] hover:bg-white/5 hover:text-[#f7f0e8]"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

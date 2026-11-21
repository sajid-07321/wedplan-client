"use client"

import { usePathname } from "next/navigation"
import { AmbientGlow } from "@/components/ambient-glow"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PortalSidebar, portalConfig } from "@/components/portal-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { Role } from "@/lib/session"
import { isPathActive } from "@/lib/utils"

// Same darkness as the homepage / navbar so the whole dashboard reads as one page.
const dashboardBackground = "#1f1409"

const sidebarTheme = {
  "--sidebar": "#241413",
  "--sidebar-foreground": "#f7f0e8",
  "--sidebar-primary": "#8e2333",
  "--sidebar-primary-foreground": "#ffffff",
  "--sidebar-accent": "rgba(255,255,255,0.08)",
  "--sidebar-accent-foreground": "#f7f0e8",
  "--sidebar-border": "rgba(255,255,255,0.1)",
  "--sidebar-ring": "rgba(233,196,106,0.5)",
} as React.CSSProperties

type DashboardShellProps = {
  role: Role
  userName?: string | null
  children: React.ReactNode
}

export function DashboardShell({
  role,
  userName,
  children,
}: DashboardShellProps) {
  const pathname = usePathname()
  const basePath = `/dashboard/${role}`

  // Vendors and customers get the card-style portal sidebar; other roles keep
  // the collapsible sidebar (themed to match).
  const portal = role === "admin" ? null : portalConfig[role]

  if (portal && isPathActive(pathname, basePath)) {
    return (
      <section
        className="relative min-h-[calc(100svh-7rem)]"
        style={{ backgroundColor: dashboardBackground }}
      >
        {/* Same ambient treatment as the home sections */}
        <AmbientGlow />

        <div className="relative mx-auto flex w-full max-w-[85rem] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:gap-8 lg:py-10">
          <PortalSidebar
            title={portal.title}
            menu={portal.menu}
            plan={portal.plan}
            userName={userName}
          />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </section>
    )
  }

  return (
    <SidebarProvider
      style={{ backgroundColor: dashboardBackground, ...sidebarTheme }}
    >
      <DashboardSidebar role={role} />
      <main className="min-w-0 flex-1 p-6 text-[#f7f0e8]">
        <SidebarTrigger className="text-[#f7f0e8] hover:bg-white/10 hover:text-[#f7f0e8]" />
        {children}
      </main>
    </SidebarProvider>
  )
}

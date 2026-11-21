import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { normalizeRole, requireSession } from "@/lib/session"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireSession()

  return (
    <SidebarProvider>
      <DashboardSidebar role={normalizeRole(session.user.role)} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout

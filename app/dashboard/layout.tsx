import { DashboardShell } from "@/components/dashboard-shell"
import { normalizeRole, requireSession } from "@/lib/session"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireSession()

  return (
    <DashboardShell
      role={normalizeRole(session.user.role)}
      userName={session.user.name}
    >
      {children}
    </DashboardShell>
  )
}

export default DashboardLayout

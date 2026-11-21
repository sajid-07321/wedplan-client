import { requireRole } from "@/lib/session"

const AdminDashboardPage = async () => {
  await requireRole("admin")

  return <div>admin</div>
}

export default AdminDashboardPage

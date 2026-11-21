import { requireRole } from "@/lib/session"

const VendorDashboardPage = async () => {
  await requireRole("vendor")

  return <div>vendor</div>
}

export default VendorDashboardPage

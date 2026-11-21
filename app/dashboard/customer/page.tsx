import { requireRole } from "@/lib/session"

const CustomerDashboardPage = async () => {
  await requireRole("customer")

  return <div>customer</div>
}

export default CustomerDashboardPage

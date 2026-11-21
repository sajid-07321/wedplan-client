import { redirect } from "next/navigation"
import { requireSession, normalizeRole, type Role } from "@/lib/session"

const knownRoles: Role[] = ["customer", "vendor", "admin"]

// Fallback for dashboard links that don't have a dedicated page yet
// (e.g. /dashboard/customer/bookings), so menu items never 404.
export default async function DashboardSectionPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const session = await requireSession()
  const { slug } = await params
  const [roleParam, ...rest] = slug
  const role = normalizeRole(session.user.role)

  if (
    !roleParam ||
    !knownRoles.includes(roleParam as Role) ||
    roleParam !== role
  ) {
    redirect(`/dashboard/${role}`)
  }

  const section =
    rest
      .join("-")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Overview"

  return (
    <div className="space-y-4 p-6">
      <h1 className="font-serif text-2xl font-bold text-[#f7f0e8]">
        {section}
      </h1>
      <p className="max-w-xl text-sm leading-relaxed text-[#9c8a80]">
        This section is coming soon — we&apos;re still building out the {role}{" "}
        dashboard. Check back soon.
      </p>
    </div>
  )
}

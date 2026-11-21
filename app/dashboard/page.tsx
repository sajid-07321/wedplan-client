import { redirect } from "next/navigation"
import { getSession, normalizeRole } from "@/lib/session"

// Entry point for everything that links to "/dashboard" (navbar, avatar menu,
// OAuth callbacks, post-signup redirects): send the user to their own portal.
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  const { welcome } = await searchParams
  const role = normalizeRole(session.user.role)

  redirect(`/dashboard/${role}${welcome ? "?welcome=1" : ""}`)
}

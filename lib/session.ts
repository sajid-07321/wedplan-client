import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export type Role = "customer" | "vendor" | "admin"

export function normalizeRole(value: unknown): Role {
  return value === "vendor" || value === "admin" ? value : "customer"
}

// cache() dedupes the lookup within a single request: the dashboard layout and
// the page below it both need the session, so this hits the database once
// instead of twice per navigation.
export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  })
})

export async function requireSession() {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  return session
}

export async function requireRole(role: Role) {
  const session = await requireSession()
  const userRole = normalizeRole(session.user.role)

  if (userRole !== role) {
    redirect(`/dashboard/${userRole}`)
  }

  return session
}

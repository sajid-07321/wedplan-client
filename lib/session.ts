import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export type Role = "customer" | "vendor" | "admin"

export function normalizeRole(value: unknown): Role {
  return value === "vendor" || value === "admin" ? value : "customer"
}

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}

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

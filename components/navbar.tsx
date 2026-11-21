"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { LogoMark } from "@/components/logo-mark"
import { UserAvatar } from "@/components/user-avatar"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"

const publicLinks = [{ label: "Home", href: "/" }]

export function Navbar() {
  const { data: session, isPending } = useSession()
  const pathname = usePathname()

  // Go straight to the visitor's own portal — one round trip instead of
  // hitting /dashboard and bouncing through a redirect.
  const role = session?.user.role
  const dashboardHref =
    role === "customer" || role === "vendor" || role === "admin"
      ? `/dashboard/${role}`
      : "/dashboard"

  const navLinks = session?.user
    ? [...publicLinks, { label: "Dashboard", href: dashboardHref }]
    : [...publicLinks, { label: "Browse Services", href: "/services" }]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1f1409fb] py-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />

          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold text-[#f7f0e8]">
              WedPlan
            </span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.2em] text-[#9c8a80]">
              WEDDING PLANNING PLATFORM
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-white/10 font-medium text-[#f7f0e8]"
                    : "text-[#c2b4ab] hover:bg-white/5 hover:text-[#f7f0e8]"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Authentication */}
        {isPending ? (
          <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
        ) : session?.user ? (
          <UserAvatar />
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "h-9 rounded-full border border-white/25 px-5 text-[#f3e9df] hover:bg-white/10 hover:text-[#f3e9df]",
                })
              )}
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({
                  className:
                    "h-9 rounded-full bg-[rgba(177,44,44,0.76)] px-5 font-semibold text-white hover:bg-[#72716d]",
                })
              )}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

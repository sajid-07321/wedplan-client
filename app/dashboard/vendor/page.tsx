import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Crown,
  PlusCircle,
} from "lucide-react"
import { requireRole } from "@/lib/session"
import { cn } from "@/lib/utils"

type Stat = {
  id: string
  label: string
  value: number
  icon: LucideIcon
  iconClassName: string
}

const stats: Stat[] = [
  {
    id: "total-services",
    label: "Total Services",
    value: 0,
    icon: Briefcase,
    iconClassName: "bg-[#b12c2c]/20 text-[#ef9a9a]",
  },
  {
    id: "approved",
    label: "Approved & Active",
    value: 0,
    icon: CheckCircle2,
    iconClassName: "bg-[#3f8f5f]/20 text-[#8ad6a8]",
  },
  {
    id: "pending",
    label: "Pending Requests",
    value: 0,
    icon: Clock,
    iconClassName: "bg-[#e9c46a]/15 text-[#e9c46a]",
  },
  {
    id: "bookings",
    label: "Accepted Bookings",
    value: 0,
    icon: CalendarCheck,
    iconClassName: "bg-[#5b8fd6]/15 text-[#96bcea]",
  },
]

const VendorDashboardPage = async () => {
  await requireRole("vendor")

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <header className="border-b border-white/10 pb-6">
        <h1 className="font-serif text-3xl font-semibold text-[#f7f0e8] sm:text-4xl">
          Vendor Dashboard Overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9c8a80]">
          Monitor your published wedding services, incoming couple requests, and
          subscription status.
        </p>
      </header>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/20"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm text-[#c2b4ab]">{stat.label}</span>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  stat.iconClassName
                )}
              >
                <stat.icon className="size-4.5" />
              </span>
            </div>

            <p className="mt-4 font-serif text-3xl font-semibold text-[#f7f0e8]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Subscription plan */}
      <section className="rounded-2xl border border-[#e9c46a]/25 bg-gradient-to-r from-[#e9c46a]/10 via-[#e9c46a]/5 to-transparent p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <Crown className="size-5 shrink-0 text-[#e9c46a]" />
              <h2 className="font-serif text-xl font-semibold text-[#f7f0e8]">
                Current Subscription Plan
              </h2>
              <span className="rounded-full bg-[#b12c2c]/30 px-2.5 py-0.5 text-[11px] font-semibold text-[#f0bcbc] ring-1 ring-[#b12c2c]/40">
                Free Plan
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#c2b4ab]">
              Free Plan allows up to 3 active wedding services. Upgrade to
              Premium for unlimited services.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link
              href="/dashboard/vendor/services/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-medium text-[#f7f0e8] transition-colors hover:bg-white/10"
            >
              <PlusCircle className="size-4" />
              Add Service
            </Link>

            <Link
              href="/dashboard/vendor/subscription"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#8e2333] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#a52d3f]"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VendorDashboardPage

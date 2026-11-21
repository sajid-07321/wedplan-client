import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  CalendarDays,
  CheckCircle2,
  CircleX,
  Clock,
  Search,
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
    id: "total-requests",
    label: "Total Booking Requests",
    value: 0,
    icon: CalendarDays,
    iconClassName: "bg-[#b12c2c]/20 text-[#ef9a9a]",
  },
  {
    id: "pending",
    label: "Pending Bookings",
    value: 0,
    icon: Clock,
    iconClassName: "bg-[#e9c46a]/15 text-[#e9c46a]",
  },
  {
    id: "accepted",
    label: "Accepted Bookings",
    value: 0,
    icon: CheckCircle2,
    iconClassName: "bg-[#3f8f5f]/20 text-[#8ad6a8]",
  },
  {
    id: "rejected",
    label: "Rejected Bookings",
    value: 0,
    icon: CircleX,
    iconClassName: "bg-[#b12c2c]/15 text-[#f08a8a]",
  },
]

const CustomerDashboardPage = async () => {
  await requireRole("customer")

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <header className="border-b border-white/10 pb-6">
        <h1 className="font-serif text-3xl font-semibold text-[#f7f0e8] sm:text-4xl">
          Customer Overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9c8a80]">
          Track your wedding service inquiries and confirmed vendors at a
          glance.
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

      {/* Recent booking requests */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold text-[#f7f0e8]">
            Recent Booking Requests
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/customer/bookings"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 text-sm font-medium text-[#f7f0e8] transition-colors hover:bg-white/10"
            >
              Manage All
            </Link>

            <Link
              href="/services"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#8e2333] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#a52d3f]"
            >
              <Search className="size-4" />
              Browse Services
            </Link>
          </div>
        </div>

        {/* Empty state */}
        <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center">
          <p className="text-base font-semibold text-[#f7f0e8]">
            No booking requests yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#9c8a80]">
            Explore our wedding marketplace to send your first inquiry.
          </p>

          <Link
            href="/services"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#8e2333] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#a52d3f]"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CustomerDashboardPage

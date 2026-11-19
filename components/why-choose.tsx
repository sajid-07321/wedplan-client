import { CircleCheck, Crown } from "lucide-react"

import { AmbientGlow } from "@/components/ambient-glow"

const features = [
  {
    title: "Curated & Admin-Vetted Vendors",
    description:
      "Every wedding service undergoes administrative review before appearing publicly, ensuring trusted professionals for your celebration.",
  },
  {
    title: "Transparent Pricing & Instant Requests",
    description:
      "Compare package rates upfront, filter by your city or destination, and submit date-specific booking requests in seconds.",
  },
  {
    title: "Dedicated Role Dashboards",
    description:
      "Couples track every request status in real time while vendors manage packages, schedules, and bookings from one workspace.",
  },
  {
    title: "Verified Premium Vendor Badges",
    description:
      "Spot top-tier Wedding Partners backed by Stripe-verified Premium memberships and priority service showcases.",
  },
]

const steps = [
  {
    number: "01",
    title: "Discover Curated Services",
    description:
      "Explore approved photography, venues, florists, catering, beauty, and couture filtered by location and budget.",
  },
  {
    number: "02",
    title: "Send a Booking Request",
    description:
      "Filter vendors by price, duration, and venue location, add personal notes, and send a direct inquiry to your chosen vendor.",
  },
  {
    number: "03",
    title: "Track & Celebrate",
    description:
      "Receive prompt acceptances from vendors and keep all confirmed wedding services organized inside your dashboard.",
  },
]

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#333232]">
      {/* Background (same gradient as the sign-up page) */}
      <AmbientGlow />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left — Promise */}
          <div>
            <span className="text-xs font-semibold tracking-[0.18em] text-[#c2b4ab] uppercase">
              The WedPlan Promise
            </span>

            <h2 className="mt-4 font-serif text-3xl leading-[1.15] font-semibold text-[#f7f0e8] sm:text-4xl lg:text-[42px]">
              Why Choose WedPlan?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#d9c9c2] sm:text-base">
              Designed for modern couples and ambitious wedding vendors alike,
              WedPlan replaces scattered spreadsheets with verified partnerships
              and streamlined booking workflows.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#e8e5e1] bg-gray-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#f8eaec] text-[#8e2333]">
                    <CircleCheck className="size-4" />
                  </span>

                  <h3 className="mt-4 font-serif text-base leading-snug font-semibold text-[#2b1414]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#6b625d]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Premium */}
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#c5c1c2] via-white to-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f8eaec] px-3.5 py-1.5 text-xs font-semibold text-[#8e2333]">
                <Crown className="size-3.5" />
                For Wedding Businesses
              </span>

              <h3 className="mt-5 font-serif text-2xl leading-[1.2] font-semibold text-[#2b1414] sm:text-3xl">
                Grow Your Studio With WedPlan Premium
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#6b625d]">
                Start free with up to 3 active services, or unlock unlimited
                listings, a verified Premium Vendor badge, and top-of-feed
                placement powered by Stripe Checkout.
              </p>

              <ol className="mt-7 space-y-6 border-t border-[#efe9e4] pt-7">
                {steps.map((step) => (
                  <li key={step.number} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#8e2333] text-xs font-semibold text-white">
                      {step.number}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#2b1414] sm:text-base">
                        {step.title}
                      </span>

                      <span className="mt-1 block text-sm leading-relaxed text-[#6b625d]">
                        {step.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Search, ShieldCheck, Sparkles } from "lucide-react"

const stats = [
  { value: "6+", label: "Curated Categories" },
  { value: "100%", label: "Vetted Listings" },
  { value: "Direct", label: "Booking Tracking" },
]

export function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#241413]">
      <Image
        src="/hero-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#333232] via-[#241413]/85 to-[#241413]/40" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e9c46a]/30 bg-[#e9c46a]/10 px-4 py-1.5 text-xs font-medium text-[#f0dca4]">
            <Sparkles className="size-3.5" />
            Trusted by Couples &amp; Wedding Artisans
          </span>

          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.1] font-semibold text-white sm:text-5xl lg:text-6xl">
            Craft Your{" "}
            <span className="text-[#f2c94c] italic">Unforgettable</span> Wedding
            Celebration
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#d9c9c2] sm:text-base">
            Discover admin-vetted wedding photographers, breathtaking venues,
            floral designers, gourmet caterers, and bridal stylists—compare
            transparent pricing and send booking requests effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[rgba(177,44,44,0.76)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#55534d]"
            >
              <Search className="size-4" />
              Explore Wedding Services
            </Link>
            <Link
              href="/vendor-hub"
              className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Join as a Vendor
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl font-semibold text-[#f3e7d3]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[#b9a59c]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-[28px] bg-white p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-4/5 overflow-hidden rounded-[20px]">
              <Image
                src="/hero-card.jpg"
                alt="Outdoor wedding ceremony setup with white chairs on a lawn"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50">
              <ShieldCheck className="size-4.5 text-red-500" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                Verified Wedding Pros
              </span>
              <span className="text-xs text-gray-500">
                Reviewed before going live
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Quote } from "lucide-react"

import { AmbientGlow } from "@/components/ambient-glow"

const stories = [
  {
    quote:
      "WedPlan helped us find our dream garden estate, floral designer, and editorial photographer in a single weekend. Tracking every booking status in one place removed all the stress.",
    couple: "Sophia & Liam Harrison",
    meta: "Napa Valley, CA • Married October 2025",
  },
  {
    quote:
      "Being able to filter vendors by location and compare pricing transparently saved us weeks of back-and-forth emails. Every vendor we booked was responsive and extraordinary.",
    couple: "Amara & Daniel Vance",
    meta: "Austin, TX • Married May 2026",
  },
  {
    quote:
      "From bridal styling to multi-course catering, WedPlan connected us with verified artisans who understood our vision from day one.",
    couple: "Clara & Ethan Brooks",
    meta: "Charleston, SC • Married August 2026",
  },
]

export function LoveNotes() {
  return (
    <section className="relative overflow-hidden bg-[#333232]">
      {/* Background (same gradient as the sign-up page) */}
      <AmbientGlow />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-[#d7a9a5] uppercase">
            Love Notes
          </span>

          <h2 className="mt-4 font-serif text-3xl leading-[1.15] font-semibold text-[#f7f0e8] sm:text-4xl">
            Stories From Happy Couples
          </h2>
        </div>

        {/* Stories */}
        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-12">
          {stories.map((story) => (
            <figure
              key={story.couple}
              className="flex flex-col rounded-2xl border border-[#e8e5e1] bg-gray-200 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            >
              <Quote className="size-6 fill-[#ecd2d4] text-[#ecd2d4]" />

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#6b625d]">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 border-t border-[#efe9e4] pt-5">
                <div className="font-serif text-base font-semibold text-[#2b1414]">
                  {story.couple}
                </div>

                <div className="mt-1 text-xs text-[#8a7f79]">{story.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

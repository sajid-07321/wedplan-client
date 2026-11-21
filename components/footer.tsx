"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { LogoMark } from "@/components/logo-mark"

const navigation = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Create Account", href: "/sign-up" },
  { label: "Dashboard", href: "/dashboard" },
]

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
]

const contacts = [
  {
    icon: Mail,
    label: "concierge@wedplan.com",
    href: "mailto:concierge@wedplan.com",
  },
  { icon: Phone, label: "+1 (415) 890-4321", href: "tel:+14158904321" },
  { icon: MapPin, label: "540 Union Square, San Francisco, CA", href: null },
]

const socials = ["Instagram", "Pinterest", "Facebook"]

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#c5c3c0] to-[#f1ece5]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="size-11" svgClassName="size-6" />

              <span className="font-serif text-xl font-semibold text-[#2b1414]">
                WedPlan
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6b625d]">
              Curating extraordinary wedding venues, photographers, florists,
              caterers, and bridal stylists so couples can plan unforgettable
              celebrations with confidence.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold tracking-[0.12em] text-[#2b1414] uppercase">
              Navigation
            </h3>

            <ul className="mt-4 space-y-2.5">
              {navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b625d] transition-colors hover:text-[#8e2333]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Service categories">
            <h3 className="text-xs font-bold tracking-[0.12em] text-[#2b1414] uppercase">
              Categories
            </h3>

            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="/services"
                    className="text-sm text-[#6b625d] transition-colors hover:text-[#8e2333]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Connect */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.12em] text-[#2b1414] uppercase">
              Contact &amp; Connect
            </h3>

            <ul className="mt-4 space-y-3">
              {contacts.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <Icon className="size-4 shrink-0 text-[#8e2333]" />
                    <span className="text-sm text-[#6b625d]">{label}</span>
                  </>
                )

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-3 transition-colors hover:text-[#8e2333]"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3">{content}</span>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => (
                <Link
                  key={social}
                  href="/"
                  className="rounded-full border border-[#ddd8d3] bg-white px-4 py-1.5 text-xs font-medium text-[#6b625d] transition-colors hover:border-[#8e2333] hover:text-[#8e2333]"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#1b1a1a]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <p className="text-xs text-[#9c8a80]">
            © 2026 WedPlan • Wedding Planning Platform. All rights reserved.
          </p>

          <p className="text-xs text-[#9c8a80]">
            Crafted for couples &amp; verified wedding artisans worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}

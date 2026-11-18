import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "Vendor Hub", href: "/vendor-hub" },
]

function LogoMark() {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#8e2333]">
      {/* Interlocking wedding rings */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5"
        aria-hidden="true"
      >
        <circle cx="9.5" cy="13" r="5.25" stroke="#f0d38a" strokeWidth="1.75" />
        <circle cx="15" cy="13" r="5.25" stroke="#ffffff" strokeWidth="1.75" />
        <path d="M15 4.2 16.4 5.9 15 7.6 13.6 5.9Z" fill="#f0d38a" />
      </svg>
    </span>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1c1211]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
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

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                index === 0
                  ? "bg-white/10 font-medium text-[#f7f0e8]"
                  : "text-[#c2b4ab] hover:bg-white/5 hover:text-[#f7f0e8]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "ghost",
              className:
                "h-9 rounded-full border border-white/25 px-5 text-[#f3e9df] hover:bg-white/10 hover:text-[#f3e9df]",
            })}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({
              className:
                "h-9 rounded-full bg-[#f2c94c] px-5 font-semibold text-[#2b1414] hover:bg-[#f7d76f]",
            })}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

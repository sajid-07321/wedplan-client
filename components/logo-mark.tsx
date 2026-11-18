import { cn } from "@/lib/utils"

export function LogoMark({
  className = "size-10",
  svgClassName = "size-5",
}: {
  className?: string
  svgClassName?: string
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-[#8e2333]",
        className
      )}
    >
      {/* Interlocking wedding rings */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={svgClassName}
        aria-hidden="true"
      >
        <circle cx="9.5" cy="13" r="5.25" stroke="#f0d38a" strokeWidth="1.75" />
        <circle cx="15" cy="13" r="5.25" stroke="#ffffff" strokeWidth="1.75" />
        <path d="M15 4.2 16.4 5.9 15 7.6 13.6 5.9Z" fill="#f0d38a" />
      </svg>
    </span>
  )
}

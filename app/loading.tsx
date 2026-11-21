// Instant fallback while a route's server session lookup resolves, so
// navigating from the homepage into the dashboard never looks stuck.
export default function RootLoading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center bg-[#1f1409]">
      <div className="flex flex-col items-center gap-4">
        <span className="size-10 animate-spin rounded-full border-2 border-white/15 border-t-[#e9c46a]" />
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#9c8a80] uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}

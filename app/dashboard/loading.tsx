// Dashboard-shaped skeleton shown inside the portal shell while the page
// resolves the visitor's role and data.
export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true">
      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="h-9 w-72 max-w-full rounded-lg bg-white/10" />
        <div className="h-4 w-96 max-w-full rounded bg-white/5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((card) => (
          <div
            key={card}
            className="h-28 rounded-xl border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>

      <div className="h-56 rounded-2xl border border-white/10 bg-white/[0.04]" />
    </div>
  )
}

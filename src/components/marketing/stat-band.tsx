import { cn } from "@/lib/utils"

interface StatBandProps {
  stats: { label: string; value: string }[]
  className?: string
}

export function StatBand({ stats, className }: StatBandProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 transition hover:-translate-y-0.5 hover:border-white/10"
        >
          <p className="text-display-1 font-semibold text-primary">{stat.value}</p>
          <p className="mt-1 text-eyebrow font-semibold uppercase tracking-[0.2em] text-white/40">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

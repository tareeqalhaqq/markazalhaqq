import { cn } from "@/lib/utils"

interface StatBandProps {
  stats: { label: string; value: string }[]
  tone?: "primary" | "neutral"
  className?: string
}

export function StatBand({ stats, tone = "primary", className }: StatBandProps) {
  const baseCard =
    "rounded-card border bg-white/80 px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
  const cardTone = tone === "primary" ? "border-primary/25 shadow-primary/5" : "border-slate-200/70 shadow-slate-200/40"

  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className={cn(baseCard, cardTone)}>
          <p className="text-display-1 font-semibold text-primary">{stat.value}</p>
          <p className="mt-1 text-eyebrow font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

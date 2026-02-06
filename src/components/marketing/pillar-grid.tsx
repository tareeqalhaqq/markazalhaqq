import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface PillarGridProps {
  pillars: { title: string; description: string; icon?: LucideIcon }[]
  align?: "left" | "center"
  className?: string
}

export function PillarGrid({ pillars, align = "left", className }: PillarGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {pillars.map((pillar) => (
        <div
          key={pillar.title}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 transition hover:border-white/10 hover:bg-white/[0.05]"
        >
          <div className={cn("space-y-4", align === "center" && "text-center")}>
            {pillar.icon ? (
              <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary", align === "center" ? "mx-auto" : undefined)}>
                <pillar.icon className="h-5 w-5" />
              </div>
            ) : null}
            <h3 className="font-headline text-lg font-semibold text-foreground">{pillar.title}</h3>
            <p className="text-sm leading-relaxed text-white/50">{pillar.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

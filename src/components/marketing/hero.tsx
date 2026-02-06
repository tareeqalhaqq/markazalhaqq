import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Section } from "./section"
import { StatBand } from "./stat-band"

type HeroAction = {
  label: string
  href: string
}

interface HeroProps {
  badge?: string
  title: string
  description: string
  primaryAction: HeroAction
  secondaryAction?: HeroAction
  stats?: { label: string; value: string }[]
  alignment?: "left" | "center"
}

export function MarketingHero({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats,
  alignment = "center",
}: HeroProps) {
  const isCentered = alignment === "center"

  return (
    <Section background="gradient" padding="extra" className="overflow-hidden">
      <div className={cn("space-y-8", isCentered ? "mx-auto max-w-3xl text-center" : undefined)}>
        {badge ? (
          <div className={cn("inline-block", isCentered && "mx-auto")}>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {badge}
            </span>
          </div>
        ) : null}
        <div className="space-y-5">
          <h1 className="font-headline text-display-2 font-semibold leading-tight text-foreground sm:text-display-3">
            {title}
          </h1>
          <p className="text-lead text-white/50">{description}</p>
        </div>
        <div className={cn("flex flex-col gap-4", isCentered ? "sm:mx-auto sm:w-fit sm:flex-row" : "sm:flex-row")}>
          <Button asChild size="lg" className="rounded-full px-8 py-3 text-base font-semibold">
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
          {secondaryAction ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/10 px-8 py-3 text-base text-white/70 hover:bg-white/5 hover:text-white"
            >
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          ) : null}
        </div>
        {stats ? <StatBand stats={stats} className="pt-4" /> : null}
      </div>
    </Section>
  )
}

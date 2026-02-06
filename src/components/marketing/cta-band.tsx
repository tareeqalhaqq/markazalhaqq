import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CallToActionProps {
  badge?: string
  title: string
  description: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  className?: string
}

export function CallToActionBand({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CallToActionProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-white/[0.03] p-10 md:p-14",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="space-y-4">
          {badge ? (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {badge}
            </span>
          ) : null}
          <h2 className="font-headline text-3xl font-semibold text-foreground">{title}</h2>
          <p className="text-lead text-white/50">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button asChild size="lg" className="rounded-full px-7 py-3 text-base font-semibold">
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
          {secondaryAction ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/10 px-7 py-3 text-base text-white/70 hover:bg-white/5 hover:text-white"
            >
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

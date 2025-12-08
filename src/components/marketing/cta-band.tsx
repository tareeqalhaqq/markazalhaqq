import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CallToActionProps {
  badge?: string
  title: string
  description: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  tone?: "light" | "dark"
  className?: string
}

export function CallToActionBand({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "light",
  className,
}: CallToActionProps) {
  const isDark = tone === "dark"
  const badgeStyles = isDark
    ? "bg-white/15 text-white/80 border border-white/15"
    : "bg-primary/10 text-primary border border-primary/20"
  const containerStyles = isDark
    ? "bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-900 text-white"
    : "bg-gradient-to-br from-white via-indigo-50/70 to-white border border-primary/15"

  return (
    <div
      className={cn(
        "rounded-section p-10 shadow-xl shadow-primary/10 md:p-14",
        containerStyles,
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="space-y-4">
          {badge ? (
            <Badge className={cn("rounded-pill px-4 py-1 text-eyebrow font-semibold uppercase", badgeStyles)}>
              {badge}
            </Badge>
          ) : null}
          <h2 className={cn("font-headline text-3xl font-semibold", isDark ? "text-white" : "text-foreground")}>
            {title}
          </h2>
          <p className={cn("text-lead", isDark ? "text-slate-200" : "text-muted-foreground")}>{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            asChild
            size="lg"
            className={cn(
              "rounded-pill px-7 py-3 text-base shadow-[0_28px_40px_-25px_rgba(99,102,241,0.4)]",
              isDark ? "bg-white text-slate-900 hover:bg-white/90" : undefined,
            )}
          >
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
          {secondaryAction ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "rounded-pill px-7 py-3 text-base",
                isDark
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-primary/30 text-primary hover:bg-primary/10",
              )}
            >
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

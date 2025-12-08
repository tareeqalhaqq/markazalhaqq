import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Section } from "./section"
import { StatBand } from "./stat-band"

type HeroAlignment = "left" | "center"

type HeroAction = {
  label: string
  href: string
  variant?: "primary" | "outline"
}

type HeroImage = {
  src: string | StaticImageData
  alt: string
  hint?: string
}

interface HeroProps {
  badge?: string
  title: string
  description: string
  primaryAction: HeroAction
  secondaryAction?: HeroAction
  stats?: { label: string; value: string }[]
  image?: HeroImage
  alignment?: HeroAlignment
}

export function MarketingHero({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats,
  image,
  alignment = "left",
}: HeroProps) {
  const isCentered = alignment === "center"
  const badgeClasses = "rounded-pill border border-primary/20 bg-primary/10 px-4 py-1 text-eyebrow font-semibold uppercase"
  const bodyClasses = cn("space-y-6", isCentered ? "mx-auto max-w-3xl text-center" : undefined)

  const actionButton = (
    <Button asChild size="lg" className="rounded-pill px-8 py-3 text-base shadow-[0_28px_40px_-25px_rgba(99,102,241,0.5)]">
      <Link href={primaryAction.href}>{primaryAction.label}</Link>
    </Button>
  )

  const outlineButton = secondaryAction ? (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="rounded-pill border-primary/40 px-8 py-3 text-base text-primary hover:bg-primary/10"
    >
      <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
    </Button>
  ) : null

  return (
    <Section background="gradient" padding="extra" className="overflow-hidden">
      <div
        className={cn(
          "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]",
          isCentered && "lg:grid-cols-1",
        )}
      >
        <div className={bodyClasses}>
          {badge ? <Badge className={badgeClasses}>{badge}</Badge> : null}
          <div className="space-y-4">
            <h1 className="font-headline text-display-2 font-semibold leading-tight text-foreground sm:text-display-3">
              {title}
            </h1>
            <p className="text-lead text-muted-foreground">{description}</p>
          </div>
          <div className={cn("flex flex-col gap-4", isCentered ? "sm:mx-auto sm:w-fit sm:flex-row" : "sm:flex-row")}>
            {actionButton}
            {outlineButton}
          </div>
          {stats ? <StatBand stats={stats} className="pt-2" /> : null}
        </div>
        {image ? (
          <div className={cn("relative", isCentered ? "mx-auto max-w-2xl" : undefined)}>
            <div className="absolute -inset-6 rounded-section bg-gradient-to-tr from-primary/25 via-secondary/15 to-transparent blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-section border border-white/60 bg-white shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                width={960}
                height={640}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  )
}

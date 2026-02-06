import { type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type SectionBackground = "none" | "subtle" | "gradient"
type SectionPadding = "default" | "tight" | "extra"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground
  padding?: SectionPadding
  innerClassName?: string
  width?: "default" | "wide" | "narrow"
}

const backgroundClassNames: Record<SectionBackground, string> = {
  none: "",
  subtle: "bg-white/[0.02]",
  gradient: "bg-sok-radial",
}

const paddingClassNames: Record<SectionPadding, string> = {
  tight: "py-section-sm",
  default: "py-section",
  extra: "py-section-lg",
}

const widthClassNames: Record<NonNullable<SectionProps["width"]>, string> = {
  default: "max-w-6xl",
  wide: "max-w-6xl lg:max-w-7xl",
  narrow: "max-w-4xl",
}

export function Section({
  background = "none",
  padding = "default",
  className,
  innerClassName,
  width = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("relative", backgroundClassNames[background], paddingClassNames[padding], className)} {...props}>
      <div className={cn("container px-gutter", widthClassNames[width], innerClassName)}>{children}</div>
    </section>
  )
}

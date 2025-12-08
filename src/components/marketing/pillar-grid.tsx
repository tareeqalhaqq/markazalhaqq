import { type LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PillarGridProps {
  pillars: { title: string; description: string; icon?: LucideIcon }[]
  align?: "left" | "center"
  className?: string
  softBackground?: boolean
}

export function PillarGrid({ pillars, align = "left", className, softBackground }: PillarGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {pillars.map((pillar) => (
        <Card
          key={pillar.title}
          className={cn(
            "h-full border bg-white/85 shadow-sm shadow-primary/5 transition hover:-translate-y-1 hover:shadow-xl",
            softBackground ? "border-transparent bg-gradient-to-br from-white via-indigo-50/70 to-white" : "border-muted",
          )}
        >
          <CardHeader className={cn("space-y-4", align === "center" && "text-center")}>
            {pillar.icon ? (
              <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary", align === "center" ? "mx-auto" : undefined)}>
                <pillar.icon className="h-6 w-6" />
              </div>
            ) : null}
            <CardTitle className="font-headline text-xl text-foreground">{pillar.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base leading-relaxed text-muted-foreground">{pillar.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

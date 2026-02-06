export const dynamic = 'force-dynamic'

import { BookOpenCheck, HeartHandshake, Sparkles, Users2 } from "lucide-react"

import { MarketingHero } from "@/components/marketing/hero"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { Section } from "@/components/marketing/section"

const pillars = [
  {
    title: "Authenticity",
    description:
      "Everything we publish is reviewed by the Tareeq Al-Haqq scholars to ensure alignment with the Quran and Sunnah upon the way of the Salaf.",
    icon: BookOpenCheck,
  },
  {
    title: "Community",
    description:
      "Our platforms include moderated spaces where students can encourage one another and seek clarification directly from trusted teachers.",
    icon: Users2,
  },
  {
    title: "Service",
    description:
      "MarkazalHaqq exists to serve the Ummah. Each course is designed to build clarity, character, and action in the lives of our learners.",
    icon: HeartHandshake,
  },
]

const milestones = [
  {
    year: "2010-2023",
    title: "The legacy of TareeqAlHaqq.org",
    description:
      "Hundreds of lessons, articles, and reminders were published for free, giving Muslims a trusted digital resource for authentic guidance.",
  },
  {
    year: "2023",
    title: "Identifying the need",
    description:
      "Students asked for structured study plans, live mentorship, and clear next steps beyond standalone lectures.",
  },
  {
    year: "2024",
    title: "Launching MarkazalHaqq",
    description:
      "We began building an academy that mirrors in-person circles—organized curricula, accountability, and direct access to our teachers.",
  },
]

export default function AboutPage() {
  return (
    <div className="pb-0">
      <MarketingHero
        badge="About MarkazalHaqq"
        title="The official academy of Tareeq Al-Haqq"
        description="MarkazalHaqq extends the trust of TareeqAlHaqq.org into a guided learning experience. Our goal is to help sincere seekers progress with clarity, companionship, and action."
        primaryAction={{ label: "Explore courses", href: "/courses" }}
        secondaryAction={{ label: "Meet the instructors", href: "/instructors" }}
      />

      <Section background="gradient">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">Why we launched MarkazalHaqq</h2>
          <p className="text-lead text-white/50">
            Our community needed a place where sincere seekers could move beyond individual lectures and into a purposeful journey.
          </p>
        </div>
        <PillarGrid pillars={pillars} align="center" className="mt-12" />
      </Section>

      <Section background="subtle">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Our journey so far
          </span>
          <p className="max-w-3xl text-lead text-white/50">
            MarkazalHaqq remains rooted in the mission of Tareeq Al-Haqq: cultivating clarity upon the path of the Salaf.
          </p>
          <div className="mt-8 space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">{milestone.year}</p>
                <h3 className="mt-2 font-headline text-xl font-semibold text-foreground">{milestone.title}</h3>
                <p className="mt-3 text-sm text-white/50">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

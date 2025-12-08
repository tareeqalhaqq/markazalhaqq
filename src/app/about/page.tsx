import { BookOpenCheck, HeartHandshake, Sparkles, Users2 } from "lucide-react"

import { MarketingHero } from "@/components/marketing/hero"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image")

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
    year: "2010–2023",
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

const badgeBase = "rounded-pill px-4 py-1 text-eyebrow font-semibold uppercase tracking-[0.28em]"

export default function AboutPage() {
  return (
    <div className="space-y-section pb-section">
      <MarketingHero
        badge="About MarkazalHaqq"
        title="The official academy of Tareeq Al-Haqq"
        description="MarkazalHaqq extends the trust of TareeqAlHaqq.org into a guided learning experience. Our goal is to help sincere seekers progress with clarity, companionship, and action."
        primaryAction={{ label: "Explore courses", href: "/courses" }}
        secondaryAction={{ label: "Meet the instructors", href: "/instructors" }}
        image={
          aboutImage
            ? { src: aboutImage.imageUrl, alt: aboutImage.description, hint: aboutImage.imageHint }
            : undefined
        }
      />

      <Section background="gradient">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="font-headline text-display-1 font-bold text-foreground sm:text-display-2">Why we launched MarkazalHaqq</h2>
          <p className="text-lead text-muted-foreground">
            Our community needed a place where sincere seekers could move beyond individual lectures and into a purposeful journey. MarkazalHaqq provides that structure while keeping the heart and authenticity of Tareeq Al-Haqq alive.
          </p>
        </div>

        <PillarGrid pillars={pillars} align="center" softBackground className="mt-12" />
      </Section>

      <Section background="subtle">
        <div className="rounded-section bg-white/80 p-10 shadow-xl shadow-primary/10 md:p-14">
          <Badge className={cn(badgeBase, "border border-primary/20 bg-primary/10 text-primary")}>Our journey so far</Badge>
          <p className="mt-3 max-w-3xl text-lead text-muted-foreground">
            MarkazalHaqq remains rooted in the mission of Tareeq Al-Haqq: cultivating clarity upon the path of the Salaf. Here is how our academy came to life.
          </p>
          <div className="mt-10 space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="rounded-card bg-white/90 p-8 shadow-md shadow-primary/5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-eyebrow font-semibold uppercase tracking-[0.3em] text-primary/70">{milestone.year}</p>
                    <h3 className="mt-2 font-headline text-2xl text-foreground">{milestone.title}</h3>
                  </div>
                  <Separator orientation="vertical" className="hidden h-16 bg-primary/10 sm:block" />
                  <p className="max-w-xl text-base text-muted-foreground">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && <div className="mt-8 h-px w-full bg-primary/10" />}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

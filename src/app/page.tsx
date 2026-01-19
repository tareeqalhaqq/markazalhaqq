import Image from "next/image"
import Link from "next/link"
import { BookCopy, GraduationCap, LayoutDashboard, Layers, Sparkles, Users } from "lucide-react"

import { CallToActionBand } from "@/components/marketing/cta-band"
import { MarketingHero } from "@/components/marketing/hero"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { Section } from "@/components/marketing/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-section")
const classroomImage = PlaceHolderImages.find((img) => img.id === "course-1")

const stats = [
  { label: "Years serving seekers", value: "14+" },
  { label: "Core disciplines", value: "10" },
  { label: "Global students", value: "8k" },
]

const programTracks = [
  {
    title: "Tareeq Path",
    focus: "Spiritual refinement",
    description:
      "Cultivate presence through guided dhikr, prophetic character, and living mentorship that keeps your heart anchored.",
    outcomes: ["Curated adhkar frameworks", "Monthly spiritual circles", "Mentor accountability"],
  },
  {
    title: "Haqq Path",
    focus: "Sacred sciences",
    description:
      "Build literacy in aqidah, fiqh, tafsir, hadith, and seerah with sequenced lessons and instructor feedback.",
    outcomes: ["Structured syllabi", "Source texts & translations", "Weekly case-based labs"],
  },
]

const pillars = [
  {
    title: "Guided mentorship",
    description: "Live cohorts with teachers and assistants who know your goals and follow up on progress.",
    icon: Users,
  },
  {
    title: "Immersive curriculum",
    description: "Deep dives, recitations, and assessments that mirror the rhythm of in-person halaqat.",
    icon: Layers,
  },
  {
    title: "Living practice",
    description: "Assignments turn knowledge into service, devotion, and leadership within your community.",
    icon: Sparkles,
  },
]

const curriculum = [
  {
    title: "Foundations of Creed",
    description: "Clarify orthodox belief through classical primers with commentary and contemporary applications.",
  },
  {
    title: "Fiqh of Worship & Life",
    description: "Understand purification, salah, zakah, fasting, and personal transactions with depth and evidence.",
  },
  {
    title: "Seerah Intensives",
    description: "Walk line-by-line through the Prophetic biography drawing leadership and compassion lessons.",
  },
  {
    title: "Arabic & Recitation Labs",
    description: "Strengthen language, tajwid, and comprehension so you interact with the sources directly.",
  },
]

const experienceSteps = [
  {
    title: "Orientation & diagnostic",
    description: "Map your goals, meet mentors, and receive a guided plan tailored to your schedule and background.",
  },
  {
    title: "Weekly live learning",
    description: "Attend interactive lessons, small circles, and reflective assignments that reinforce retention.",
  },
  {
    title: "Applied service projects",
    description: "Translate knowledge into action through service briefs, leadership labs, and community partnerships.",
  },
  {
    title: "Certification & next steps",
    description: "Earn completion badges, receive feedback, and transition into advanced study or teaching support roles.",
  },
]

const testimonial = {
  quote:
    "The academy gave structure to my worship and my study. The mentorship felt like sitting with teachers in person—gentle, precise, and actionable.",
  name: "Former Tareeq & Haqq cohort participant",
}

const badgeBase = "rounded-pill px-4 py-1 text-eyebrow font-semibold uppercase tracking-[0.28em]"

export default function Home() {
  return (
    <div className="space-y-section pb-section">
      <MarketingHero
        badge="Markaz al-Haqq Academy"
        title="A modern learning experience rooted in classical scholarship"
        description="Step into a curated academy—elegant, accessible, and built for seekers who desire both beauty and rigour. Join pathways that weave mentorship, scholarship, and practice together."
        primaryAction={{ label: "Sign In", href: "/sign-in" }}
        secondaryAction={{ label: "View Plans", href: "/plans" }}
        stats={stats}
        image={
          heroImage
            ? { src: heroImage.imageUrl, alt: heroImage.description, hint: heroImage.imageHint }
            : undefined
        }
      />

      <Section background="subtle">
        <div className="rounded-section bg-secondary/5 p-10 shadow-xl shadow-primary/5 md:p-16 border border-white/5">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
            <div className="space-y-5">
              <Badge className={cn(badgeBase, "border border-secondary/30 bg-secondary/10 text-secondary")}>
                Two signature tracks
              </Badge>
              <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
                Choose the journey that aligns with your goals
              </h2>
              <p className="text-lead text-muted-foreground">
                Every cohort follows a modern learner experience while remaining grounded in our authentic isnad.
              </p>
              <Button asChild variant="ghost" className="rounded-pill px-5 text-primary hover:bg-primary/10">
                <Link href="/about">Learn about the academy</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {programTracks.map((track) => (
                <Card key={track.title} className="h-full rounded-card border border-muted bg-card shadow-md">
                  <CardHeader>
                    <div className="text-eyebrow font-semibold uppercase tracking-[0.3em] text-primary">{track.focus}</div>
                    <CardTitle className="mt-3 font-headline text-2xl text-foreground">{track.title}</CardTitle>
                    <CardDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {track.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {track.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                        {outcome}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="gradient">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <Badge className={cn(badgeBase, "mx-auto border border-primary/20 bg-primary/10 text-primary")}>
            What defines the academy
          </Badge>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
            Crafted to feel like a boutique digital campus
          </h2>
          <p className="text-lead text-muted-foreground">
            We redesigned every touchpoint to deliver a polished experience while preserving the soul of our tradition.
          </p>
        </div>
        <PillarGrid pillars={pillars} align="center" className="mt-12" />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-section border border-primary/20 bg-card shadow-2xl">
            {classroomImage && (
              <Image
                src={classroomImage.imageUrl}
                alt={classroomImage.description}
                data-ai-hint={classroomImage.imageHint}
                width={900}
                height={640}
                className="h-full w-full object-cover opacity-90"
              />
            )}
          </div>
          <div className="space-y-6">
            <Badge className={cn(badgeBase, "border border-secondary/25 bg-secondary/10 text-secondary")}>
              Curriculum highlights
            </Badge>
            <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
              A syllabus that progresses with you
            </h2>
            <p className="text-lead text-muted-foreground">
              Each module blends live teaching, guided readings, and applied projects so knowledge becomes a lived reality.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {curriculum.map((course) => (
                <Card key={course.title} className="rounded-card border border-muted bg-card">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl text-foreground">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {course.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="gradient">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <Badge className={cn(badgeBase, "mx-auto border border-primary/20 bg-primary/10 text-primary")}>
            Your learning flow
          </Badge>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
            Designed for momentum from day one
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {experienceSteps.map((step, index) => (
            <Card key={step.title} className="rounded-card border border-white/5 bg-card shadow-md">
              <CardHeader>
                <div className="text-eyebrow font-semibold uppercase tracking-[0.35em] text-primary/80">Step {index + 1}</div>
                <CardTitle className="mt-2 font-headline text-xl text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-section bg-gradient-to-br from-slate-900 via-slate-950 to-blue-900 p-12 text-white md:p-16 border border-white/10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
            <div className="space-y-6">
              <Badge className={cn(badgeBase, "bg-white/10 text-white/80 border border-white/20")}>Student reflections</Badge>
              <h2 className="font-headline text-display-1 font-semibold text-white sm:text-display-2">
                &quot;It felt like the digital campus I always wished existed.&quot;
              </h2>
              <p className="text-base text-slate-200">{testimonial.quote}</p>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.35em] text-white/60">{testimonial.name}</p>
            </div>
            <div className="rounded-card border border-white/15 bg-white/10 p-8 text-slate-100">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-eyebrow uppercase tracking-[0.3em] text-white/60">Access included</p>
                    <p className="text-lg font-semibold">Live classes & replays</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-eyebrow uppercase tracking-[0.3em] text-white/60">Resources</p>
                    <p className="text-lg font-semibold">Guided workbooks & dashboards</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <BookCopy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-eyebrow uppercase tracking-[0.3em] text-white/60">Certification</p>
                    <p className="text-lg font-semibold">Completion pathway for both tracks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <CallToActionBand
          badge="Join the Academy"
          title="Begin your journey of sacred knowledge"
          description="Sign in to access your dashboard and start your learning path."
          primaryAction={{ label: "Sign In", href: "/sign-in" }}
        // secondaryAction={{ label: "View FAQs", href: "/faq" }}
        />
      </Section>
    </div>
  )
}

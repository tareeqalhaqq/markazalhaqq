import { GraduationCap, LayoutDashboard, BookCopy, Users, Layers, Sparkles } from "lucide-react"

import { CallToActionBand } from "@/components/marketing/cta-band"
import { MarketingHero } from "@/components/marketing/hero"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { Section } from "@/components/marketing/section"

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

export default function Home() {
  return (
    <div className="space-y-0 pb-0">
      <MarketingHero
        badge="Markaz al-Haqq Academy"
        title="A modern learning experience rooted in classical scholarship"
        description="Step into a curated academy built for seekers who desire both beauty and rigour. Join pathways that weave mentorship, scholarship, and practice together."
        primaryAction={{ label: "Get Started", href: "/sign-up" }}
        secondaryAction={{ label: "Learn More", href: "/about" }}
        stats={stats}
      />

      {/* Two Tracks Section */}
      <Section background="subtle" padding="default">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Two signature tracks
          </span>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
            Choose the journey that aligns with your goals
          </h2>
          <p className="text-lead text-white/50">
            Every cohort follows a modern learner experience while remaining grounded in our authentic isnad.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {programTracks.map((track) => (
            <div key={track.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{track.focus}</p>
              <h3 className="mt-3 font-headline text-2xl font-semibold text-foreground">{track.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{track.description}</p>
              <div className="mt-6 space-y-3">
                {track.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 text-sm text-white/50">
                    <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pillars Section */}
      <Section background="gradient" padding="default">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            What defines the academy
          </span>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
            Built for calm, focused study
          </h2>
          <p className="text-lead text-white/50">
            Every touchpoint delivers a polished experience while preserving the soul of our tradition.
          </p>
        </div>
        <PillarGrid pillars={pillars} align="center" className="mt-12" />
      </Section>

      {/* Curriculum Section */}
      <Section padding="default">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Curriculum highlights
          </span>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
            A syllabus that progresses with you
          </h2>
          <p className="text-lead text-white/50">
            Each module blends live teaching, guided readings, and applied projects so knowledge becomes a lived reality.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {curriculum.map((course) => (
            <div key={course.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
              <h3 className="font-headline text-xl font-semibold text-foreground">{course.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{course.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Learning Flow Section */}
      <Section background="gradient" padding="default">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Your learning flow
          </span>
          <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
            Designed for momentum from day one
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {experienceSteps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">Step {index + 1}</p>
              <h3 className="mt-2 font-headline text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonial Section */}
      <Section padding="default">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-12 md:p-16">
          <div className="grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Student reflections
              </span>
              <h2 className="font-headline text-display-1 font-semibold text-foreground sm:text-display-2">
                &quot;It felt like the digital campus I always wished existed.&quot;
              </h2>
              <p className="text-sm text-white/50">
                The academy gave structure to my worship and my study. The mentorship felt like sitting with teachers in person.
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Former Tareeq & Haqq cohort participant
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Access included</p>
                    <p className="text-sm font-semibold text-foreground">Live classes & replays</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Resources</p>
                    <p className="text-sm font-semibold text-foreground">Guided workbooks & dashboards</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookCopy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Certification</p>
                    <p className="text-sm font-semibold text-foreground">Completion pathway for both tracks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="default">
        <CallToActionBand
          badge="Join the Academy"
          title="Begin your journey of sacred knowledge"
          description="Create your account and start your learning path today."
          primaryAction={{ label: "Get Started", href: "/sign-up" }}
          secondaryAction={{ label: "View FAQ", href: "/faq" }}
        />
      </Section>
    </div>
  )
}

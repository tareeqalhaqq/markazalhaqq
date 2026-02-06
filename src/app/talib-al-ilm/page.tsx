export const dynamic = 'force-dynamic'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/marketing/section"
import { MarketingHero } from "@/components/marketing/hero"

const levelCatalogue = [
  {
    level: "Level 1",
    title: "Foundational Seekers",
    focus: "Introductory creed, fiqh of worship, and structured Arabic primers.",
    courses: [
      "Foundations of Aqidah",
      "Fiqh of Worship essentials",
      "Arabic for Sacred Texts - Starter pathway",
    ],
    outcomes: [
      "Solidify creedal pillars using classical texts",
      "Master purification and daily salah with confidence",
      "Read short prophetic narrations with guided vocabulary notes",
    ],
  },
  {
    level: "Level 2",
    title: "Committed Students",
    focus: "Deepen seerah studies, expand fiqh applications, and unlock tajwid labs.",
    courses: [
      "Aurjuzah Al-Miyyah Immersive",
      "Fiqh of Worship & Daily Living",
      "Arabic for Sacred Texts - Applied readings",
    ],
    outcomes: [
      "Connect prophetic biography events to contemporary life",
      "Apply madhhab-specific rulings to complex scenarios",
      "Lead recitation circles with tajwid corrections",
    ],
  },
  {
    level: "Level 3",
    title: "Scholarly Track",
    focus: "Advanced text readings, comparative fiqh, and mentorship on teaching methodology.",
    courses: [
      "Advanced Aqidah dialogues",
      "Fiqh capstone clinics",
      "Arabic rhetoric for da'wah",
    ],
    outcomes: [
      "Defend creed with classical and contemporary proofs",
      "Facilitate community case studies using the seerah roadmap",
      "Craft lesson plans for local study circles",
    ],
  },
]

const allAccessHighlights = [
  {
    title: "Every course, one enrolment",
    description: "Talib al Ilm members see all published courses, replays, downloads, and live sessions instantly in their dashboard.",
  },
  {
    title: "Universal quiz access",
    description: "Assessments created in any course workspace unlock for members by default.",
  },
  {
    title: "Level-based progression",
    description: "Courses are organized across levels to curate a guided journey from foundations to advanced mastery.",
  },
]

const adminToolkit = [
  {
    title: "Organise by level",
    description: "Assign any course to a level, reorder pathways, or mark prerequisites so seekers know the recommended flow.",
  },
  {
    title: "Monitor cohort momentum",
    description: "See quiz completion, discussion activity, and mentor follow-ups across all courses in a unified view.",
  },
  {
    title: "Launch spotlight programmes",
    description: "Feature seasonal intensives or new cohorts to the entire Talib al Ilm community with a single toggle.",
  },
]

export default function TalibAlIlmPage() {
  return (
    <div className="pb-0">
      <MarketingHero
        badge="Talib al Ilm programme"
        title="One membership unlocking every course, quiz, and cohort experience"
        description="Built for seekers who want structured progression, the Talib al Ilm programme opens the entire Markaz al-Haqq library and organises courses into levels."
        primaryAction={{ label: "Join the waitlist", href: "/sign-up" }}
        secondaryAction={{ label: "Browse courses", href: "/courses" }}
      />

      {/* All Access Highlights */}
      <Section padding="default">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-semibold text-foreground">Why seekers love Talib al Ilm</h2>
            <p className="text-sm text-white/50">
              The programme mirrors the polish of our redesigned student experience while layering in academy-wide access.
            </p>
            <div className="mt-6 space-y-4">
              {allAccessHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <h3 className="text-sm font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
            <h2 className="font-headline text-2xl font-semibold text-foreground">Membership snapshot</h2>
            <p className="mt-2 text-sm text-white/50">
              Everything an eager student needs to immerse in sacred knowledge year-round.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <span className="text-sm font-medium text-foreground">Monthly investment</span>
                <span className="text-lg font-semibold text-primary">$95</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <span className="text-sm font-medium text-foreground">Annual commitment</span>
                <span className="text-lg font-semibold text-primary">$950</span>
              </div>
              <p className="text-sm text-white/40">
                Includes every live cohort, on-demand replay, quiz, workbook, and discussion thread. Scholarships available upon request.
              </p>
              <Button asChild className="mt-2 w-full rounded-full font-semibold">
                <Link href="/sign-up">Join Talib al Ilm waitlist</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Level Catalogue */}
      <Section background="subtle" padding="default">
        <div className="space-y-4 mb-10">
          <h2 className="font-headline text-2xl font-semibold text-foreground">Level-based course organisation</h2>
          <p className="max-w-3xl text-sm text-white/50">
            Courses are organized into levels so students always know the next best step. Levels update instantly across instructor workspaces and the student dashboard.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {levelCatalogue.map((level) => (
            <div key={level.level} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{level.level}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{level.title}</h3>
              <p className="mt-2 text-sm text-white/50">{level.focus}</p>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70">Courses</p>
                  <ul className="mt-2 space-y-1.5">
                    {level.courses.map((course) => (
                      <li key={course} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-foreground">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70">Outcomes</p>
                  <ul className="mt-2 space-y-1.5">
                    {level.outcomes.map((outcome) => (
                      <li key={outcome} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-white/60">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Admin Toolkit */}
      <Section padding="default">
        <div className="space-y-4 mb-8">
          <h2 className="font-headline text-2xl font-semibold text-foreground">Admin toolkit</h2>
          <p className="text-sm text-white/50">
            Empower your team to manage access, pathway ordering, and spotlight content without touching code.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {adminToolkit.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm text-white/50">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section padding="default">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-10 text-center md:p-14">
          <h2 className="font-headline text-2xl font-semibold text-foreground sm:text-3xl">
            Ready to give your community all-access learning?
          </h2>
          <p className="mt-4 text-sm text-white/50">
            Pair the Talib al Ilm membership with your existing cohorts or launch it as the flagship experience for your markaz.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-full px-6 font-semibold">
              <Link href="/sign-up">Start application</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/10 px-6 text-white/70 hover:bg-white/5 hover:text-white">
              <Link href="/courses">Browse courses</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}

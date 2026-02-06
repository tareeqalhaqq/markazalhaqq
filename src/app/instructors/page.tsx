export const dynamic = 'force-dynamic'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Users2, BookOpenCheck, GraduationCap } from "lucide-react"
import { Section } from "@/components/marketing/section"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { MarketingHero } from "@/components/marketing/hero"

const instructorHighlights = [
  {
    title: "Connected to Tareeq Al-Haqq",
    description:
      "Our teaching team consists of scholars and students of knowledge who contribute directly to Tareeq Al-Haqq programs, events, and publications.",
    icon: Users2,
  },
  {
    title: "Verified credentials",
    description:
      "Each instructor is vetted for their ijazaat, methodology, and ability to communicate clearly while remaining rooted in the Quran and Sunnah.",
    icon: GraduationCap,
  },
  {
    title: "Mentorship-first teaching",
    description:
      "Expect live review sessions, feedback opportunities, and community engagement that keeps you supported between lessons.",
    icon: BookOpenCheck,
  },
]

export default function InstructorsPage() {
  return (
    <div className="pb-0">
      <MarketingHero
        badge="Teaching team"
        title="Guided by trusted instructors"
        description="The detailed roster will be released as we launch each course. Every teacher is part of the Tareeq Al-Haqq network, ensuring consistency in creed, methodology, and character."
        primaryAction={{ label: "Join the waitlist", href: "/sign-up" }}
        secondaryAction={{ label: "About the academy", href: "/about" }}
      />

      <Section>
        <PillarGrid pillars={instructorHighlights} align="center" />
      </Section>

      <Section padding="default">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-10 text-center md:p-14">
          <h2 className="font-headline text-2xl font-semibold text-foreground sm:text-3xl">
            Instructor roster coming soon
          </h2>
          <p className="mt-4 text-sm text-white/50">
            We will publish instructor bios and teaching schedules as we confirm the Seerah cohort timeline. Join the waitlist to receive announcements first.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-8 font-semibold">
            <Link href="/sign-up">Join the waitlist</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}

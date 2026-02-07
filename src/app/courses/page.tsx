import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/marketing/section"
import { MarketingHero } from "@/components/marketing/hero"

const courseCatalog = [
  {
    title: "Seerah Foundations",
    instructor: "Shaykh Musa",
    cohort: "Cohort 1",
    description:
      "Trace the life of the Prophet \u2E16 from birth to the Constitution of Madinah. Six structured lessons with live review circles and a companion workbook.",
    status: "Enrollment open",
    lessonCount: 6,
    level: "Foundational",
  },
  {
    title: "Arabic Primer",
    instructor: "Ustadha Mariam",
    cohort: "Cohort 2",
    description:
      "Master the alphabet, nominal sentences, and verb patterns through guided audio sets and interactive Q&A sessions.",
    status: "Coming soon",
    lessonCount: 3,
    level: "Foundational",
  },
  {
    title: "Fiqh of Worship",
    instructor: "Shaykh Bilal",
    cohort: "Founders",
    description:
      "Purification essentials and prayer obligations taught through a classical text-based approach with practical application.",
    status: "In development",
    lessonCount: 2,
    level: "Foundational",
  },
]

export default function CoursesPage() {
  return (
    <div className="pb-0">
      <MarketingHero
        badge="Course catalog"
        title="Structured courses rooted in the Quran and Sunnah"
        description="Each course is crafted by verified instructors and organized into cohorts with live sessions, downloadable resources, and guided assessments."
        primaryAction={{ label: "Join the waitlist", href: "/sign-up" }}
        secondaryAction={{ label: "View programme", href: "/talib-al-ilm" }}
      />

      <Section padding="default">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courseCatalog.map((course) => (
            <Card
              key={course.title}
              className="flex flex-col border-white/[0.06] bg-white/[0.03]"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-primary/40 text-primary text-[10px] uppercase tracking-[0.2em]"
                  >
                    {course.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-white/50 text-[10px] uppercase tracking-[0.2em]"
                  >
                    {course.status}
                  </Badge>
                </div>
                <CardTitle className="mt-3 text-xl text-foreground">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-white/50">
                  {course.instructor} &middot; {course.cohort}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-white/50">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{course.lessonCount} lessons</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="default">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-10 text-center md:p-14">
          <h2 className="font-headline text-2xl font-semibold text-foreground sm:text-3xl">
            More courses launching soon
          </h2>
          <p className="mt-4 text-sm text-white/50">
            New cohorts and advanced tracks are being prepared. Join the waitlist to receive announcements as they go live.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-8 font-semibold">
            <Link href="/sign-up">Join the waitlist</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}

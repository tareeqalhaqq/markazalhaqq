import Link from "next/link"

import { CallToActionBand } from "@/components/marketing/cta-band"
import { MarketingHero } from "@/components/marketing/hero"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { Section } from "@/components/marketing/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPublishedCourses, type Course } from "@/lib/courses"
import { cn } from "@/lib/utils"

const coursePillars = [
  {
    title: "Live cohorts & replays",
    description: "Every course includes live instruction with replay access so you can revisit the material anytime.",
  },
  {
    title: "Mentor follow-up",
    description: "Dedicated mentors keep you accountable, answer questions, and help you integrate lessons into your worship.",
  },
  {
    title: "Project-based learning",
    description: "Expect reflective journals, community briefs, and service projects that translate knowledge into action.",
  },
]

const badgeBase = "rounded-pill px-4 py-1 text-eyebrow font-semibold uppercase tracking-[0.28em]"

const statusStyles: Record<Exclude<Course["status"], undefined>, string> = {
  upcoming: "border-amber-400/40 bg-amber-400/10 text-amber-900",
  active: "border-emerald-400/40 bg-emerald-400/10 text-emerald-900",
  completed: "border-blue-400/40 bg-blue-400/10 text-blue-900",
}

const statusLabels: Record<Exclude<Course["status"], undefined>, string> = {
  upcoming: "Upcoming",
  active: "In progress",
  completed: "Completed",
}

const gradientPalette = [
  "from-slate-900 via-indigo-900 to-purple-900",
  "from-slate-900 via-emerald-900 to-teal-900",
  "from-slate-900 via-rose-900 to-orange-900",
  "from-slate-900 via-sky-900 to-cyan-900",
]

type TimestampLike = { toDate: () => Date }

function coerceDate(value?: string | number | Date | TimestampLike | null) {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === "number") {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }
  if (typeof value === "string") {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }
  if (typeof value === "object" && typeof value.toDate === "function") {
    return value.toDate()
  }
  return null
}

function formatStartDate(value?: string | number | Date | TimestampLike | null) {
  const date = coerceDate(value)
  if (!date) return "Start date TBA"
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}

function formatLastUpdated(date: Date) {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function formatLessonCount(value?: number) {
  if (!value) return "Lesson count shared in dashboard"
  const plural = value === 1 ? "lesson" : "lessons"
  return `${value} ${plural}`
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const gradient = gradientPalette[index % gradientPalette.length]
  const status = course.status ?? "upcoming"
  const statusClass = statusStyles[status]
  const startDate = formatStartDate(course.startDate)
  const lessonCount = formatLessonCount(course.lessonCount)
  const instructorName = course.instructor || "Instructor TBA"

  return (
    <Card className="flex h-full flex-col overflow-hidden border border-slate-200/70 bg-white/95 shadow-xl shadow-slate-900/5">
      <div className="relative h-56 w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center",
            course.coverImage ? undefined : "bg-gradient-to-br",
            course.coverImage ? undefined : gradient,
          )}
          style={
            course.coverImage
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.75) 100%), url(${course.coverImage})`,
                }
              : undefined
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-5 text-white">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/50 bg-white/10 text-white">
              {course.level || "All levels"}
            </Badge>
            <Badge className={cn("border text-xs font-semibold uppercase tracking-[0.3em]", statusClass)}>
              {statusLabels[status]}
            </Badge>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">Instructor</p>
            <p className="text-lg font-semibold text-white">{instructorName}</p>
          </div>
        </div>
      </div>
      <CardHeader className="space-y-3">
        <CardTitle className="font-headline text-2xl text-slate-900">{course.title}</CardTitle>
        <CardDescription className="text-base leading-relaxed text-slate-600">
          {course.description || "A detailed course description will appear here once the admin team adds it to Firestore."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-slate-900">Starts</dt>
            <dd>{startDate}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Lessons</dt>
            <dd>{lessonCount}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Status</dt>
            <dd>{statusLabels[status]}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 border-t border-slate-200/70 bg-white/90 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">Live data from the academy workspace – updates appear within seconds of publishing.</div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild className="rounded-pill px-6">
            <Link href={course.slug ? `/courses/${course.slug}` : "/signup"}>
              {status === "active" ? "View course" : "Join waitlist"}
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-pill px-6">
            <Link href="/login">Existing student</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default async function CoursesPage() {
  const courses = await getPublishedCourses()
  const lastUpdated = courses.reduce<Date | null>((latest, course) => {
    const current = coerceDate(course.updatedAt ?? null)
    if (!current) return latest
    if (!latest || current.getTime() > latest.getTime()) {
      return current
    }
    return latest
  }, null)

  const hasCourses = courses.length > 0

  return (
    <div className="space-y-section pb-section">
      <MarketingHero
        eyebrow="Academy library"
        title="Courses curated for serious seekers"
        description="Every course below is powered directly from the academy database so published updates appear instantly."
        actions={[
          { label: "View all courses", href: "#catalog", primary: true },
          { label: "How we teach", href: "#pillars" },
        ]}
      />

      <Section id="pillars">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-3 rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-lg shadow-slate-900/5">
            <p className={badgeBase}>Structured learning</p>
            <h2 className="font-headline text-3xl font-semibold text-slate-900">What to expect</h2>
            <p className="text-base text-slate-600">
              Cohorts, office hours, and community briefs are planned centrally, then synced live to the student dashboards.
            </p>
          </div>
          <PillarGrid pillars={coursePillars} />
        </div>
      </Section>

      <Section id="catalog">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className={badgeBase}>Live from Firestore</p>
            <h2 className="font-headline text-3xl font-semibold text-slate-900">Available courses</h2>
            <p className="text-slate-600">
              Every entry below comes directly from the academy database — no more hard-coded catalogs.
            </p>
          </div>
          {lastUpdated ? (
            <div className="text-sm text-slate-500">Last updated {formatLastUpdated(lastUpdated)}</div>
          ) : null}
        </div>

        {!hasCourses ? (
          <Alert className="mt-6 border-amber-200 bg-amber-50 text-amber-900">
            <AlertTitle>Courses are on the way</AlertTitle>
            <AlertDescription>
              The academy team hasn&apos;t published courses yet. Check back soon or join the waitlist to hear first.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </Section>

      <CallToActionBand
        title="Ready to start learning?"
        description="Create your academy account to access live cohorts, replays, and instructor-led progress tracking."
        primaryAction={{ label: "Create account", href: "/signup" }}
        secondaryAction={{ label: "Sign in", href: "/login" }}
      />
    </div>
  )
}

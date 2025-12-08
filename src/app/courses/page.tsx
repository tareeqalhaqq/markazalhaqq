"use client"

import { useMemo } from "react"
import Link from "next/link"

import { CallToActionBand } from "@/components/marketing/cta-band"
import { MarketingHero } from "@/components/marketing/hero"
import { PillarGrid } from "@/components/marketing/pillar-grid"
import { Section } from "@/components/marketing/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFirestoreCollection, type FirestoreDocument } from "@/hooks/useFirestoreCollection"
import { useUserRole } from "@/hooks/useUserRole"
import type { AcademyCourse } from "@/lib/academy-data"
import { cn } from "@/lib/utils"

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

const statusStyles: Record<Exclude<AcademyCourse["status"], undefined>, string> = {
  upcoming: "border-amber-400/40 bg-amber-400/10 text-amber-900",
  active: "border-emerald-400/40 bg-emerald-400/10 text-emerald-900",
  completed: "border-blue-400/40 bg-blue-400/10 text-blue-900",
}

const statusLabels: Record<Exclude<AcademyCourse["status"], undefined>, string> = {
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

type CourseDoc = FirestoreDocument<AcademyCourse>

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

function CourseCard({ course, index }: { course: CourseDoc; index: number }) {
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
        <div className="text-sm text-slate-500">
          Live data from the admin workspace – updates appear within seconds of publishing.
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild className="rounded-pill px-6">
            <Link href="/signup">{status === "active" ? "Join current cohort" : "Join waitlist"}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-pill px-6">
            <Link href="/login">Existing student</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function CoursesPage() {
  const { data: courses, loading, error } = useFirestoreCollection<AcademyCourse>("courses", {
    orderByField: "updatedAt",
    orderDirection: "desc",
  })
  const { role } = useUserRole()
  const isAdmin = role === "admin"

  const hasCourses = courses.length > 0
  const lastUpdated = useMemo(() => {
    return courses.reduce<Date | null>((latest, course) => {
      const current = coerceDate(course.updatedAt ?? null)
      if (!current) return latest
      if (!latest || current.getTime() > latest.getTime()) {
        return current
      }
      return latest
    }, null)
  }, [courses])

  return (
    <div className="space-y-section pb-section">
      <MarketingHero
        alignment="center"
        badge="Synced from admin workspace"
        title="Explore the programmes currently staged inside Markaz al Haqq"
        description="The catalog below is populated straight from Firebase. When administrators add, update, or hide a course, the change appears here immediately—no manual copy/paste."
        primaryAction={{ label: "Join the waitlist", href: "/signup" }}
        secondaryAction={{ label: "Existing student", href: "/login" }}
      />

      <Section>
        <div className="space-y-3 text-center">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            {hasCourses
              ? `${courses.length} programme${courses.length === 1 ? "" : "s"} ready for enrolment`
              : "Courses publish automatically once admins create them"}
          </p>
          {lastUpdated ? (
            <p className="text-sm text-muted-foreground">Catalog refreshed {formatLastUpdated(lastUpdated)} via Firestore</p>
          ) : null}
        </div>

        {error ? (
          <Alert variant="destructive" className="mt-8">
            <AlertTitle>Unable to load courses</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <div className="mt-8">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="h-full animate-pulse rounded-card border border-slate-200/60 bg-white/60">
                  <div className="h-56 w-full rounded-t-card bg-slate-200/60" />
                  <CardHeader>
                    <div className="h-6 w-3/4 rounded-full bg-slate-200" />
                    <div className="mt-3 h-4 w-full rounded-full bg-slate-200" />
                    <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="h-3 rounded-full bg-slate-200" />
                      <div className="h-3 rounded-full bg-slate-200" />
                      <div className="h-3 rounded-full bg-slate-200" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 border-t border-slate-200/70 bg-white/80 p-6 sm:flex-row">
                    <div className="h-9 w-full rounded-full bg-slate-200" />
                    <div className="h-9 w-full rounded-full bg-slate-200" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : hasCourses ? (
            <div className="grid gap-8 md:grid-cols-2">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <Card className="rounded-section border-dashed border-slate-300 bg-white/70">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-slate-800">Courses will appear here</CardTitle>
                <CardDescription className="text-base text-slate-600">
                  As soon as an administrator publishes the first course inside the dashboard, it will populate this section without additional development work.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {isAdmin ? (
                  <Button asChild className="rounded-pill">
                    <Link href="/dashboard/admin">Open admin workspace</Link>
                  </Button>
                ) : (
                  <>
                    <p className="text-sm text-slate-600">
                      The catalog syncs directly with Firebase—once the admin team adds programmes in the dashboard, they go live here automatically.
                    </p>
                    <Button asChild className="rounded-pill">
                      <Link href="/signup">Join the waitlist</Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </Section>

      <Section background="subtle">
        <div className="rounded-section bg-white/90 p-12 shadow-xl shadow-indigo-500/5 md:p-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
            <div className="space-y-5">
              <Badge className={cn(badgeBase, "border border-indigo-200/60 bg-indigo-50 text-indigo-700")}>What every course includes</Badge>
              <h2 className="font-headline text-display-1 font-semibold text-slate-900 sm:text-display-2">
                A consistent, elevated learning experience
              </h2>
              <p className="text-lead text-slate-600">
                Whether you join a live cohort or an evergreen lab, your dashboard mirrors the refined aesthetic of sokacademy.com with intuitive navigation and polished resources.
              </p>
            </div>
            <PillarGrid pillars={coursePillars} align="center" className="md:-m-2 md:grid-cols-3" softBackground />
          </div>
          <CallToActionBand
            className="mt-10"
            badge="Need a tailored recommendation?"
            title="Tell us about your background"
            description="Share your background and our team will match you with the right course bundle."
            primaryAction={{ label: "Start intake form", href: "/signup" }}
            secondaryAction={{ label: "Course FAQ", href: "/faq" }}
          />
        </div>
      </Section>
    </div>
  )
}

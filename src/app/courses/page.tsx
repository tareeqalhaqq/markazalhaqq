"use client"

import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFirestoreCollection, type FirestoreDocument } from "@/hooks/useFirestoreCollection"
import type { AcademyCourse } from "@/lib/academy-data"
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

function formatStartDate(value?: string) {
  if (!value) return "Start date TBA"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
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
          <Button asChild className="rounded-full px-6">
            <Link href="/signup">{status === "active" ? "Join current cohort" : "Join waitlist"}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
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

  const hasCourses = courses.length > 0

  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-indigo-50/70 to-blue-50/60" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="rounded-full border border-indigo-200/60 bg-white px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-700">
              Synced from admin workspace
            </Badge>
            <h1 className="mt-6 font-headline text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Explore the programmes currently staged inside Markaz al Haqq
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              The catalog below is populated straight from Firebase. When administrators add, update, or hide a course, the change appears here immediately—no manual copy/paste.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-500">
              {hasCourses
                ? `${courses.length} programme${courses.length === 1 ? "" : "s"} ready for enrolment`
                : "Courses publish automatically once admins create them"}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        {error ? (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Unable to load courses</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="h-full animate-pulse border border-slate-200/60 bg-white/60">
                <div className="h-56 w-full bg-slate-200/60" />
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
          <Card className="border-dashed border-slate-300 bg-white/70">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-slate-800">Courses will appear here</CardTitle>
              <CardDescription className="text-base text-slate-600">
                As soon as an administrator publishes the first course inside the dashboard, it will populate this section without additional development work.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="rounded-full">
                <Link href="/dashboard/admin">Open admin workspace</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="container mx-auto px-6">
        <div className="rounded-[3rem] bg-white/90 p-12 shadow-xl shadow-indigo-500/5 md:p-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-indigo-50 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-700">
                What every course includes
              </Badge>
              <h2 className="font-headline text-3xl font-semibold text-slate-900 sm:text-4xl">
                A consistent, elevated learning experience
              </h2>
              <p className="text-lg text-slate-600">
                Whether you join a live cohort or an evergreen lab, your dashboard mirrors the refined aesthetic of sokacademy.com with intuitive navigation and polished resources.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {coursePillars.map((pillar) => (
                <Card key={pillar.title} className="border border-slate-200 bg-white/80 text-center shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg text-slate-900">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-slate-600">{pillar.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-indigo-200/70 bg-indigo-50 p-8 text-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-headline text-2xl text-slate-900">Need a tailored recommendation?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Share your background and our team will match you with the right course bundle.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/signup">Start intake form</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-indigo-200 px-6 text-indigo-700 hover:bg-indigo-100">
                <Link href="/faq">Course FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

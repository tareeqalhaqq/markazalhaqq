import { notFound } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getCourseBySlug } from "@/lib/courses"

function formatDate(value?: string | number | Date | { toDate: () => Date } | null) {
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

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const startDate = formatDate(course.start_date)
  const updatedAt = formatDate(course.updated_at ?? null)

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 space-y-10">
      <div className="space-y-4">
        <Link href="/courses" className="text-sm text-white/40 transition hover:text-white/70">
          &larr; Back to courses
        </Link>
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {course.level || "All levels"}
          </span>
          <h1 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">{course.title}</h1>
          <p className="text-sm text-white/50">{course.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-white/40">
            {course.status ? <span>Status: {course.status}</span> : null}
            {startDate ? <span>Starts {startDate.toLocaleDateString(undefined, { dateStyle: "medium" })}</span> : null}
            {updatedAt ? <span>Updated {updatedAt.toLocaleDateString(undefined, { dateStyle: "medium" })}</span> : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
        <h2 className="font-headline text-xl font-semibold text-foreground">What you&apos;ll learn</h2>
        <p className="mt-2 text-sm text-white/50">
          Content, live sessions, and resources sync directly from the academy workspace.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Instructor</p>
            <p className="mt-1 text-sm text-foreground">{course.instructor_name || "Assigned soon"}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Lessons</p>
            <p className="mt-1 text-sm text-foreground">{course.lesson_count ? `${course.lesson_count} planned` : "Coming soon"}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Live access</p>
            <p className="mt-1 text-sm text-foreground">{course.is_live ? "Includes live cohorts" : "Schedule announced per course"}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Level</p>
            <p className="mt-1 text-sm text-foreground">{course.level || "Open to all"}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="rounded-full px-6 font-semibold">
            <Link href="/sign-up">Join this course</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-white/10 px-6 text-white/70 hover:bg-white/5 hover:text-white">
            <Link href="/sign-in">Already enrolled? Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug)

  if (!course) {
    notFound()
  }

  const startDate = formatDate(course.startDate)
  const updatedAt = formatDate(course.updatedAt ?? null)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <div className="space-y-3">
          <Link href="/courses" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            ← Back to courses
          </Link>
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full border-slate-300 bg-white text-slate-700">
              {course.level || "All levels"}
            </Badge>
            <h1 className="font-headline text-4xl font-semibold text-slate-900">{course.title}</h1>
            <p className="text-lg text-slate-600">{course.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              {course.status ? <span>Status: {course.status}</span> : null}
              {startDate ? <span>Starts {startDate.toLocaleDateString(undefined, { dateStyle: "medium" })}</span> : null}
              {updatedAt ? <span>Updated {updatedAt.toLocaleDateString(undefined, { dateStyle: "medium" })}</span> : null}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What you&apos;ll learn</CardTitle>
            <CardDescription>
              Content, live sessions, and resources sync directly from the academy workspace so students always see the latest
              schedule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-700">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">Instructor</p>
                <p>{course.instructor || "Assigned soon"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Lessons</p>
                <p>{course.lessonCount ? `${course.lessonCount} planned` : "Lesson plan coming soon"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Live access</p>
                <p>{course.isLive ? "Includes live cohorts" : "Live schedule announced per course"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Level</p>
                <p>{course.level || "Open to all"}</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/signup">Join this course</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/login">Already enrolled? Sign in</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

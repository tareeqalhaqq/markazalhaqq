'use client'

import { useEffect, useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, Download, Flame, PlayCircle, Sparkles, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"

import {
  getCourseProgress,
  getNextLesson,
  getPublishedLessons,
  getResourceLibrary,
  getUpcomingSessions,
  type Course,
  useAcademyData,
} from "../_components/academy-data-context"

type Milestone = {
  label: string
  value: number
  target: number
}

export default function StudentDashboardPage() {
  const { state, markLessonComplete } = useAcademyData()
  const courses = useMemo(() => state.courses.filter((course) => course.isVisibleToStudents), [state.courses])

  const [highlightedCourseId, setHighlightedCourseId] = useState<string>(courses[0]?.id ?? "")

  useEffect(() => {
    if (!courses.find((course) => course.id === highlightedCourseId)) {
      setHighlightedCourseId(courses[0]?.id ?? "")
    }
  }, [courses, highlightedCourseId])

  const activeCourse = useMemo(
    () => courses.find((course) => course.id === highlightedCourseId) ?? courses[0],
    [courses, highlightedCourseId],
  )

  const nextLesson = activeCourse ? getNextLesson(activeCourse) : undefined
  const upcomingSessions = useMemo(() => getUpcomingSessions(courses).slice(0, 6), [courses])
  const resourceLibrary = useMemo(() => getResourceLibrary(courses), [courses])

  const completedLessons = useMemo(
    () => courses.reduce((total, course) => total + course.completedLessonIds.length, 0),
    [courses],
  )
  const publishedLessons = useMemo(
    () => courses.reduce((total, course) => total + getPublishedLessons(course).length, 0),
    [courses],
  )

  const streakMilestones: Milestone[] = useMemo(
    () => [
      {
        label: "Lessons completed",
        value: completedLessons,
        target: Math.max(publishedLessons, 1),
      },
      {
        label: "Courses in progress",
        value: courses.length,
        target: Math.max(courses.length + 2, 1),
      },
    ],
    [completedLessons, publishedLessons, courses.length],
  )

  function handleMarkComplete(course: Course | undefined, lessonId?: string) {
    if (!course || !lessonId) {
      toast({
        title: "Nothing to update",
        description: "Once your instructor publishes a lesson it will appear here for you to complete.",
      })
      return
    }

    markLessonComplete({ courseId: course.id, lessonId })
    toast({
      title: "Progress saved",
      description: `${course.title} has been updated. Refresh the instructor dashboard to see the sync in action.`,
    })
  }

  function handleDownload(resourceTitle: string) {
    toast({
      title: `Preparing ${resourceTitle}`,
      description: "Downloads will link to Firebase storage once connected.",
    })
  }

  const hasCourses = courses.length > 0

  return (
    <div className="container mx-auto max-w-5xl space-y-8 px-6">
      <div className="rounded-3xl border border-primary/20 bg-white/95 p-10 shadow-xl shadow-primary/10">
        <Badge variant="outline" className="border-primary/40 text-primary">
          Synced student preview
        </Badge>
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground">Welcome back, demo learner</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          This dashboard mirrors the data managed in the instructor panel. Use it to confirm that course launches, lesson
          releases, and resources appear exactly as you expect before wiring up Firebase.
        </p>
      </div>

      {hasCourses ? (
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">Your courses</CardTitle>
                <CardDescription>Select a course to review your next lesson and progress.</CardDescription>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary">
                Student account: student@tareeqalhaqq.com
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow
                      key={course.id}
                      onClick={() => setHighlightedCourseId(course.id)}
                      className={`cursor-pointer transition-colors ${
                        highlightedCourseId === course.id ? "bg-primary/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell className="font-medium text-foreground">{course.title}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/40 text-primary">
                          {course.phase === "Active" ? "In progress" : course.phase}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-primary">
                        {getCourseProgress(course)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {activeCourse ? (
                <div className="rounded-2xl border border-border/40 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>Next lesson</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {activeCourse.phase === "Active" ? "Live" : activeCourse.phase}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-headline text-xl text-foreground">
                    {nextLesson ? nextLesson.title : "Waiting for the instructor"}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> {nextLesson?.releaseDate ?? "Release date to be confirmed"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Timer className="h-4 w-4" /> {getCourseProgress(activeCourse)}% complete
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button
                      className="rounded-full"
                      onClick={() => handleMarkComplete(activeCourse, nextLesson?.id)}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Mark lesson complete
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        toast({
                          title: "Message sent",
                          description: "Instructor messaging will connect through Firebase when available.",
                        })
                      }
                    >
                      Message instructor
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Momentum</CardTitle>
                <CardDescription>These numbers update as you progress through published lessons.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {streakMilestones.map((milestone) => (
                  <div key={milestone.label} className="rounded-2xl border border-border/40 bg-background/70 p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                      <span>{milestone.label}</span>
                      <span>
                        {milestone.value}/{milestone.target}
                      </span>
                    </div>
                    <Progress value={Math.min((milestone.value / milestone.target) * 100, 100)} />
                  </div>
                ))}
                <div className="rounded-2xl border border-primary/40 bg-primary/5 p-4 text-sm text-primary">
                  <Sparkles className="mb-2 h-4 w-4" />
                  Complete newly published lessons to unlock surprise rewards once Firebase achievements go live.
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Quick actions</CardTitle>
                <CardDescription>Interactive buttons that call the same logic the production app will use.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button
                  className="justify-start gap-3 rounded-full"
                  onClick={() => handleMarkComplete(activeCourse, nextLesson?.id)}
                >
                  <CheckCircle2 className="h-5 w-5" /> Mark latest lesson complete
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-3 rounded-full"
                  onClick={() =>
                    toast({
                      title: "Feedback requested",
                      description: "Instructors will respond through Firebase messaging once connected.",
                    })
                  }
                >
                  <Flame className="h-5 w-5 text-primary" /> Request instructor feedback
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-3 rounded-full"
                  onClick={() =>
                    toast({
                      title: "Question queued",
                      description: "Live Q&A submissions will sync to the backend integration soon.",
                    })
                  }
                >
                  <PlayCircle className="h-5 w-5 text-primary" /> Submit a question for the live Q&amp;A
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">No courses yet</CardTitle>
            <CardDescription>
              Ask your instructor to publish a course from the admin workspace. It will appear here immediately once created.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Upcoming sessions</CardTitle>
              <CardDescription>All events are populated from the instructor control center.</CardDescription>
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                toast({
                  title: "Calendar sync coming soon",
                  description: "Calendar exports will connect to Firebase once the integration is ready.",
                })
              }
            >
              Sync to calendar
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.length ? (
              upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-background/80 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{session.courseTitle}</span>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {session.format}
                      </Badge>
                    </div>
                    <p className="text-base font-semibold text-foreground">{session.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      {session.date}
                      {session.time ? ` • ${session.time}` : ""}
                    </div>
                  </div>
                  <Button
                    className="self-start rounded-full"
                    onClick={() =>
                      toast({
                        title: "Reminder saved",
                        description: "Notifications will trigger automatically once Firebase Cloud Messaging is live.",
                      })
                    }
                  >
                    Add reminder
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                There are no live sessions planned yet. When the instructor schedules one, it will show up here.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Resource library</CardTitle>
            <CardDescription>Downloads flow directly from the instructor&apos;s uploads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {resourceLibrary.length ? (
              resourceLibrary.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/70 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{resource.title}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {resource.type} • {resource.courseTitle}
                      {resource.size ? ` • ${resource.size}` : ""}
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-full" onClick={() => handleDownload(resource.title)}>
                    <Download className="mr-2 h-4 w-4" /> Get resource
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Resources uploaded in the admin workspace will appear here for quick download.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState } from "react"
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Download,
  Flame,
  FolderDown,
  MessageCircle,
  Radio,
  Sparkles,
  Timer,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import { useUserRole } from "@/hooks/useUserRole"

import {
  getCourseProgress,
  getNextLesson,
  getPublishedLessons,
  getResourceLibrary,
  getUpcomingSessions,
  type Course,
  useAcademyData,
} from "../_components/academy-data-context"

type TimelineItem = {
  id: string
  title: string
  badge: string
  meta: string
  type: "lesson" | "live" | "resource"
  cta: string
}

export default function StudentDashboardPage() {
  const { user } = useUserRole()
  // const { state, markLessonComplete } = useAcademyData() - this might use old data context but assuming it works for now if unrelated to user
  const { state, markLessonComplete } = useAcademyData()
  const courses = useMemo(() => state.courses.filter((course) => course.isVisibleToStudents), [state.courses])

  const [highlightedCourseId, setHighlightedCourseId] = useState<string>(courses[0]?.id ?? "")
  const [openCourseId, setOpenCourseId] = useState<string | null>(null)
  const [timelineScope, setTimelineScope] = useState<"today" | "week">("today")

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
  const courseResources = useMemo(() => {
    if (!openCourseId || !activeCourse) return []
    return resourceLibrary.filter((resource) => resource.courseTitle === activeCourse.title)
  }, [resourceLibrary, openCourseId, activeCourse])

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

  const timelineItems = useMemo(() => {
    const liveItems: TimelineItem[] = upcomingSessions.map((session) => ({
      id: session.id,
      title: session.title,
      badge: session.format,
      meta: session.date,
      type: "live",
      cta: "Add reminder",
    }))

    const lessonItems: TimelineItem[] = courses.map((course) => {
      const upcomingLesson = getNextLesson(course)
      return {
        id: `${course.id}-lesson`,
        title: upcomingLesson ? upcomingLesson.title : "Instructor drafting next lesson",
        badge: course.title,
        meta: upcomingLesson?.releaseDate ?? "Release TBC",
        type: "lesson",
        cta: "Resume",
      }
    })

    const resourceItems: TimelineItem[] = resourceLibrary.map((resource) => ({
      id: resource.id,
      title: resource.title,
      badge: resource.courseTitle,
      meta: `${resource.type}${resource.size ? ` • ${resource.size}` : ""}`,
      type: "resource",
      cta: "Download",
    }))

    const todaySlice = [...lessonItems.slice(0, 2), ...liveItems.slice(0, 1), ...resourceItems.slice(0, 1)]
    const weekSlice = [...lessonItems, ...liveItems, ...resourceItems].slice(0, 6)

    return timelineScope === "today" ? todaySlice : weekSlice
  }, [courses, upcomingSessions, resourceLibrary, timelineScope])

  const learnerName = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "student"
  const navItems = [
    { label: "Courses", icon: BookOpen, targetId: "student-courses" },
    { label: "Timeline", icon: CalendarDays, targetId: "student-timeline" },
    { label: "Live", icon: Radio, targetId: "student-live" },
    { label: "Resources", icon: FolderDown, targetId: "student-resources" },
    { label: "Messages", icon: MessageCircle, targetId: "student-messages" },
  ]

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="sticky top-0 hidden h-screen w-60 flex-col border-r border-border/60 bg-white/90 px-4 py-6 lg:flex">
        <div className="flex items-center gap-3 rounded-2xl bg-primary/10 px-3 py-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <div className="text-sm font-semibold">Student workspace</div>
        </div>
        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
              onClick={() => {
                const section = document.getElementById(item.targetId)
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <Separator className="my-6" />
        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
          Switch into instructor view to add lessons, publish live sessions, and upload resources.
        </div>
      </aside>

      <div className="flex-1">
        <div id="student-timeline" className="border-b border-border/60 bg-white/80 px-6 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Today</p>
              <h1 className="font-headline text-3xl font-bold text-foreground">Welcome back, {learnerName}</h1>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/5 p-1 text-sm">
              {(["today", "week"] as const).map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timelineScope === range ? "default" : "ghost"}
                  className="rounded-full"
                  onClick={() => setTimelineScope(range)}
                >
                  {range === "today" ? "Today" : "This week"}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {timelineItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-white/90 p-3 shadow-sm shadow-primary/5"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {item.type === "live" ? "Live" : item.type === "resource" ? "Download" : "Lesson"}
                  </Badge>
                  <span>{item.badge}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" /> {item.meta}
                  </span>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      item.type === "resource"
                        ? handleDownload(item.title)
                        : toast({
                          title: `${item.cta} queued`,
                          description: "These actions will sync to Firebase when connected.",
                        })
                    }
                  >
                    {item.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <main className="space-y-8 px-6 py-8">
          {hasCourses ? (
            <section id="student-courses" className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Courses</p>
                    <h2 className="font-headline text-2xl">Choose where to focus</h2>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Student account: {user?.primaryEmailAddress?.emailAddress ?? "Signed in"}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className={`group relative overflow-hidden border border-border/60 shadow-md shadow-primary/5 transition ${highlightedCourseId === course.id ? "ring-2 ring-primary/60" : "hover:border-primary/40"}`}
                    >
                      <button
                        className="flex h-full w-full flex-col text-left"
                        onClick={() => {
                          setHighlightedCourseId(course.id)
                          setOpenCourseId(course.id)
                        }}
                      >
                        <div className="relative h-28 bg-gradient-to-r from-primary/80 via-primary/70 to-primary/40">
                          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
                            {course.cohort}
                          </div>
                          <div className="absolute bottom-4 left-4 rounded-full bg-black/20 px-3 py-1 text-xs text-white">
                            {course.phase === "Active" ? "In progress" : course.phase}
                          </div>
                        </div>
                        <CardHeader className="space-y-1 pb-2">
                          <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{getCourseProgress(course)}% complete</span>
                            <Badge variant="outline" className="border-primary/40 text-primary">
                              {course.phase}
                            </Badge>
                          </div>
                          <Progress value={getCourseProgress(course)} />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Next lesson</span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-4 w-4" /> {getNextLesson(course)?.title ?? "Waiting for instructor"}
                            </span>
                          </div>
                        </CardContent>
                      </button>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
                <CardHeader className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="font-headline text-xl">Focus mode</CardTitle>
                    <CardDescription>
                      Keep the active course front and center with quick lesson controls and instructor messaging.
                    </CardDescription>
                  </div>
                  <BadgeCheck className="h-6 w-6 text-primary" />
                </CardHeader>
                {activeCourse ? (
                  <CardContent className="space-y-4">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40 p-5 text-white shadow-inner">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/80">Active course</p>
                      <h3 className="mt-1 font-headline text-2xl font-semibold">{activeCourse.title}</h3>
                      <p className="text-sm text-white/80">Guided by {activeCourse.instructor}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline" className="border-white/50 bg-white/10 text-white">
                          Cohort {activeCourse.cohort}
                        </Badge>
                        <Badge variant="outline" className="border-white/50 bg-white/10 text-white">
                          {activeCourse.phase}
                        </Badge>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                      <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                        <span>Lesson list</span>
                        <span className="text-muted-foreground">{getPublishedLessons(activeCourse).length} published</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {getPublishedLessons(activeCourse).map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between rounded-xl border border-border/40 bg-white/80 px-3 py-2 text-sm"
                          >
                            <span className="flex items-center gap-2">
                              <CheckCircle2
                                className={`h-4 w-4 ${activeCourse.completedLessonIds.includes(lesson.id) ? "text-primary" : "text-muted-foreground"}`}
                              />
                              {lesson.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{lesson.releaseDate ?? "Date TBC"}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button className="rounded-full" onClick={() => handleMarkComplete(activeCourse, nextLesson?.id)}>
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Mark next lesson complete
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
                          <MessageCircle className="mr-2 h-4 w-4" /> Message instructor
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="text-sm text-muted-foreground">
                    Select a course to enter focus mode.
                  </CardContent>
                )}
              </Card>
            </section>
          ) : (
            <Card id="student-courses" className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">No courses yet</CardTitle>
                <CardDescription>
                  Ask your instructor to publish a course from the admin workspace. It will appear here immediately once created.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card id="student-live" className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
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

            <Card id="student-resources" className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
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

          <Card id="student-messages" className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Messages</CardTitle>
              <CardDescription>Stay connected with instructors and support.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button
                className="rounded-full"
                onClick={() =>
                  toast({
                    title: "Message queued",
                    description: "Instructor messaging will connect through Firebase when available.",
                  })
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Message instructor
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  toast({
                    title: "Support notified",
                    description: "Support replies will arrive in your inbox once the integration is live.",
                  })
                }
              >
                Ask support
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>

      <Sheet open={!!openCourseId} onOpenChange={(open) => !open && setOpenCourseId(null)}>
        <SheetContent className="w-full overflow-y-auto border-l border-border/60 sm:max-w-xl">
          {openCourseId && activeCourse ? (
            <div className="space-y-6">
              <SheetHeader>
                <SheetTitle className="font-headline text-2xl">{activeCourse.title}</SheetTitle>
                <SheetDescription className="flex items-center gap-2 text-sm">
                  Guided by {activeCourse.instructor}
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {activeCourse.phase}
                  </Badge>
                </SheetDescription>
              </SheetHeader>

              <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Next lesson</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {activeCourse.phase === "Active" ? "Live" : activeCourse.phase}
                  </Badge>
                </div>
                <h3 className="mt-2 font-headline text-xl text-foreground">
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
                  <Button className="rounded-full" onClick={() => handleMarkComplete(activeCourse, nextLesson?.id)}>
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

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Shortcuts</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="justify-start rounded-xl" onClick={() => handleMarkComplete(activeCourse, nextLesson?.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Catch up on lessons
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start rounded-xl"
                    onClick={() =>
                      toast({
                        title: "Live access queued",
                        description: "Live session links will appear here when scheduled.",
                      })
                    }
                  >
                    <Radio className="mr-2 h-4 w-4 text-primary" /> Join live
                  </Button>
                  <Button variant="outline" className="justify-start rounded-xl" onClick={() => handleDownload("Top resources")}>
                    <FolderDown className="mr-2 h-4 w-4 text-primary" /> Download pack
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start rounded-xl"
                    onClick={() =>
                      toast({
                        title: "Feedback requested",
                        description: "Instructors will respond through Firebase messaging once connected.",
                      })
                    }
                  >
                    <Flame className="mr-2 h-4 w-4 text-primary" /> Ask for feedback
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Resources</h4>
                {courseResources.length ? (
                  courseResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/70 p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{resource.title}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          {resource.type}
                          {resource.size ? ` • ${resource.size}` : ""}
                        </p>
                      </div>
                      <Button variant="outline" className="rounded-full" onClick={() => handleDownload(resource.title)}>
                        <Download className="mr-2 h-4 w-4" /> Get resource
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Resources uploaded in the admin workspace will appear here.</p>
                )}
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  )
}

"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { format } from "date-fns"
import type { Timestamp } from "firebase/firestore"
import {
  BellRing,
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  MonitorPlay,
  ShieldCheck,
  UsersRound,
} from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAcademyUser } from "@/hooks/useAcademyUser"
import { useFirestoreCollection, type FirestoreDocument } from "@/hooks/useFirestoreCollection"
import {
  type AcademyCourse,
  type Announcement,
  type ExamOrCertification,
  type LiveSession,
  type ResourceLibraryItem,
} from "@/lib/academy-data"
import { logout } from "@/lib/logout"
import { cn } from "@/lib/utils"

const studentTabs = [
  { value: "dashboard", label: "Overview", icon: LayoutDashboard },
  { value: "courses", label: "Courses", icon: GraduationCap },
  { value: "sessions", label: "Live sessions", icon: MonitorPlay },
  { value: "resources", label: "Resources", icon: LibraryBig },
  { value: "announcements", label: "Announcements", icon: BellRing },
  { value: "exams", label: "Exams & certifications", icon: ShieldCheck },
] as const

type StudentTabValue = (typeof studentTabs)[number]["value"]

type Assignment = Record<string, unknown> & { id: string; progress?: number; courseId?: string }

function formatDisplayDate(value?: string | number | Date | Timestamp): string {
  if (!value) return "Date coming soon"
  const date =
    value instanceof Date
      ? value
      : typeof value === "object" && value !== null && "toDate" in value
        ? (value as Timestamp).toDate()
        : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value.toString()
  }
  return format(date, "MMM d, yyyy")
}

function calculateProgress(course: Pick<AcademyCourse, "lessonCount" | "completedLessons">): number {
  const total = course.lessonCount ?? 0
  if (!total) return 0
  const completed = course.completedLessons ?? 0
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)))
}

function CourseProgressBar({ value }: { value: number }) {
  return (
    <div className="relative h-2 overflow-hidden rounded-full bg-slate-200">
      <span
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function AcademyDashboardClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, courses: assignedCourses, loading: userLoading } = useAcademyUser()
  const { data: catalogCourses, loading: coursesLoading } = useFirestoreCollection<AcademyCourse>("courses", {
    orderByField: "updatedAt",
    orderDirection: "desc",
  })
  const { data: liveSessions, loading: sessionsLoading } = useFirestoreCollection<LiveSession>("liveSessions", {
    orderByField: "scheduledAt",
    orderDirection: "asc",
  })
  const { data: resources, loading: resourcesLoading } = useFirestoreCollection<ResourceLibraryItem>("resources", {
    orderByField: "createdAt",
    orderDirection: "desc",
  })
  const { data: announcements, loading: announcementsLoading } = useFirestoreCollection<Announcement>("announcements", {
    orderByField: "createdAt",
    orderDirection: "desc",
  })
  const { data: exams, loading: examsLoading } = useFirestoreCollection<ExamOrCertification>("exams", {
    orderByField: "createdAt",
    orderDirection: "desc",
  })
  const [activeTab, setActiveTab] = useState<StudentTabValue>("dashboard")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const requestedTab = searchParams.get("tab") as StudentTabValue | null
    if (requestedTab && studentTabs.some((tab) => tab.value === requestedTab) && requestedTab !== activeTab) {
      setActiveTab(requestedTab)
    }
    if (!requestedTab && activeTab !== "dashboard") {
      setActiveTab("dashboard")
    }
  }, [activeTab, searchParams])

  function handleTabChange(value: StudentTabValue) {
    setActiveTab(value)
    const nextSearch = new URLSearchParams(searchParams.toString())
    nextSearch.set("tab", value)
    router.replace(`/academy?${nextSearch.toString()}`, { scroll: false })
  }

  const resolvedAssignments = useMemo(() => {
    if (!assignedCourses.length) return []

    const catalogMap = new Map<string, FirestoreDocument<AcademyCourse>>()
    catalogCourses.forEach((course) => catalogMap.set(course.id, course))

    return assignedCourses.map((assignment) => {
      const typedAssignment = assignment as Assignment
      const catalogMatch = typedAssignment.courseId ? catalogMap.get(typedAssignment.courseId) : undefined
      const merged = { ...(catalogMatch ?? {}), ...typedAssignment }

      const hasExplicitProgress = typeof merged.progress === "number" && !Number.isNaN(merged.progress)
      const lessons = Number(merged.lessonCount ?? catalogMatch?.lessonCount ?? 0)
      const completed = Number(merged.completedLessons ?? catalogMatch?.completedLessons ?? 0)
      const derivedProgress = hasExplicitProgress
        ? Number(merged.progress)
        : lessons
          ? Math.round((completed / lessons) * 100)
          : calculateProgress({
              lessonCount: catalogMatch?.lessonCount,
              completedLessons: catalogMatch?.completedLessons,
            })

      return {
        ...merged,
        title:
          (merged as { title?: string }).title ??
          (merged as { courseTitle?: string }).courseTitle ??
          catalogMatch?.title ??
          "Course details syncing",
        instructor: (merged as { instructor?: string }).instructor ?? catalogMatch?.instructor ?? "Instructor TBA",
        level: (merged as { level?: string }).level ?? catalogMatch?.level ?? "All levels",
        status: (merged as { status?: string }).status ?? catalogMatch?.status ?? "upcoming",
        description:
          (merged as { description?: string }).description ??
          catalogMatch?.description ??
          "This course was assigned by the registrar.",
        startDate: (merged as { startDate?: string }).startDate ?? catalogMatch?.startDate,
        lessonCount: merged.lessonCount ?? catalogMatch?.lessonCount,
        progress: Math.min(100, Math.max(0, derivedProgress)),
      }
    })
  }, [assignedCourses, catalogCourses])

  const totalProgress = useMemo(() => {
    if (!resolvedAssignments.length) return 0
    const aggregate = resolvedAssignments.reduce((sum, course) => sum + Number(course.progress ?? 0), 0)
    return Math.round(aggregate / resolvedAssignments.length)
  }, [resolvedAssignments])

  const isLoading =
    userLoading ||
    coursesLoading ||
    sessionsLoading ||
    resourcesLoading ||
    announcementsLoading ||
    examsLoading

  const upcomingSessions = useMemo(() => {
    return [...liveSessions].sort((a, b) => Date.parse(a.scheduledAt) - Date.parse(b.scheduledAt)).slice(0, 3)
  }, [liveSessions])

  const nextAnnouncement = announcements[0]
  const nextExam = exams[0]

  async function handleLogout() {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push("/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading your academy workspace…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold">Please log in</h1>
        <p className="text-muted-foreground">You must sign in to view the student dashboard.</p>
        <Button asChild>
          <Link href="/login">Go to login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="pointer-events-none absolute inset-0 opacity-40 calligraphy-overlay" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_15px_55px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="w-fit rounded-full border-slate-200 bg-slate-50 text-[0.6rem] uppercase tracking-[0.4em] text-slate-500">
                Markaz al-Haqq Academy
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">
                  Welcome back, {user.user_metadata?.full_name || user.email}
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Your personalised dashboard is built for clarity and speed. Track assignments, sessions, and resources in one calm
                  space.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="border-slate-200 text-slate-700">
                <Link href="/">Return to site</Link>
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-900/90"
              >
                {isLoggingOut ? "Signing out…" : "Logout"}
              </Button>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-200/70 bg-white/90 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base text-slate-500">Overall progress</CardTitle>
                <p className="text-4xl font-semibold text-slate-900">{totalProgress}%</p>
              </div>
              <BookOpenCheck className="h-10 w-10 text-sky-500" />
            </CardHeader>
          </Card>
          <Card className="border-slate-200/70 bg-white/90 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base text-slate-500">Assigned courses</CardTitle>
                <p className="text-4xl font-semibold text-slate-900">{resolvedAssignments.length}</p>
              </div>
              <GraduationCap className="h-10 w-10 text-indigo-500" />
            </CardHeader>
          </Card>
          <Card className="border-slate-200/70 bg-white/90 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base text-slate-500">Upcoming sessions</CardTitle>
                <p className="text-4xl font-semibold text-slate-900">{liveSessions.length}</p>
              </div>
              <MonitorPlay className="h-10 w-10 text-amber-500" />
            </CardHeader>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as StudentTabValue)} className="space-y-6">
          <TabsList className="flex w-full flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm">
            {studentTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex-1 rounded-2xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900",
                  "data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md",
                )}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <Card className="border-slate-200/70 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Your active tracks</CardTitle>
                    <CardDescription>Assignments sync from the academy registrar instantly.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {resolvedAssignments.length ? (
                      resolvedAssignments.map((course) => (
                        <div
                          key={course.id}
                          className="rounded-2xl border border-slate-100/80 bg-white/80 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                {course.level}
                              </p>
                              <p className="text-lg font-semibold text-slate-900">{course.title}</p>
                              <p className="text-sm text-slate-500">{course.instructor}</p>
                            </div>
                            <Badge variant="secondary" className="rounded-full border-slate-200 bg-slate-100 text-slate-600">
                              {course.status}
                            </Badge>
                          </div>
                          <p className="mt-3 text-sm text-slate-600">{course.description}</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                              <span>Progress</span>
                              <span>{course.progress ?? 0}%</span>
                            </div>
                            <CourseProgressBar value={Number(course.progress ?? 0)} />
                            <div className="flex flex-wrap justify-between text-xs text-slate-400">
                              <span>Start {formatDisplayDate(course.startDate)}</span>
                              <span>
                                {course.lessonCount
                                  ? `${course.lessonCount} lessons`
                                  : "Curriculum syncing"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Alert>
                        <AlertDescription>No courses are linked to your account yet.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-slate-200/70 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Upcoming sessions</CardTitle>
                    <CardDescription>Every cohort touchpoint across your assignments.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.length ? (
                      upcomingSessions.map((session) => (
                        <div
                          key={session.id}
                          className="rounded-2xl border border-slate-100/80 bg-gradient-to-br from-white to-slate-50 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{session.courseTitle}</p>
                              <p className="text-lg font-semibold text-slate-900">{session.title}</p>
                            </div>
                            <Badge className="rounded-full bg-slate-900 text-white">{session.format}</Badge>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4" /> {formatDisplayDate(session.scheduledAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <UsersRound className="h-4 w-4" /> {session.presenter}
                            </span>
                            {session.link ? (
                              <Button asChild size="sm" variant="outline" className="border-slate-200 text-slate-700">
                                <a href={session.link} target="_blank" rel="noreferrer">
                                  Join session
                                </a>
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      ))
                    ) : (
                      <Alert>
                        <AlertDescription>No live sessions are scheduled yet.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-slate-200/70 bg-gradient-to-br from-amber-50 to-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Latest announcement</CardTitle>
                    <CardDescription>Stay aligned with new policies, launches, and reminders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {nextAnnouncement ? (
                      <div className="space-y-3">
                        <Badge variant="outline" className="border-amber-200 bg-white text-xs uppercase tracking-[0.3em] text-amber-600">
                          {nextAnnouncement.audience}
                        </Badge>
                        <h3 className="text-2xl font-semibold text-slate-900">{nextAnnouncement.title}</h3>
                        <p className="text-sm text-slate-700">{nextAnnouncement.body}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                          Published {formatDisplayDate(nextAnnouncement.publishedAt)}
                        </p>
                      </div>
                    ) : (
                      <Alert>
                        <AlertDescription>No announcements have been published.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-slate-200/70 bg-white/90 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Next assessment</CardTitle>
                    <CardDescription>Exam timings update automatically once published.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {nextExam ? (
                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="text-lg font-semibold text-slate-900">{nextExam.title}</p>
                        <p className="text-slate-500">{nextExam.courseTitle}</p>
                        <p>Status: {nextExam.status}</p>
                        <p>Available: {formatDisplayDate(nextExam.availableOn)}</p>
                        <p>Mode: {nextExam.proctored ? "Proctored" : "Self-paced"}</p>
                      </div>
                    ) : (
                      <Alert>
                        <AlertDescription>Exam windows will appear here once scheduled.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-8">
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Your assigned courses</h3>
                  <p className="text-sm text-slate-600">These are the tracks registrar staff attached to your profile.</p>
                </div>
                <Badge variant="secondary" className="rounded-full border-slate-200 bg-slate-100 text-slate-600">
                  {resolvedAssignments.length} total
                </Badge>
              </div>
              {resolvedAssignments.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {resolvedAssignments.map((course) => (
                    <Card key={course.id} className="border-slate-200/70 bg-white/90 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-900">{course.title}</CardTitle>
                        <CardDescription className="text-slate-500">{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                          <span>{course.level}</span>
                          <span>{course.status}</span>
                        </div>
                        <p>{course.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                            <span>Progress</span>
                            <span>{course.progress ?? 0}%</span>
                          </div>
                          <CourseProgressBar value={Number(course.progress ?? 0)} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Start {formatDisplayDate(course.startDate)}</span>
                          <span>
                            {course.lessonCount ? `${course.lessonCount} lessons` : "Curriculum syncing"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>No courses assigned yet.</AlertDescription>
                </Alert>
              )}
            </section>

            <section className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Academy catalog</h3>
                <p className="text-sm text-slate-600">
                  Browse every programme currently in rotation—perfect for planning your next step.
                </p>
              </div>
              {catalogCourses.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {catalogCourses.map((course) => (
                    <Card key={course.id} className="border-slate-200/70 bg-white/90 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-900">{course.title}</CardTitle>
                        <CardDescription className="text-slate-500">{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                          <span>{course.level}</span>
                          <span>{course.status}</span>
                        </div>
                        <p>{course.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Start {formatDisplayDate(course.startDate)}</span>
                          <span>Progress {calculateProgress(course)}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>The catalog is being prepared.</AlertDescription>
                </Alert>
              )}
            </section>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            {liveSessions.length ? (
              <div className="space-y-4">
                {liveSessions.map((session) => (
                  <Card key={session.id} className="border-slate-200/70 bg-white/90 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-slate-900">{session.title}</CardTitle>
                      <CardDescription className="text-slate-500">{session.courseTitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" /> {formatDisplayDate(session.scheduledAt)}
                      </span>
                      <span className="flex items-center gap-2">
                        <MonitorPlay className="h-4 w-4" /> {session.format}
                      </span>
                      <span className="flex items-center gap-2">
                        <UsersRound className="h-4 w-4" /> {session.presenter}
                      </span>
                      {session.link ? (
                        <Button asChild size="sm" variant="outline" className="border-slate-200 text-slate-700">
                          <a href={session.link} target="_blank" rel="noreferrer">
                            Join session
                          </a>
                        </Button>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription>Live sessions will appear here once scheduled.</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {resources.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {resources.map((resource) => (
                  <Card key={resource.id} className="border-slate-200/70 bg-white/90 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-slate-900">{resource.title}</CardTitle>
                      <CardDescription className="text-slate-500">{resource.courseTitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-600">
                      <p>Type: {resource.type}</p>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild size="sm" className="bg-slate-900 text-white hover:bg-slate-900/90">
                          <a href={resource.embedUrl} target="_blank" rel="noreferrer">
                            View / stream
                          </a>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="border-slate-200 text-slate-700">
                          <a href={resource.downloadUrl} target="_blank" rel="noreferrer">
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription>No resources have been shared with you yet.</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            {announcements.length ? (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="border-slate-200/70 bg-white/90 shadow-sm">
                    <CardHeader>
                      <Badge variant="outline" className="mb-3 w-fit border-slate-200 bg-slate-50 text-slate-600">
                        {announcement.audience}
                      </Badge>
                      <CardTitle className="text-xl text-slate-900">{announcement.title}</CardTitle>
                      <CardDescription className="text-slate-500">
                        Published {formatDisplayDate(announcement.publishedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{announcement.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription>No announcements yet.</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            {exams.length ? (
              <div className="space-y-4">
                {exams.map((exam) => (
                  <Card key={exam.id} className="border-slate-200/70 bg-white/90 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-slate-900">{exam.title}</CardTitle>
                      <CardDescription className="text-slate-500">{exam.courseTitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <span>Status: {exam.status}</span>
                      <span>Available: {formatDisplayDate(exam.availableOn)}</span>
                      <span>Mode: {exam.proctored ? "Proctored" : "Self-paced"}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription>Exam windows will appear here once scheduled.</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

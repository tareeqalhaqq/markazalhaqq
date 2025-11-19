"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { format } from "date-fns"
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
  { value: "dashboard", label: "Student dashboard", icon: LayoutDashboard },
  { value: "courses", label: "Courses", icon: GraduationCap },
  { value: "sessions", label: "Live sessions", icon: MonitorPlay },
  { value: "resources", label: "Resources", icon: LibraryBig },
  { value: "announcements", label: "Announcements", icon: BellRing },
  { value: "exams", label: "Exams & certifications", icon: ShieldCheck },
] as const

type StudentTabValue = (typeof studentTabs)[number]["value"]

function formatDisplayDate(value?: string | number | Date): string {
  if (!value) return "Date coming soon"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value.toString()
  }
  return format(date, "MMM d, yyyy")
}

function calculateProgress(course: FirestoreDocument<AcademyCourse>): number {
  const total = course.lessonCount ?? 0
  if (!total) return 0
  const completed = course.completedLessons ?? 0
  return Math.min(100, Math.round((completed / total) * 100))
}

export default function AcademyDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { firebaseUser, loading } = useAcademyUser()
  const { data: courses, loading: coursesLoading } = useFirestoreCollection<AcademyCourse>("courses", {
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

  const isLoading =
    loading || coursesLoading || sessionsLoading || resourcesLoading || announcementsLoading || examsLoading

  const upcomingSessions = useMemo(() => {
    return [...liveSessions].sort((a, b) => Date.parse(a.scheduledAt) - Date.parse(b.scheduledAt)).slice(0, 3)
  }, [liveSessions])

  const nextAnnouncement = announcements[0]
  const totalProgress = useMemo(() => {
    if (!courses.length) return 0
    const aggregate = courses.reduce((sum, course) => sum + calculateProgress(course), 0)
    return Math.round(aggregate / courses.length)
  }, [courses])

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
        <p className="text-muted-foreground">Loading your dashboard…</p>
      </div>
    )
  }

  if (!firebaseUser) {
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
    <div className="min-h-screen bg-slate-950/95 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
        <aside className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-slate-900/40 lg:w-64">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Welcome back</p>
            <h2 className="text-2xl font-semibold text-white">{firebaseUser.displayName || firebaseUser.email}</h2>
            <p className="text-sm text-slate-400">Student access</p>
          </div>
          <div className="mt-6 space-y-2">
            {studentTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                  activeTab === tab.value ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <Button onClick={handleLogout} variant="outline" className="mt-6 w-full border-white/30 text-white">
            {isLoggingOut ? "Signing out…" : "Logout"}
          </Button>
        </aside>

        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as StudentTabValue)} className="space-y-6">
            <TabsList className="hidden">
              {studentTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-white/10 bg-slate-900/70 text-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-slate-300">Overall progress</CardTitle>
                      <p className="text-4xl font-bold text-white">{totalProgress}%</p>
                    </div>
                    <BookOpenCheck className="h-10 w-10 text-emerald-300" />
                  </CardHeader>
                </Card>
                <Card className="border-white/10 bg-slate-900/70 text-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-slate-300">Active courses</CardTitle>
                      <p className="text-4xl font-bold text-white">{courses.length}</p>
                    </div>
                    <GraduationCap className="h-10 w-10 text-sky-300" />
                  </CardHeader>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-white/10 bg-slate-900/70 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Upcoming sessions</CardTitle>
                    <CardDescription className="text-slate-400">
                      Your next live touchpoints across every enrolled course.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingSessions.length ? (
                      upcomingSessions.map((session) => (
                        <div key={session.id} className="rounded-2xl border border-white/10 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-slate-400">{session.courseTitle}</p>
                              <p className="text-lg font-semibold text-white">{session.title}</p>
                            </div>
                            <Badge className="bg-white/15 text-white">{session.format}</Badge>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4" /> {formatDisplayDate(session.scheduledAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <UsersRound className="h-4 w-4" /> {session.presenter}
                            </span>
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
                <Card className="border-white/10 bg-slate-900/70 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Latest announcement</CardTitle>
                    <CardDescription className="text-slate-400">
                      Academy bulletins appear here immediately after publication.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {nextAnnouncement ? (
                      <div className="space-y-3">
                        <Badge variant="outline" className="border-white/30 text-xs uppercase tracking-[0.3em] text-white">
                          {nextAnnouncement.audience}
                        </Badge>
                        <h3 className="text-2xl font-semibold text-white">{nextAnnouncement.title}</h3>
                        <p className="text-slate-300">{nextAnnouncement.body}</p>
                      </div>
                    ) : (
                      <Alert>
                        <AlertDescription>No announcements have been published.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="courses" className="space-y-4">
              {courses.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {courses.map((course) => (
                    <Card key={course.id} className="border-white/10 bg-slate-900/70 text-white">
                      <CardHeader>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="text-slate-400">{course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>Status: {course.status}</span>
                          <span>Level: {course.level}</span>
                        </div>
                        <p className="text-sm text-slate-300">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>Start: {formatDisplayDate(course.startDate)}</span>
                          <span>Progress: {calculateProgress(course)}%</span>
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
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              {liveSessions.length ? (
                <div className="space-y-4">
                  {liveSessions.map((session) => (
                    <Card key={session.id} className="border-white/10 bg-slate-900/70 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">{session.title}</CardTitle>
                        <CardDescription className="text-slate-400">{session.courseTitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
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
                          <Button asChild size="sm" variant="secondary" className="rounded-full bg-white/10 text-white">
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
                    <Card key={resource.id} className="border-white/10 bg-slate-900/70 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription className="text-slate-400">{resource.courseTitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-slate-300">
                        <p>Type: {resource.type}</p>
                        <div className="flex flex-wrap gap-3">
                          <Button asChild size="sm" variant="secondary" className="rounded-full bg-white/10 text-white">
                            <a href={resource.embedUrl} target="_blank" rel="noreferrer">
                              View / stream
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="rounded-full border-white/30 text-white">
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
                    <Card key={announcement.id} className="border-white/10 bg-slate-900/70 text-white">
                      <CardHeader>
                        <Badge variant="outline" className="mb-3 w-fit border-white/30 text-white">
                          {announcement.audience}
                        </Badge>
                        <CardTitle className="text-xl">{announcement.title}</CardTitle>
                        <CardDescription className="text-slate-400">
                          Published {formatDisplayDate(announcement.publishedAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-300">{announcement.body}</p>
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
                    <Card key={exam.id} className="border-white/10 bg-slate-900/70 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        <CardDescription className="text-slate-400">{exam.courseTitle}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
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
        </main>
      </div>
    </div>
  )
}

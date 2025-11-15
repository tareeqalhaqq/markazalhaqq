'use client'

import { useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, Download, Flame, PlayCircle, Sparkles, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"

const enrolledCourses = [
  {
    id: "seerah-foundations",
    title: "Seerah Foundations",
    instructor: "Shaykh Musa",
    progress: 65,
    status: "In progress",
    nextLesson: "The Year of Sorrow",
    releaseDate: "Apr 19, 2024",
  },
  {
    id: "arabic-primer",
    title: "Arabic Primer",
    instructor: "Ustadha Mariam",
    progress: 20,
    status: "Onboarding",
    nextLesson: "Nominal sentences",
    releaseDate: "Apr 22, 2024",
  },
]

const upcomingSessions = [
  {
    course: "Seerah Foundations",
    lesson: "Live review circle",
    format: "Live seminar",
    date: "Apr 20, 2024",
    time: "7:00 PM GMT",
  },
  {
    course: "Arabic Primer",
    lesson: "Office hours",
    format: "Q&A",
    date: "Apr 24, 2024",
    time: "5:00 PM GMT",
  },
]

const resourceLibrary = [
  {
    title: "Seerah Foundations workbook",
    type: "PDF",
    size: "4.2 MB",
  },
  {
    title: "Arabic vocabulary audio set",
    type: "Audio",
    size: "35 MB",
  },
  {
    title: "Du'a collection",
    type: "PDF",
    size: "1.4 MB",
  },
]

const streakMilestones = [
  {
    label: "Days active",
    value: 12,
    target: 30,
  },
  {
    label: "Lessons completed",
    value: 8,
    target: 24,
  },
]

export default function StudentDashboardPage() {
  const [highlightedCourse, setHighlightedCourse] = useState(enrolledCourses[0]?.id ?? "")

  const activeCourse = useMemo(
    () => enrolledCourses.find((course) => course.id === highlightedCourse) ?? enrolledCourses[0],
    [highlightedCourse],
  )

  function handleMarkComplete(courseTitle: string) {
    toast({
      title: `${courseTitle} (prototype)`,
      description: "Progress updates will sync automatically once the backend is connected.",
    })
  }

  function handleDownload(resourceTitle: string) {
    toast({
      title: `Downloading ${resourceTitle}`,
      description: "This is a placeholder. Resources will download from the CDN in the live version.",
    })
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-8 px-6">
      <div className="rounded-3xl border border-primary/20 bg-white/90 p-10 shadow-xl shadow-primary/10">
        <Badge variant="outline" className="border-primary/40 text-primary">
          Student preview
        </Badge>
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground">
          Welcome back, demo learner
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Track your enrolled courses, upcoming live sessions, and downloadable resources. Everything here is seeded from the
          product design so the engineering team can wire the real data layer later.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Your courses</CardTitle>
              <CardDescription>Select a course to view the next lesson and progress summary.</CardDescription>
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
                {enrolledCourses.map((course) => (
                  <TableRow
                    key={course.id}
                    onClick={() => setHighlightedCourse(course.id)}
                    className={`cursor-pointer transition-colors ${
                      highlightedCourse === course.id ? "bg-primary/5" : "hover:bg-muted/50"
                    }`}
                  >
                    <TableCell className="font-medium text-foreground">{course.title}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/40 text-primary">
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-primary">{course.progress}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {activeCourse ? (
              <div className="rounded-2xl border border-border/40 bg-background/70 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Next lesson</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {activeCourse.status}
                  </Badge>
                </div>
                <h3 className="mt-3 font-headline text-xl text-foreground">{activeCourse.nextLesson}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" /> {activeCourse.releaseDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Timer className="h-4 w-4" /> {activeCourse.progress}% complete
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button className="rounded-full" onClick={() => handleMarkComplete(activeCourse.title)}>
                    Mark lesson complete
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleMarkComplete(`Message ${activeCourse.instructor}`)}
                  >
                    Message instructor
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Momentum</CardTitle>
              <CardDescription>Keep your learning streak alive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {streakMilestones.map((milestone) => (
                <div key={milestone.label} className="rounded-2xl border border-border/40 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                    <span>{milestone.label}</span>
                    <span>{milestone.value}/{milestone.target}</span>
                  </div>
                  <Progress value={(milestone.value / milestone.target) * 100} />
                </div>
              ))}
              <div className="rounded-2xl border border-primary/40 bg-primary/5 p-4 text-sm text-primary">
                <Sparkles className="mb-2 h-4 w-4" />
                Complete three lessons this week to unlock a bonus live Q&A with the instructors.
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick actions</CardTitle>
              <CardDescription>These buttons simulate the eventual student controls.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button
                className="justify-start gap-3 rounded-full"
                onClick={() => handleMarkComplete("Mark latest lesson complete")}
              >
                <CheckCircle2 className="h-5 w-5" /> Mark latest lesson complete
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-3 rounded-full"
                onClick={() => handleMarkComplete("Request instructor feedback")}
              >
                <Flame className="h-5 w-5 text-primary" /> Request instructor feedback
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-3 rounded-full"
                onClick={() => handleMarkComplete("Ask a question")}
              >
                <PlayCircle className="h-5 w-5 text-primary" /> Submit a question for the live Q&amp;A
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Upcoming sessions</CardTitle>
              <CardDescription>All times are shown in GMT for the demo account.</CardDescription>
            </div>
            <Button variant="outline" className="rounded-full" onClick={() => handleMarkComplete("Sync calendar")}
>
              Sync to calendar
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={`${session.course}-${session.lesson}`}
                className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-background/80 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{session.course}</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {session.format}
                    </Badge>
                  </div>
                  <p className="text-base font-semibold text-foreground">{session.lesson}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {session.date} • {session.time}
                  </div>
                </div>
                <Button className="self-start rounded-full" onClick={() => handleMarkComplete("Add reminder")}
>
                  Add reminder
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Resource library</CardTitle>
            <CardDescription>Downloads are mocked for now.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {resourceLibrary.map((resource) => (
              <div
                key={resource.title}
                className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/70 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{resource.title}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {resource.type} • {resource.size}
                  </p>
                </div>
                <Button variant="outline" className="rounded-full" onClick={() => handleDownload(resource.title)}>
                  <Download className="mr-2 h-4 w-4" /> Get resource
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

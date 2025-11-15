'use client'

import { useMemo, useState } from "react"
import {
  AlertCircle,
  CalendarRange,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  PlusCircle,
  UploadCloud,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const courseBlueprints = [
  {
    id: "seerah-foundations",
    title: "Seerah Foundations",
    cohort: "Cohort 1",
    phase: "Enrollment",
    lessonsReady: 6,
    lessonsTotal: 10,
    startDate: "Apr 15, 2024",
  },
  {
    id: "arabic-primer",
    title: "Arabic Primer",
    cohort: "Cohort 2",
    phase: "Drafting",
    lessonsReady: 3,
    lessonsTotal: 12,
    startDate: "May 8, 2024",
  },
  {
    id: "fiqh-of-worship",
    title: "Fiqh of Worship",
    cohort: "Founders",
    phase: "Revision",
    lessonsReady: 8,
    lessonsTotal: 8,
    startDate: "TBD",
  },
]

const publishingQueue = [
  {
    id: "lesson-7",
    course: "Seerah Foundations",
    title: "Lessons from the Makkan period",
    status: "Awaiting review",
    owner: "Shaykh Musa",
  },
  {
    id: "lesson-3",
    course: "Arabic Primer",
    title: "Verb patterns introduction",
    status: "Draft",
    owner: "Ustadha Mariam",
  },
  {
    id: "lesson-9",
    course: "Fiqh of Worship",
    title: "Zakat case studies",
    status: "Ready to publish",
    owner: "Shaykh Bilal",
  },
]

const teamCheckpoints = [
  {
    title: "Finalize course outlines",
    due: "Due in 2 days",
    lead: "Curriculum team",
  },
  {
    title: "Record Arabic Primer lesson 4",
    due: "Scheduled for Friday",
    lead: "Media lab",
  },
  {
    title: "QA Seerah quizzes",
    due: "Awaiting reviewer",
    lead: "Assessment circle",
  },
]

const workspaceActions = [
  {
    title: "Create a new course",
    description:
      "Start a blueprint with objectives, module breakdowns, and instructor assignments. Saves to the internal roadmap.",
    label: "Start draft",
    icon: PlusCircle,
  },
  {
    title: "Publish lesson to cohort",
    description:
      "Release a prepared lesson to the student portal and notify enrolled learners of the update.",
    label: "Publish",
    icon: UploadCloud,
  },
  {
    title: "Archive or delete course",
    description:
      "Sunset a program that has completed its run. Materials remain in the private instructor library.",
    label: "Manage course",
    icon: Layers,
  },
]

export default function InstructorDashboardPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(courseBlueprints[0]?.id ?? "")

  const selectedCourse = useMemo(
    () => courseBlueprints.find((course) => course.id === selectedCourseId) ?? courseBlueprints[0],
    [selectedCourseId],
  )

  function handleActionClick(actionTitle: string) {
    toast({
      title: `${actionTitle} (prototype)`,
      description:
        "This action is mapped out for the engineering team. The current build simply records the intent for planning purposes.",
    })
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 px-6">
      <div className="flex flex-col gap-6 rounded-3xl border border-primary/20 bg-white/90 p-10 shadow-xl shadow-primary/10">
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit border-primary/40 text-primary">
            Instructor admin prototype
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Plan and orchestrate the upcoming cohorts
          </h1>
          <p className="text-lg text-muted-foreground">
            Use this view to shape courses, track editorial progress, and coordinate your teaching team. All actions below are
            simulated until the data services are connected.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none bg-gradient-to-br from-primary/10 via-white to-white shadow-md shadow-primary/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                Active cohorts
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <GraduationCap className="h-10 w-10 text-primary" />
              <div>
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">in flight</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-gradient-to-br from-emerald-100 via-white to-white shadow-md shadow-emerald-100/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Lessons ready
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="text-3xl font-bold text-foreground">17</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">awaiting release</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-gradient-to-br from-amber-100 via-white to-white shadow-md shadow-amber-100/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Tasks due
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Clock className="h-10 w-10 text-amber-600" />
              <div>
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">this week</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-gradient-to-br from-sky-100 via-white to-white shadow-md shadow-sky-100/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                Team members
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Users2 className="h-10 w-10 text-sky-600" />
              <div>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">collaborators</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Course blueprints</CardTitle>
              <CardDescription>Click a course to view its readiness details and proposed launch timeline.</CardDescription>
            </div>
            <Button className="rounded-full" onClick={() => handleActionClick("Create a new course")}>Start draft</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Cohort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseBlueprints.map((course) => {
                  const completion = Math.round((course.lessonsReady / course.lessonsTotal) * 100)
                  const isActive = selectedCourse?.id === course.id

                  return (
                    <TableRow
                      key={course.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        isActive ? "bg-primary/5" : "hover:bg-muted/50",
                      )}
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      <TableCell className="font-medium text-foreground">{course.title}</TableCell>
                      <TableCell>{course.cohort}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/40 text-primary">
                          {course.phase}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.startDate}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium text-primary">{completion}%</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <TableCaption className="text-left text-sm text-muted-foreground">
              Prototypes only — updates reset on refresh until the database is connected.
            </TableCaption>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Selected course</CardTitle>
              <CardDescription>Snapshot of lesson readiness and target launch window.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{selectedCourse?.cohort}</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {selectedCourse?.phase}
                  </Badge>
                </div>
                <h3 className="mt-3 font-headline text-2xl text-foreground">{selectedCourse?.title}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Lesson readiness</span>
                    <span>
                      {selectedCourse?.lessonsReady}/{selectedCourse?.lessonsTotal}
                    </span>
                  </div>
                  <Progress
                    value={Math.round(
                      ((selectedCourse?.lessonsReady ?? 0) / (selectedCourse?.lessonsTotal ?? 1)) * 100,
                    )}
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarRange className="h-4 w-4" />
                  Target start: {selectedCourse?.startDate}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => handleActionClick("Share update with team")}
              >
                Notify collaborators
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Team checkpoints</CardTitle>
              <CardDescription>High-level tasks for the coming week.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamCheckpoints.map((checkpoint) => (
                <div
                  key={checkpoint.title}
                  className="rounded-xl border border-border/40 bg-background/70 p-4"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    {checkpoint.title}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{checkpoint.due}</span>
                    <span>{checkpoint.lead}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Publishing queue</CardTitle>
              <CardDescription>Review and publish lessons once the academic team signs off.</CardDescription>
            </div>
            <Button variant="outline" className="rounded-full" onClick={() => handleActionClick("Publish lesson to cohort")}>
              Review all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {publishingQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-background/80 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{item.course}</span>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Owner: {item.owner}</p>
                  </div>
                  <Button className="self-start rounded-full" onClick={() => handleActionClick("Publish lesson to cohort")}>
                    Open lesson
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/90 shadow-md shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Workspace actions</CardTitle>
            <CardDescription>Outline of the admin capabilities we’re planning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {workspaceActions.map((action) => (
              <div key={action.title} className="flex gap-4 rounded-2xl border border-border/40 bg-background/70 p-4">
                <div className="mt-1 h-10 w-10 flex-none rounded-full bg-primary/10 text-primary">
                  <action.icon className="m-2 h-6 w-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-foreground">{action.title}</p>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Planned
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleActionClick(action.title)}
                  >
                    {action.label}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

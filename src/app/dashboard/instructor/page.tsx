'use client'

import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LayoutList,
  Layers,
  PanelRight,
  PlusCircle,
  Radio,
  Sparkles,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

import {
  getCourseProgress,
  getNextLesson,
  getPublishedLessons,
  type Course,
  type LessonStatus,
  useAcademyData,
} from "../_components/academy-data-context"

type CourseFormState = {
  title: string
  instructor: string
  cohort: string
  startDate: string
}

type LessonFormState = {
  title: string
  releaseDate: string
  status: LessonStatus
  makeVisible: boolean
}

type SessionFormState = {
  title: string
  format: string
  date: string
  time: string
}

type ResourceFormState = {
  title: string
  type: string
  size: string
}

const sessionFormats = ["Live seminar", "Workshop", "Q&A", "Office hours"]
const resourceTypes = ["PDF", "Audio", "Video", "Link"]

export default function InstructorDashboardPage() {
  const {
    state,
    createCourse,
    deleteCourse,
    publishLesson,
    scheduleSession,
    addResource,
    toggleVisibility,
    setCoursePhase,
  } = useAcademyData()

  const courses = state.courses
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id ?? "")
  const [draggingCourseId, setDraggingCourseId] = useState<string | null>(null)

  useEffect(() => {
    if (!courses.find((course) => course.id === selectedCourseId)) {
      setSelectedCourseId(courses[0]?.id ?? "")
    }
  }, [courses, selectedCourseId])

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [courses, selectedCourseId],
  )

  const [courseForm, setCourseForm] = useState<CourseFormState>({
    title: "",
    instructor: "",
    cohort: "",
    startDate: "",
  })
  const [courseError, setCourseError] = useState<string | null>(null)
  const [lessonForm, setLessonForm] = useState<LessonFormState>({
    title: "",
    releaseDate: "",
    status: "published",
    makeVisible: false,
  })
  const [lessonError, setLessonError] = useState<string | null>(null)
  const [sessionForm, setSessionForm] = useState<SessionFormState>({
    title: "",
    format: sessionFormats[0] ?? "Live seminar",
    date: "",
    time: "",
  })
  const [sessionError, setSessionError] = useState<string | null>(null)
  const [resourceForm, setResourceForm] = useState<ResourceFormState>({
    title: "",
    type: resourceTypes[0] ?? "PDF",
    size: "",
  })
  const [resourceError, setResourceError] = useState<string | null>(null)
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false)

  const visibleCourses = useMemo(() => courses.filter((course) => course.isVisibleToStudents), [courses])
  const publishedLessonCount = useMemo(
    () => courses.reduce((total, course) => total + getPublishedLessons(course).length, 0),
    [courses],
  )
  const lessonsAwaitingRelease = useMemo(
    () => courses.reduce((total, course) => total + course.lessons.filter((lesson) => lesson.status === "ready").length, 0),
    [courses],
  )
  const hiddenCourses = useMemo(() => courses.filter((course) => !course.isVisibleToStudents).length, [courses])
  const courseProgress = useMemo(() => (selectedCourse ? getCourseProgress(selectedCourse) : 0), [selectedCourse])
  const nextLesson = useMemo(() => (selectedCourse ? getNextLesson(selectedCourse) : null), [selectedCourse])

  function handleCreateCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCourseError(null)

    if (!courseForm.title.trim() || !courseForm.instructor.trim()) {
      setCourseError("Provide at least a course title and instructor to create the roadmap card.")
      return
    }

    createCourse({ ...courseForm })
    toast({
      title: "Course created",
      description: `${courseForm.title} is now in the roadmap. Publish lessons to share it with students soon.`,
    })
    setCourseForm({ title: "", instructor: "", cohort: "", startDate: "" })
    setCourseError(null)
  }

  function handlePublishLesson(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLessonError(null)

    if (!selectedCourse) {
      return
    }

    if (!lessonForm.title.trim()) {
      setLessonError("Name the lesson before publishing it to the roadmap.")
      return
    }

    publishLesson({
      courseId: selectedCourse.id,
      lesson: {
        title: lessonForm.title,
        releaseDate: lessonForm.releaseDate || undefined,
        status: lessonForm.status,
      },
      makeCourseVisible: lessonForm.makeVisible ? true : undefined,
    })

    toast({
      title: "Lesson added",
      description: `${lessonForm.title} is now tracked under ${selectedCourse.title}.`,
    })

    setLessonForm({ title: "", releaseDate: "", status: "published", makeVisible: false })
    setLessonDialogOpen(false)
  }

  function handleScheduleSession(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSessionError(null)

    if (!selectedCourse) {
      return
    }

    if (!sessionForm.title.trim() || !sessionForm.date.trim()) {
      setSessionError("Add a title and date to schedule the live experience.")
      return
    }

    scheduleSession({
      courseId: selectedCourse.id,
      session: { ...sessionForm },
    })

    toast({
      title: "Session scheduled",
      description: `${sessionForm.title} has been added to the ${selectedCourse.title} calendar.`,
    })

    setSessionForm({ title: "", format: sessionFormats[0] ?? "Live seminar", date: "", time: "" })
    setSessionDialogOpen(false)
  }

  function handleAddResource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResourceError(null)

    if (!selectedCourse) {
      return
    }

    if (!resourceForm.title.trim()) {
      setResourceError("Give the download a clear name before saving it.")
      return
    }

    addResource({
      courseId: selectedCourse.id,
      resource: { ...resourceForm },
    })

    toast({
      title: "Resource stored",
      description: `${resourceForm.title} is now available to attach to ${selectedCourse.title}.`,
    })

    setResourceForm({ title: "", type: resourceTypes[0] ?? "PDF", size: "" })
    setResourceDialogOpen(false)
  }

  function handleToggleVisibility(course: Course) {
    toggleVisibility({ courseId: course.id, isVisible: !course.isVisibleToStudents })
    toast({
      title: course.isVisibleToStudents ? "Course hidden" : "Course published",
      description: course.isVisibleToStudents
        ? `${course.title} is hidden from the student dashboard until you're ready to relaunch.`
        : `${course.title} is now visible in the student workspace.`,
    })
  }

  function handleDeleteCourse(course: Course) {
    deleteCourse(course.id)
    toast({
      title: "Course archived",
      description: `${course.title} has been removed from the roadmap.`,
    })
  }

  function handlePhaseChange(courseId: string, phase: Course["phase"]) {
    setCoursePhase({ courseId, phase })
    const course = courses.find((item) => item.id === courseId)
    if (course) {
      toast({
        title: "Phase updated",
        description: `${course.title} is now tracked as ${phase}.`,
      })
    }
  }

  function handleCourseDragStart(courseId: string) {
    setDraggingCourseId(courseId)
  }

  function handleCourseDragEnd() {
    setDraggingCourseId(null)
  }

  function handleCourseDrop(phase: Course["phase"]) {
    if (!draggingCourseId) return
    handlePhaseChange(draggingCourseId, phase)
    setSelectedCourseId(draggingCourseId)
    setDraggingCourseId(null)
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 px-6">
      <div className="flex flex-col gap-6 rounded-3xl border border-primary/20 bg-white/95 p-10 shadow-xl shadow-primary/10">
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit border-primary/40 text-primary">
            Instructor control center
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Make real-time updates to your academy
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage courses, lessons, and learning resources. Changes made here are reflected instantly in the student workspace so
            you can verify the experience before connecting Firebase.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none bg-gradient-to-br from-primary/10 via-white to-white shadow-md shadow-primary/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                Visible courses
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <GraduationCap className="h-10 w-10 text-primary" />
              <div>
                <p className="text-3xl font-bold text-foreground">{visibleCourses.length}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">student ready</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-gradient-to-br from-emerald-100 via-white to-white shadow-md shadow-emerald-100/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Published lessons
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="text-3xl font-bold text-foreground">{publishedLessonCount}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">available now</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-gradient-to-br from-amber-100 via-white to-white shadow-md shadow-amber-100/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                Awaiting release
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Radio className="h-10 w-10 text-amber-600" />
              <div>
                <p className="text-3xl font-bold text-foreground">{lessonsAwaitingRelease}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">queued lessons</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-gradient-to-br from-slate-200 via-white to-white shadow-md shadow-slate-200/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
                Hidden drafts
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Layers className="h-10 w-10 text-slate-600" />
              <div>
                <p className="text-3xl font-bold text-foreground">{hiddenCourses}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">staff only</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
        <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">Roadmap board</CardTitle>
            <CardDescription>Drag courses between lanes to show the team what is next in the pipeline.</CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary">
            {courses.length} total courses
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(["Drafting", "Revision", "Enrollment", "Active"] as const).map((lane) => (
              <div
                key={lane}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleCourseDrop(lane)}
                className={`flex min-h-[260px] flex-col gap-3 rounded-2xl border bg-background/60 p-4 transition shadow-sm ${
                  draggingCourseId ? "border-primary/60 ring-1 ring-primary/30" : "border-border/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{lane}</span>
                  <Badge variant="outline" className="border-border/80">
                    {courses.filter((course) => course.phase === lane).length}
                  </Badge>
                </div>
                <Separator className="bg-border/70" />
                <div className="space-y-3">
                  {courses
                    .filter((course) => course.phase === lane)
                    .map((course) => {
                      const publishedLessons = getPublishedLessons(course)
                      return (
                        <div
                          key={course.id}
                          draggable
                          onDragStart={() => handleCourseDragStart(course.id)}
                          onDragEnd={handleCourseDragEnd}
                          onClick={() => setSelectedCourseId(course.id)}
                          className={`cursor-grab rounded-xl border bg-white/90 p-3 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                            selectedCourse?.id === course.id ? "border-primary/40 ring-1 ring-primary/30" : "border-border/60"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-foreground">{course.title}</p>
                            <Badge variant="outline" className="border-primary/30 text-primary">
                              {course.cohort || "No cohort"}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                            <span>
                              {publishedLessons.length}/{course.lessons.length} published
                            </span>
                            <span>{course.isVisibleToStudents ? "Published" : "Hidden"}</span>
                          </div>
                        </div>
                      )
                    })}
                  {!courses.some((course) => course.phase === lane) && (
                    <p className="rounded-lg border border-dashed border-border/60 p-3 text-xs text-muted-foreground">
                      Drop a course here to track it as {lane.toLowerCase()}.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.1fr]">
        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-3">
            <CardTitle className="font-headline text-2xl">Workflow rail</CardTitle>
            <CardDescription>
              Navigate between course, lesson, session, and resource steps while keeping a live student workspace on the right.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Focus course</Label>
              <Select value={selectedCourse?.id} onValueChange={setSelectedCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourse ? (
              <div className="space-y-3 rounded-2xl border border-border/60 bg-background/80 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {selectedCourse.phase}
                  </Badge>
                  <Badge variant="outline" className={selectedCourse.isVisibleToStudents ? "border-emerald-200 text-emerald-600" : "border-border/70"}>
                    {selectedCourse.isVisibleToStudents ? "Visible to students" : "Hidden draft"}
                  </Badge>
                </div>
                <p className="text-lg font-semibold text-foreground">{selectedCourse.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedCourse.cohort || "No cohort"} • {selectedCourse.instructor || "Instructor TBD"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleToggleVisibility(selectedCourse)}>
                    {selectedCourse.isVisibleToStudents ? <><EyeOff className="mr-2 h-4 w-4" /> Hide</> : <><Eye className="mr-2 h-4 w-4" /> Publish</>}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteCourse(selectedCourse)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Archive
                  </Button>
                </div>
                <Separator className="bg-border/70" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>Course > Lessons > Sessions > Resources</span>
                    <PanelRight className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    {Math.round(courseProgress * 100)}% of content is ready for students. Drag cards on the board to move faster.
                  </p>
                  {nextLesson ? (
                    <p className="rounded-xl bg-white/80 p-3 text-foreground shadow-sm">
                      Next up: <span className="font-semibold">{nextLesson.title}</span> ({nextLesson.status})
                    </p>
                  ) : (
                    <p className="rounded-xl bg-white/80 p-3 text-muted-foreground shadow-sm">No upcoming lessons yet.</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Create a course to start organizing lessons and sessions.</p>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>Quick actions</span>
                <LayoutList className="h-4 w-4 text-primary" />
              </div>
              <div className="grid gap-2">
                <Button variant="secondary" className="justify-between rounded-xl" onClick={() => setLessonDialogOpen(true)}>
                  <span className="flex items-center gap-2"><BookOpenCheck className="h-4 w-4" /> Add lesson</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" className="justify-between rounded-xl" onClick={() => setSessionDialogOpen(true)}>
                  <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4" /> Schedule session</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" className="justify-between rounded-xl" onClick={() => setResourceDialogOpen(true)}>
                  <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Upload resource</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedCourse && (
              <div className="space-y-3 rounded-2xl border border-border/60 bg-gradient-to-br from-white via-background to-primary/5 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" /> Student workspace
                </div>
                <p className="text-lg font-semibold text-foreground">{selectedCourse.title}</p>
                <p className="text-sm text-muted-foreground">What learners will see next:</p>
                <div className="flex flex-col gap-2 text-sm">
                  {selectedCourse.lessons.slice(0, 2).map((lesson) => (
                    <div key={lesson.id} className="rounded-xl border border-border/50 bg-white/90 p-3 shadow-sm">
                      <p className="font-medium text-foreground">{lesson.title}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{lesson.status}</p>
                    </div>
                  ))}
                  {!selectedCourse.lessons.length && (
                    <p className="rounded-xl border border-dashed border-border/60 p-3 text-muted-foreground">
                      Publish a lesson to populate the student workspace.
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Publishing wizard</CardTitle>
              <CardDescription>Inline updates sync as you type—no more waiting on toasts or tables.</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Guided steps
            </Badge>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="course" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="course">Course</TabsTrigger>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="course" className="space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <p className="text-sm text-muted-foreground">Create the course shell. Updates appear as you type.</p>
                  <form className="mt-4 grid gap-3" onSubmit={handleCreateCourse}>
                    <div className="grid gap-2">
                      <Label htmlFor="course-title">Course title</Label>
                      <Input
                        id="course-title"
                        value={courseForm.title}
                        onChange={(event) => setCourseForm((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="e.g. Tafsir Essentials"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="course-instructor">Instructor</Label>
                      <Input
                        id="course-instructor"
                        value={courseForm.instructor}
                        onChange={(event) => setCourseForm((prev) => ({ ...prev, instructor: event.target.value }))}
                        placeholder="Lead instructor"
                        required
                      />
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="course-cohort">Cohort</Label>
                        <Input
                          id="course-cohort"
                          value={courseForm.cohort}
                          onChange={(event) => setCourseForm((prev) => ({ ...prev, cohort: event.target.value }))}
                          placeholder="Cohort name or number"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="course-start">Projected start date</Label>
                        <Input
                          id="course-start"
                          value={courseForm.startDate}
                          onChange={(event) => setCourseForm((prev) => ({ ...prev, startDate: event.target.value }))}
                          placeholder="e.g. Jun 3, 2024"
                        />
                      </div>
                    </div>
                    {courseError ? <p className="text-sm text-destructive">{courseError}</p> : null}
                    <div className="flex items-center gap-3">
                      <Button type="submit" className="rounded-full">
                        <PlusCircle className="mr-2 h-5 w-5" /> Create course
                      </Button>
                      <p className="text-xs text-muted-foreground">Changes are reflected instantly for students.</p>
                    </div>
                  </form>
                </div>
                <div className="rounded-2xl border border-dashed border-primary/40 bg-gradient-to-br from-primary/5 via-white to-white p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">Preview</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{courseForm.title || "Course title"}</p>
                  <p className="text-sm text-muted-foreground">
                    {courseForm.instructor || "Instructor TBD"} • {courseForm.cohort || "Cohort"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Starts {courseForm.startDate || "when you set a date"}</p>
                </div>
              </TabsContent>

              <TabsContent value="lessons" className="space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Draft a lesson, then publish from the modal.</p>
                      {lessonError ? <p className="text-sm text-destructive">{lessonError}</p> : null}
                    </div>
                    <Button size="sm" className="rounded-full" onClick={() => setLessonDialogOpen(true)}>
                      <BookOpenCheck className="mr-2 h-4 w-4" /> Launch modal
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-dashed border-primary/40 bg-white/80 p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary">Lesson view</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{lessonForm.title || "Untitled lesson"}</p>
                    <p className="text-sm text-muted-foreground">
                      Status: {lessonForm.status} {lessonForm.releaseDate ? `• ${lessonForm.releaseDate}` : ""}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Course visibility: {lessonForm.makeVisible ? "Publish with this lesson" : "Keep hidden"}
                    </p>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-border/60 bg-background/80 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Current lessons</span>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {selectedCourse?.lessons.length ?? 0}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {selectedCourse?.lessons.length ? (
                        selectedCourse.lessons.map((lesson) => (
                          <div key={lesson.id} className="rounded-xl border border-border/50 bg-white/80 p-3 text-sm">
                            <p className="font-medium text-foreground">{lesson.title}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{lesson.status}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No lessons yet. Use the modal to add your first one.</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Collect the details, then schedule via the modal.</p>
                      {sessionError ? <p className="text-sm text-destructive">{sessionError}</p> : null}
                    </div>
                    <Button size="sm" className="rounded-full" onClick={() => setSessionDialogOpen(true)}>
                      <CalendarClock className="mr-2 h-4 w-4" /> Schedule
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-dashed border-primary/40 bg-white/80 p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary">Session view</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{sessionForm.title || "Live session"}</p>
                    <p className="text-sm text-muted-foreground">
                      {sessionForm.format} • {sessionForm.date || "Date TBD"} {sessionForm.time ? `• ${sessionForm.time}` : ""}
                    </p>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-border/60 bg-background/80 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Upcoming sessions</span>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {selectedCourse?.sessions.length ?? 0}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {selectedCourse?.sessions.length ? (
                        selectedCourse.sessions.map((session) => (
                          <div key={session.id} className="rounded-xl border border-border/50 bg-white/80 p-3 text-sm">
                            <p className="font-medium text-foreground">{session.title}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                              {session.format} • {session.date}
                              {session.time ? ` • ${session.time}` : ""}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No live experiences scheduled yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Use the modal to store resources with inline validation.</p>
                      {resourceError ? <p className="text-sm text-destructive">{resourceError}</p> : null}
                    </div>
                    <Button size="sm" className="rounded-full" onClick={() => setResourceDialogOpen(true)}>
                      <BadgeCheck className="mr-2 h-4 w-4" /> Upload
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-dashed border-primary/40 bg-white/80 p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary">Resource view</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{resourceForm.title || "Download title"}</p>
                    <p className="text-sm text-muted-foreground">
                      {resourceForm.type} {resourceForm.size ? `• ${resourceForm.size}` : ""}
                    </p>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-border/60 bg-background/80 p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Resources</span>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {selectedCourse?.resources.length ?? 0}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {selectedCourse?.resources.length ? (
                        selectedCourse.resources.map((resource) => (
                          <div key={resource.id} className="rounded-xl border border-border/50 bg-white/80 p-3 text-sm">
                            <p className="font-medium text-foreground">{resource.title}</p>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                              {resource.type}
                              {resource.size ? ` • ${resource.size}` : ""}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No downloads stored for this course yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add lesson</DialogTitle>
            <DialogDescription>Publish lessons with consistent validation messaging.</DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={handlePublishLesson}>
            <div className="grid gap-2">
              <Label htmlFor="modal-lesson-title">Lesson title</Label>
              <Input
                id="modal-lesson-title"
                value={lessonForm.title}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="e.g. Introduction to tajweed"
                required
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="modal-lesson-release">Release date</Label>
                <Input
                  id="modal-lesson-release"
                  value={lessonForm.releaseDate}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, releaseDate: event.target.value }))}
                  placeholder="e.g. May 10, 2024"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modal-lesson-status">Status</Label>
                <Select
                  value={lessonForm.status}
                  onValueChange={(value) => setLessonForm((prev) => ({ ...prev, status: value as LessonStatus }))}
                >
                  <SelectTrigger id="modal-lesson-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="modal-lesson-visibility"
                checked={lessonForm.makeVisible}
                onCheckedChange={(checked) =>
                  setLessonForm((prev) => ({ ...prev, makeVisible: checked === true ? true : false }))
                }
              />
              <Label htmlFor="modal-lesson-visibility" className="text-sm text-muted-foreground">
                Make course visible to students when this lesson publishes
              </Label>
            </div>
            {lessonError ? <p className="text-sm text-destructive">{lessonError}</p> : null}
            <DialogFooter className="gap-2 sm:justify-between">
              <Button type="button" variant="outline" onClick={() => setLessonDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Add lesson
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule session</DialogTitle>
            <DialogDescription>Confirm details before sending to the calendar.</DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={handleScheduleSession}>
            <div className="grid gap-2">
              <Label htmlFor="modal-session-title">Session title</Label>
              <Input
                id="modal-session-title"
                value={sessionForm.title}
                onChange={(event) => setSessionForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="e.g. Live Q&A"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="modal-session-format">Format</Label>
              <Select
                value={sessionForm.format}
                onValueChange={(value) => setSessionForm((prev) => ({ ...prev, format: value }))}
              >
                <SelectTrigger id="modal-session-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {sessionFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="modal-session-date">Date</Label>
                <Input
                  id="modal-session-date"
                  value={sessionForm.date}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, date: event.target.value }))}
                  placeholder="e.g. Apr 30, 2024"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modal-session-time">Time</Label>
                <Input
                  id="modal-session-time"
                  value={sessionForm.time}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, time: event.target.value }))}
                  placeholder="e.g. 7:00 PM GMT"
                />
              </div>
            </div>
            {sessionError ? <p className="text-sm text-destructive">{sessionError}</p> : null}
            <DialogFooter className="gap-2 sm:justify-between">
              <Button type="button" variant="outline" onClick={() => setSessionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Schedule session
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload resource</DialogTitle>
            <DialogDescription>Attach downloads with clear messaging.</DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={handleAddResource}>
            <div className="grid gap-2">
              <Label htmlFor="modal-resource-title">Resource title</Label>
              <Input
                id="modal-resource-title"
                value={resourceForm.title}
                onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="e.g. Workbook PDF"
                required
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="modal-resource-type">Type</Label>
                <Select
                  value={resourceForm.type}
                  onValueChange={(value) => setResourceForm((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger id="modal-resource-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modal-resource-size">File size (optional)</Label>
                <Input
                  id="modal-resource-size"
                  value={resourceForm.size}
                  onChange={(event) => setResourceForm((prev) => ({ ...prev, size: event.target.value }))}
                  placeholder="e.g. 4.2 MB"
                />
              </div>
            </div>
            {resourceError ? <p className="text-sm text-destructive">{resourceError}</p> : null}
            <DialogFooter className="gap-2 sm:justify-between">
              <Button type="button" variant="outline" onClick={() => setResourceDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Add resource
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

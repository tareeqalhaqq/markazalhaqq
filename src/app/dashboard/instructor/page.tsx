'use client'

import { useEffect, useMemo, useState } from "react"
import {
  BadgeCheck,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Layers,
  PlusCircle,
  Radio,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

const phaseOptions: Course["phase"][] = ["Drafting", "Revision", "Enrollment", "Active", "Archived"]
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
  const [lessonForm, setLessonForm] = useState<LessonFormState>({
    title: "",
    releaseDate: "",
    status: "published",
    makeVisible: false,
  })
  const [sessionForm, setSessionForm] = useState<SessionFormState>({
    title: "",
    format: sessionFormats[0] ?? "Live seminar",
    date: "",
    time: "",
  })
  const [resourceForm, setResourceForm] = useState<ResourceFormState>({
    title: "",
    type: resourceTypes[0] ?? "PDF",
    size: "",
  })

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

  function handleCreateCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!courseForm.title.trim() || !courseForm.instructor.trim()) {
      toast({
        title: "Course details required",
        description: "Provide at least a title and instructor to create the course entry.",
        variant: "destructive",
      })
      return
    }

    createCourse({ ...courseForm })
    toast({
      title: "Course created",
      description: `${courseForm.title} is now in the roadmap. Publish lessons to share it with students soon.`,
    })
    setCourseForm({ title: "", instructor: "", cohort: "", startDate: "" })
  }

  function handlePublishLesson(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedCourse) {
      return
    }

    if (!lessonForm.title.trim()) {
      toast({
        title: "Lesson title required",
        description: "Name the lesson before publishing it to the roadmap.",
        variant: "destructive",
      })
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
  }

  function handleScheduleSession(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedCourse) {
      return
    }

    if (!sessionForm.title.trim() || !sessionForm.date.trim()) {
      toast({
        title: "Session details missing",
        description: "Add a title and date to schedule the live experience.",
        variant: "destructive",
      })
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
  }

  function handleAddResource(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedCourse) {
      return
    }

    if (!resourceForm.title.trim()) {
      toast({
        title: "Resource title required",
        description: "Give the download a clear name before saving it.",
        variant: "destructive",
      })
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
  }

  function handleToggleVisibility(course: Course) {
    toggleVisibility({ courseId: course.id, isVisible: !course.isVisibleToStudents })
    toast({
      title: course.isVisibleToStudents ? "Course hidden" : "Course published",
      description: course.isVisibleToStudents
        ? `${course.title} is hidden from the student dashboard until you're ready to relaunch.`
        : `${course.title} is now visible to the student preview.`,
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
            Manage courses, lessons, and learning resources. Changes made here are reflected instantly in the student preview so
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

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Course roadmap</CardTitle>
              <CardDescription>Select a course to review its publishing status and manage visibility.</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {courses.length} total courses
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Cohort</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Lessons</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => {
                  const publishedLessons = getPublishedLessons(course)
                  return (
                    <TableRow
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedCourse?.id === course.id ? "bg-primary/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell className="font-medium text-foreground">{course.title}</TableCell>
                      <TableCell>{course.cohort || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/40 text-primary">
                          {course.phase}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={course.isVisibleToStudents ? "default" : "outline"}
                          className={course.isVisibleToStudents ? "bg-emerald-600" : "border-border/60"}
                        >
                          {course.isVisibleToStudents ? "Published" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {publishedLessons.length}/{course.lessons.length}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Add a new course</CardTitle>
            <CardDescription>Create the shell so the curriculum team can begin drafting content.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleCreateCourse}>
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
              <Button type="submit" className="rounded-full">
                <PlusCircle className="mr-2 h-5 w-5" /> Create course
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {selectedCourse ? (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">{selectedCourse.title}</CardTitle>
                <CardDescription>
                  Track lesson progress, control visibility, and manage the learning experience for this cohort.
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => handleToggleVisibility(selectedCourse)}
                >
                  {selectedCourse.isVisibleToStudents ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" /> Hide from students
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" /> Publish to students
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteCourse(selectedCourse)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Archive course
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>Phase</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {selectedCourse.phase}
                    </Badge>
                  </div>
                  <Select
                    value={selectedCourse.phase}
                    onValueChange={(value) => handlePhaseChange(selectedCourse.id, value as Course["phase"])}
                  >
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phaseOptions.map((phase) => (
                        <SelectItem key={phase} value={phase}>
                          {phase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>Progress</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {selectedCourse.isVisibleToStudents ? "Student view" : "Internal"}
                    </Badge>
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{getCourseProgress(selectedCourse)}%</p>
                  <p className="text-sm text-muted-foreground">
                    Based on published lessons completed by the demo student account.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>Publishing queue</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {selectedCourse.lessons.length} lessons
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-3">
                    {selectedCourse.lessons
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-start justify-between rounded-xl border border-border/40 bg-white/80 p-3"
                        >
                          <div>
                            <p className="text-sm font-semibold text-foreground">{lesson.title}</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                              {lesson.status === "published" ? "Published" : lesson.status === "ready" ? "Ready" : "Draft"}
                              {lesson.releaseDate ? ` • ${lesson.releaseDate}` : ""}
                            </p>
                          </div>
                          {selectedCourse.completedLessonIds.includes(lesson.id) ? (
                            <BadgeCheck className="h-5 w-5 text-emerald-600" />
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>Next student lesson</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Demo portal
                    </Badge>
                  </div>
                  {getNextLesson(selectedCourse) ? (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-semibold text-foreground">{getNextLesson(selectedCourse)?.title}</p>
                      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <CalendarClock className="h-4 w-4" />
                        {getNextLesson(selectedCourse)?.releaseDate ?? "Release date TBC"}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Publish a lesson to set the next milestone for learners.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <form className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-4" onSubmit={handlePublishLesson}>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    <BookOpenCheck className="h-4 w-4" /> Publish lesson
                  </h3>
                  <div className="grid gap-2">
                    <Label htmlFor="lesson-title">Lesson title</Label>
                    <Input
                      id="lesson-title"
                      value={lessonForm.title}
                      onChange={(event) => setLessonForm((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="e.g. Battle of Badr insights"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lesson-release">Release date</Label>
                    <Input
                      id="lesson-release"
                      value={lessonForm.releaseDate}
                      onChange={(event) => setLessonForm((prev) => ({ ...prev, releaseDate: event.target.value }))}
                      placeholder="e.g. Apr 28, 2024"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lesson-status">Status</Label>
                    <Select
                      value={lessonForm.status}
                      onValueChange={(value) => setLessonForm((prev) => ({ ...prev, status: value as LessonStatus }))}
                    >
                      <SelectTrigger id="lesson-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="ready">Ready for review</SelectItem>
                        <SelectItem value="draft">Draft only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={lessonForm.makeVisible}
                      onCheckedChange={(checked) =>
                        setLessonForm((prev) => ({ ...prev, makeVisible: Boolean(checked) }))
                      }
                    />
                    Make course visible to students if it is hidden
                  </label>
                  <Button type="submit" className="rounded-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Save lesson
                  </Button>
                </form>

                <form className="space-y-3 rounded-2xl border border-border/50 bg-background/80 p-4" onSubmit={handleScheduleSession}>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
                    <CalendarClock className="h-4 w-4" /> Schedule live session
                  </h3>
                  <div className="grid gap-2">
                    <Label htmlFor="session-title">Session title</Label>
                    <Input
                      id="session-title"
                      value={sessionForm.title}
                      onChange={(event) => setSessionForm((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="e.g. Live Q&A circle"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="session-format">Format</Label>
                    <Select
                      value={sessionForm.format}
                      onValueChange={(value) => setSessionForm((prev) => ({ ...prev, format: value }))}
                    >
                      <SelectTrigger id="session-format">
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
                  <div className="grid gap-2">
                    <Label htmlFor="session-date">Date</Label>
                    <Input
                      id="session-date"
                      value={sessionForm.date}
                      onChange={(event) => setSessionForm((prev) => ({ ...prev, date: event.target.value }))}
                      placeholder="e.g. Apr 30, 2024"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="session-time">Time</Label>
                    <Input
                      id="session-time"
                      value={sessionForm.time}
                      onChange={(event) => setSessionForm((prev) => ({ ...prev, time: event.target.value }))}
                      placeholder="e.g. 7:00 PM GMT"
                    />
                  </div>
                  <Button type="submit" className="rounded-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Schedule session
                  </Button>
                </form>
              </div>

              <form className="space-y-3 rounded-2xl border border-border/50 bg-background/80 p-4" onSubmit={handleAddResource}>
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
                  <BadgeCheck className="h-4 w-4" /> Upload resource
                </h3>
                <div className="grid gap-2">
                  <Label htmlFor="resource-title">Resource title</Label>
                  <Input
                    id="resource-title"
                    value={resourceForm.title}
                    onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="e.g. Workbook PDF"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resource-type">Type</Label>
                  <Select
                    value={resourceForm.type}
                    onValueChange={(value) => setResourceForm((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger id="resource-type">
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
                  <Label htmlFor="resource-size">File size (optional)</Label>
                  <Input
                    id="resource-size"
                    value={resourceForm.size}
                    onChange={(event) => setResourceForm((prev) => ({ ...prev, size: event.target.value }))}
                    placeholder="e.g. 4.2 MB"
                  />
                </div>
                <Button type="submit" className="rounded-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add resource
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-white/95 shadow-md shadow-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Live overview</CardTitle>
              <CardDescription>Snapshot of sessions and resources synced with the student preview.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/40 bg-background/70 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Upcoming sessions</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {selectedCourse.sessions.length}
                  </Badge>
                </div>
                <div className="mt-3 space-y-3">
                  {selectedCourse.sessions.length ? (
                    selectedCourse.sessions.map((session) => (
                      <div key={session.id} className="rounded-xl border border-border/40 bg-white/80 p-3 text-sm">
                        <p className="font-semibold text-foreground">{session.title}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          {session.format} • {session.date}
                          {session.time ? ` • ${session.time}` : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No live sessions scheduled yet.</p>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/70 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Resources</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {selectedCourse.resources.length}
                  </Badge>
                </div>
                <div className="mt-3 space-y-3">
                  {selectedCourse.resources.length ? (
                    selectedCourse.resources.map((resource) => (
                      <div key={resource.id} className="rounded-xl border border-border/40 bg-white/80 p-3 text-sm">
                        <p className="font-semibold text-foreground">{resource.title}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
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
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}

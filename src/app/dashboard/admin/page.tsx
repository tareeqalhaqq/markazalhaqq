"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useUserRole } from "@/hooks/useUserRole"
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection"
import {
  createAnnouncement,
  createCourse,
  createCourseLesson,
  createCourseModule,
  createExamOrCertification,
  createLiveSession,
  createResource,
  createTeacherProfile,
  createQuiz,
  deleteQuiz,
  removeStudentProfile,
  updateCourse,
  updateQuiz,
  upsertStudentProfile,
  type AcademyCourse,
  type Announcement,
  type ExamOrCertification,
  type LiveSession,
  type Quiz,
  type ResourceLibraryItem,
  type StudentProfile,
} from "@/lib/academy-data"

export default function AdminWorkspacePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, role, loading } = useUserRole()
  const { data: courses } = useFirestoreCollection<AcademyCourse>("courses", { orderByField: "createdAt" })
  const { data: sessions } = useFirestoreCollection<LiveSession>("liveSessions", { orderByField: "scheduledAt" })
  const { data: resources } = useFirestoreCollection<ResourceLibraryItem>("resources", { orderByField: "createdAt" })
  const { data: announcements } = useFirestoreCollection<Announcement>("announcements", { orderByField: "createdAt" })
  const { data: exams } = useFirestoreCollection<ExamOrCertification>("exams", { orderByField: "createdAt" })
  const { data: students } = useFirestoreCollection<StudentProfile>("students", { orderByField: "createdAt" })
  const { data: quizzes } = useFirestoreCollection<Quiz>("quizzes", { orderByField: "createdAt" })

  const [courseForm, setCourseForm] = useState({
    title: "",
    instructor: "",
    level: "",
    status: "upcoming",
    description: "",
    startDate: "",
    lessonCount: "",
    completedLessons: "",
  })
  const [sessionForm, setSessionForm] = useState({
    title: "",
    courseTitle: "",
    presenter: "",
    scheduledAt: "",
    format: "",
    link: "",
  })
  const [resourceForm, setResourceForm] = useState({
    title: "",
    courseTitle: "",
    type: "PDF",
    embedUrl: "",
    downloadUrl: "",
  })
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    body: "",
    audience: "All students",
    publishedAt: "",
  })
  const [examForm, setExamForm] = useState({
    title: "",
    courseTitle: "",
    status: "Scheduled",
    availableOn: "",
    proctored: false,
  })
  const [teacherForm, setTeacherForm] = useState({ fullName: "", email: "", specialty: "" })
  const [studentForm, setStudentForm] = useState({
    fullName: "",
    email: "",
    cohort: "",
    track: "",
    enrollmentStatus: "active",
    liveAccess: true,
    notes: "",
  })
  const [studentRemovalEmail, setStudentRemovalEmail] = useState("")
  const [courseStatusForm, setCourseStatusForm] = useState({ courseId: "", status: "active", isLive: true })
  const [moduleForm, setModuleForm] = useState({ courseId: "", title: "", order: "1", summary: "" })
  const [lessonForm, setLessonForm] = useState({
    courseId: "",
    moduleId: "",
    title: "",
    order: "1",
    content: "",
    videoUrl: "",
  })
  const [quizForm, setQuizForm] = useState({
    title: "",
    courseTitle: "",
    section: "",
    status: "draft",
    questionCount: "",
    isTimed: false,
    instructions: "",
  })

  const [savingCourse, setSavingCourse] = useState(false)
  const [savingSession, setSavingSession] = useState(false)
  const [savingResource, setSavingResource] = useState(false)
  const [savingAnnouncement, setSavingAnnouncement] = useState(false)
  const [savingExam, setSavingExam] = useState(false)
  const [savingTeacher, setSavingTeacher] = useState(false)
  const [savingStudent, setSavingStudent] = useState(false)
  const [savingStudentRemoval, setSavingStudentRemoval] = useState(false)
  const [savingCourseStatus, setSavingCourseStatus] = useState(false)
  const [savingModule, setSavingModule] = useState(false)
  const [savingLesson, setSavingLesson] = useState(false)
  const [savingQuiz, setSavingQuiz] = useState(false)
  const [updatingQuizId, setUpdatingQuizId] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.replace("/dashboard")
    }
  }, [loading, role, router, user])

  const overview = useMemo(
    () => [
      { label: "Students", value: students.length },
      { label: "Courses", value: courses.length },
      { label: "Live sessions", value: sessions.length },
      { label: "Resources", value: resources.length },
      { label: "Announcements", value: announcements.length },
      { label: "Assessments", value: exams.length },
      { label: "Quizzes", value: quizzes.length },
    ],
    [announcements.length, courses.length, exams.length, quizzes.length, resources.length, sessions.length, students.length],
  )

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Checking your admin permissions…</p>
      </div>
    )
  }

  if (!user || role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3 text-center">
        <p className="text-lg font-semibold">Admin access required</p>
        <p className="text-muted-foreground">This workspace is restricted to verified Markaz al Haqq administrators.</p>
      </div>
    )
  }

  async function handleCourseSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingCourse(true)
    try {
      await createCourse({
        title: courseForm.title,
        instructor: courseForm.instructor,
        level: courseForm.level,
        status: courseForm.status as "upcoming" | "active" | "completed",
        description: courseForm.description,
        startDate: courseForm.startDate || undefined,
        lessonCount: courseForm.lessonCount ? Number(courseForm.lessonCount) : undefined,
        completedLessons: courseForm.completedLessons ? Number(courseForm.completedLessons) : undefined,
      })
      toast({ title: "Course created", description: `${courseForm.title} is now in the catalog.` })
      setCourseForm({
        title: "",
        instructor: "",
        level: "",
        status: "upcoming",
        description: "",
        startDate: "",
        lessonCount: "",
        completedLessons: "",
      })
    } catch (error) {
      console.error("Failed to save course", error)
      toast({ title: "Could not create course", variant: "destructive" })
    } finally {
      setSavingCourse(false)
    }
  }

  async function handleSessionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingSession(true)
    try {
      await createLiveSession({
        title: sessionForm.title,
        courseTitle: sessionForm.courseTitle,
        presenter: sessionForm.presenter,
        scheduledAt: sessionForm.scheduledAt || new Date().toISOString(),
        format: sessionForm.format || "Live",
        link: sessionForm.link || undefined,
      })
      toast({ title: "Session scheduled", description: sessionForm.title })
      setSessionForm({ title: "", courseTitle: "", presenter: "", scheduledAt: "", format: "", link: "" })
    } catch (error) {
      console.error("Failed to save session", error)
      toast({ title: "Could not create session", variant: "destructive" })
    } finally {
      setSavingSession(false)
    }
  }

  async function handleResourceSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingResource(true)
    try {
      await createResource({ ...resourceForm })
      toast({ title: "Resource added", description: resourceForm.title })
      setResourceForm({ title: "", courseTitle: "", type: "PDF", embedUrl: "", downloadUrl: "" })
    } catch (error) {
      console.error("Failed to save resource", error)
      toast({ title: "Could not add resource", variant: "destructive" })
    } finally {
      setSavingResource(false)
    }
  }

  async function handleAnnouncementSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingAnnouncement(true)
    try {
      await createAnnouncement({
        title: announcementForm.title,
        body: announcementForm.body,
        audience: announcementForm.audience,
        publishedAt: announcementForm.publishedAt || new Date().toISOString(),
      })
      toast({ title: "Announcement published", description: announcementForm.title })
      setAnnouncementForm({ title: "", body: "", audience: "All students", publishedAt: "" })
    } catch (error) {
      console.error("Failed to save announcement", error)
      toast({ title: "Could not publish announcement", variant: "destructive" })
    } finally {
      setSavingAnnouncement(false)
    }
  }

  async function handleExamSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingExam(true)
    try {
      await createExamOrCertification({
        title: examForm.title,
        courseTitle: examForm.courseTitle,
        status: examForm.status,
        availableOn: examForm.availableOn || new Date().toISOString(),
        proctored: examForm.proctored,
      })
      toast({ title: "Assessment queued", description: examForm.title })
      setExamForm({ title: "", courseTitle: "", status: "Scheduled", availableOn: "", proctored: false })
    } catch (error) {
      console.error("Failed to save exam", error)
      toast({ title: "Could not create exam", variant: "destructive" })
    } finally {
      setSavingExam(false)
    }
  }

  async function handleTeacherSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingTeacher(true)
    try {
      await createTeacherProfile(teacherForm)
      toast({ title: "Teacher profile created", description: teacherForm.fullName })
      setTeacherForm({ fullName: "", email: "", specialty: "" })
    } catch (error) {
      console.error("Failed to save teacher", error)
      toast({ title: "Could not create teacher profile", variant: "destructive" })
    } finally {
      setSavingTeacher(false)
    }
  }

  async function handleStudentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingStudent(true)
    try {
      await upsertStudentProfile({ ...studentForm, enrollmentStatus: studentForm.enrollmentStatus as StudentProfile["enrollmentStatus"] })
      toast({ title: "Student saved", description: `${studentForm.fullName || studentForm.email} added to roster.` })
      setStudentForm({
        fullName: "",
        email: "",
        cohort: "",
        track: "",
        enrollmentStatus: "active",
        liveAccess: true,
        notes: "",
      })
    } catch (error) {
      console.error("Failed to save student", error)
      toast({ title: "Could not save student", variant: "destructive" })
    } finally {
      setSavingStudent(false)
    }
  }

  async function handleStudentRemoval(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingStudentRemoval(true)
    try {
      await removeStudentProfile(studentRemovalEmail)
      toast({ title: "Student removed", description: studentRemovalEmail })
      setStudentRemovalEmail("")
    } catch (error) {
      console.error("Failed to remove student", error)
      toast({ title: "Could not remove student", variant: "destructive" })
    } finally {
      setSavingStudentRemoval(false)
    }
  }

  async function handleCourseStatusSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseStatusForm.courseId) return
    setSavingCourseStatus(true)
    try {
      await updateCourse(courseStatusForm.courseId, {
        status: courseStatusForm.status as AcademyCourse["status"],
        isLive: courseStatusForm.isLive,
      })
      toast({ title: "Course updated", description: `Status saved for ${courseStatusForm.courseId}.` })
      setCourseStatusForm({ courseId: "", status: "active", isLive: true })
    } catch (error) {
      console.error("Failed to update course", error)
      toast({ title: "Could not update course", variant: "destructive" })
    } finally {
      setSavingCourseStatus(false)
    }
  }

  async function handleModuleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingModule(true)
    try {
      await createCourseModule(moduleForm.courseId, {
        title: moduleForm.title,
        order: Number(moduleForm.order) || 0,
        summary: moduleForm.summary,
      })
      toast({ title: "Module added", description: moduleForm.title })
      setModuleForm({ courseId: "", title: "", order: "1", summary: "" })
    } catch (error) {
      console.error("Failed to save module", error)
      toast({ title: "Could not save module", variant: "destructive" })
    } finally {
      setSavingModule(false)
    }
  }

  async function handleLessonSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingLesson(true)
    try {
      await createCourseLesson(lessonForm.courseId, lessonForm.moduleId, {
        title: lessonForm.title,
        order: Number(lessonForm.order) || 0,
        content: lessonForm.content,
        videoUrl: lessonForm.videoUrl,
      })
      toast({ title: "Lesson added", description: lessonForm.title })
      setLessonForm({ courseId: "", moduleId: "", title: "", order: "1", content: "", videoUrl: "" })
    } catch (error) {
      console.error("Failed to save lesson", error)
      toast({ title: "Could not save lesson", variant: "destructive" })
    } finally {
      setSavingLesson(false)
    }
  }

  async function handleQuizSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingQuiz(true)
    try {
      await createQuiz({
        title: quizForm.title,
        courseTitle: quizForm.courseTitle,
        section: quizForm.section,
        status: quizForm.status as Quiz["status"],
        questionCount: quizForm.questionCount ? Number(quizForm.questionCount) : undefined,
        isTimed: quizForm.isTimed,
        instructions: quizForm.instructions,
      })
      toast({ title: "Quiz created", description: quizForm.title })
      setQuizForm({ title: "", courseTitle: "", section: "", status: "draft", questionCount: "", isTimed: false, instructions: "" })
    } catch (error) {
      console.error("Failed to create quiz", error)
      toast({ title: "Could not create quiz", variant: "destructive" })
    } finally {
      setSavingQuiz(false)
    }
  }

  async function handleQuizStatusChange(quizId: string, nextStatus: Quiz["status"]) {
    setUpdatingQuizId(quizId)
    try {
      await updateQuiz(quizId, { status: nextStatus })
      toast({ title: "Quiz updated", description: `Quiz marked as ${nextStatus}.` })
    } catch (error) {
      console.error("Failed to update quiz", error)
      toast({ title: "Could not update quiz", variant: "destructive" })
    } finally {
      setUpdatingQuizId(null)
    }
  }

  async function handleQuizDelete(quizId: string) {
    setUpdatingQuizId(quizId)
    try {
      await deleteQuiz(quizId)
      toast({ title: "Quiz removed" })
    } catch (error) {
      console.error("Failed to delete quiz", error)
      toast({ title: "Could not delete quiz", variant: "destructive" })
    } finally {
      setUpdatingQuizId(null)
    }
  }
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Admin workspace</p>
        <h1 className="text-3xl font-bold">Orchestrate the academy</h1>
        <p className="text-muted-foreground">
          Create courses, push announcements, attach resources, and seed live sessions directly into Firestore.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {overview.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-3xl">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Student roster</CardTitle>
            <CardDescription>Enroll learners, manage live access, or remove old accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleStudentSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="student-name">Full name</Label>
                <Input
                  id="student-name"
                  value={studentForm.fullName}
                  onChange={(event) => setStudentForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  placeholder="Fatimah Bint Ahmed"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student-email">Email</Label>
                <Input
                  id="student-email"
                  type="email"
                  value={studentForm.email}
                  onChange={(event) => setStudentForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student-cohort">Cohort</Label>
                <Input
                  id="student-cohort"
                  value={studentForm.cohort}
                  onChange={(event) => setStudentForm((prev) => ({ ...prev, cohort: event.target.value }))}
                  placeholder="Spring 2025"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student-track">Program / track</Label>
                <Input
                  id="student-track"
                  value={studentForm.track}
                  onChange={(event) => setStudentForm((prev) => ({ ...prev, track: event.target.value }))}
                  placeholder="Arabic foundations"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student-status">Enrollment status</Label>
                <select
                  id="student-status"
                  className="h-11 rounded-md border border-input bg-transparent px-3"
                  value={studentForm.enrollmentStatus}
                  onChange={(event) => setStudentForm((prev) => ({ ...prev, enrollmentStatus: event.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="prospect">Prospect</option>
                </select>
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="student-notes">Notes</Label>
                <Textarea
                  id="student-notes"
                  value={studentForm.notes}
                  onChange={(event) => setStudentForm((prev) => ({ ...prev, notes: event.target.value }))}
                  placeholder="Payment plan, timezone, or custom permissions"
                  rows={2}
                />
              </div>
              <div className="flex items-center justify-between rounded-md border border-dashed border-border/60 bg-muted/30 px-4 py-3 md:col-span-2">
                <div>
                  <p className="text-sm font-semibold">Live access</p>
                  <p className="text-xs text-muted-foreground">Toggle access to live lessons and recordings.</p>
                </div>
                <Switch
                  id="student-live-access"
                  checked={studentForm.liveAccess}
                  onCheckedChange={(checked) => setStudentForm((prev) => ({ ...prev, liveAccess: checked }))}
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingStudent}>
                {savingStudent ? "Saving…" : "Save student"}
              </Button>
            </form>

            <form className="grid gap-3 md:grid-cols-[2fr_1fr] md:items-end" onSubmit={handleStudentRemoval}>
              <div className="grid gap-2">
                <Label htmlFor="remove-student-email">Remove student by email</Label>
                <Input
                  id="remove-student-email"
                  type="email"
                  placeholder="student@email.com"
                  value={studentRemovalEmail}
                  onChange={(event) => setStudentRemovalEmail(event.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Removing a record does not delete the Firebase Auth user; it only cleans the students collection.
                </p>
              </div>
              <Button type="submit" disabled={savingStudentRemoval}>
                {savingStudentRemoval ? "Removing…" : "Remove student"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">Tracking {students.length} students in this workspace.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create course</CardTitle>
            <CardDescription>Visible to both the student dashboard and session planner.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCourseSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="course-title">Title</Label>
                <Input
                  id="course-title"
                  value={courseForm.title}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-instructor">Instructor</Label>
                <Input
                  id="course-instructor"
                  value={courseForm.instructor}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, instructor: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-level">Level</Label>
                <Input
                  id="course-level"
                  value={courseForm.level}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, level: event.target.value }))}
                  placeholder="Beginner / Advanced"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-status">Status</Label>
                <select
                  id="course-status"
                  className="h-11 rounded-md border border-input bg-transparent px-3"
                  value={courseForm.status}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, status: event.target.value }))}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-start">Start date</Label>
                <Input
                  id="course-start"
                  type="date"
                  value={courseForm.startDate}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, startDate: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-lessons">Total lessons</Label>
                <Input
                  id="course-lessons"
                  type="number"
                  min="0"
                  value={courseForm.lessonCount}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, lessonCount: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-completed">Completed lessons</Label>
                <Input
                  id="course-completed"
                  type="number"
                  min="0"
                  value={courseForm.completedLessons}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, completedLessons: event.target.value }))}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="course-description">Description</Label>
                <Textarea
                  id="course-description"
                  value={courseForm.description}
                  onChange={(event) => setCourseForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={3}
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingCourse}>
                {savingCourse ? "Saving…" : "Create course"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course visibility & status</CardTitle>
            <CardDescription>Flip courses live or archived without leaving the editor.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-3" onSubmit={handleCourseStatusSubmit}>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="course-id">Course document ID</Label>
                <Input
                  id="course-id"
                  value={courseStatusForm.courseId}
                  onChange={(event) => setCourseStatusForm((prev) => ({ ...prev, courseId: event.target.value }))}
                  placeholder="Firestore doc id"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-status-live">Status</Label>
                <select
                  id="course-status-live"
                  className="h-11 rounded-md border border-input bg-transparent px-3"
                  value={courseStatusForm.status}
                  onChange={(event) => setCourseStatusForm((prev) => ({ ...prev, status: event.target.value }))}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-md border border-dashed border-border/60 bg-muted/30 px-4 py-3 md:col-span-3">
                <div>
                  <p className="text-sm font-semibold">Mark course as live</p>
                  <p className="text-xs text-muted-foreground">Control visibility on the student dashboard immediately.</p>
                </div>
                <Switch
                  id="course-live-toggle"
                  checked={courseStatusForm.isLive}
                  onCheckedChange={(checked) => setCourseStatusForm((prev) => ({ ...prev, isLive: checked }))}
                />
              </div>
              <Button type="submit" className="md:col-span-3" disabled={savingCourseStatus}>
                {savingCourseStatus ? "Saving…" : "Update course"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule live session</CardTitle>
            <CardDescription>Drop-in classes sync to the student dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSessionSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="session-title">Title</Label>
                <Input
                  id="session-title"
                  value={sessionForm.title}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-course">Course</Label>
                <Input
                  id="session-course"
                  value={sessionForm.courseTitle}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, courseTitle: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-presenter">Presenter</Label>
                <Input
                  id="session-presenter"
                  value={sessionForm.presenter}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, presenter: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-date">Scheduled for</Label>
                <Input
                  id="session-date"
                  type="datetime-local"
                  value={sessionForm.scheduledAt}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, scheduledAt: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-format">Format</Label>
                <Input
                  id="session-format"
                  value={sessionForm.format}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, format: event.target.value }))}
                  placeholder="Live stream / Office hours"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-link">Join link</Label>
                <Input
                  id="session-link"
                  value={sessionForm.link}
                  onChange={(event) => setSessionForm((prev) => ({ ...prev, link: event.target.value }))}
                  placeholder="https://"
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingSession}>
                {savingSession ? "Saving…" : "Add session"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add resource</CardTitle>
            <CardDescription>Share embed and download links for each course.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleResourceSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="resource-title">Title</Label>
                <Input
                  id="resource-title"
                  value={resourceForm.title}
                  onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource-course">Course</Label>
                <Input
                  id="resource-course"
                  value={resourceForm.courseTitle}
                  onChange={(event) => setResourceForm((prev) => ({ ...prev, courseTitle: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource-type">Type</Label>
                <Input
                  id="resource-type"
                  value={resourceForm.type}
                  onChange={(event) => setResourceForm((prev) => ({ ...prev, type: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resource-embed">Embed link</Label>
                <Input
                  id="resource-embed"
                  value={resourceForm.embedUrl}
                  onChange={(event) => setResourceForm((prev) => ({ ...prev, embedUrl: event.target.value }))}
                  placeholder="https://"
                  required
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="resource-download">Download link</Label>
                <Input
                  id="resource-download"
                  value={resourceForm.downloadUrl}
                  onChange={(event) => setResourceForm((prev) => ({ ...prev, downloadUrl: event.target.value }))}
                  placeholder="https://"
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingResource}>
                {savingResource ? "Saving…" : "Add resource"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course modules</CardTitle>
            <CardDescription>Structure lessons before attaching media or quizzes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleModuleSubmit}>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="module-course">Course document ID</Label>
                <Input
                  id="module-course"
                  value={moduleForm.courseId}
                  onChange={(event) => setModuleForm((prev) => ({ ...prev, courseId: event.target.value }))}
                  placeholder="Firestore doc id"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="module-title">Module title</Label>
                <Input
                  id="module-title"
                  value={moduleForm.title}
                  onChange={(event) => setModuleForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="module-order">Order</Label>
                <Input
                  id="module-order"
                  type="number"
                  min="0"
                  value={moduleForm.order}
                  onChange={(event) => setModuleForm((prev) => ({ ...prev, order: event.target.value }))}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="module-summary">Summary</Label>
                <Textarea
                  id="module-summary"
                  value={moduleForm.summary}
                  onChange={(event) => setModuleForm((prev) => ({ ...prev, summary: event.target.value }))}
                  rows={3}
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingModule}>
                {savingModule ? "Saving…" : "Add module"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lessons & recordings</CardTitle>
            <CardDescription>Attach lesson metadata and video URLs to each module.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleLessonSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="lesson-course">Course document ID</Label>
                <Input
                  id="lesson-course"
                  value={lessonForm.courseId}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, courseId: event.target.value }))}
                  placeholder="Firestore doc id"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-module">Module document ID</Label>
                <Input
                  id="lesson-module"
                  value={lessonForm.moduleId}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, moduleId: event.target.value }))}
                  placeholder="Module doc id"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-title">Lesson title</Label>
                <Input
                  id="lesson-title"
                  value={lessonForm.title}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lesson-order">Order</Label>
                <Input
                  id="lesson-order"
                  type="number"
                  min="0"
                  value={lessonForm.order}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, order: event.target.value }))}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="lesson-content">Notes / content</Label>
                <Textarea
                  id="lesson-content"
                  value={lessonForm.content}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, content: event.target.value }))}
                  rows={3}
                  placeholder="Outcome, reading, or summary"
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="lesson-video">Recording link</Label>
                <Input
                  id="lesson-video"
                  value={lessonForm.videoUrl}
                  onChange={(event) => setLessonForm((prev) => ({ ...prev, videoUrl: event.target.value }))}
                  placeholder="https://"
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingLesson}>
                {savingLesson ? "Saving…" : "Add lesson"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz builder</CardTitle>
            <CardDescription>Create quizzes, flip them live, and keep drafts for later.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleQuizSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="quiz-title">Quiz title</Label>
                <Input
                  id="quiz-title"
                  value={quizForm.title}
                  onChange={(event) => setQuizForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quiz-course">Course or module</Label>
                <Input
                  id="quiz-course"
                  value={quizForm.courseTitle}
                  onChange={(event) => setQuizForm((prev) => ({ ...prev, courseTitle: event.target.value }))}
                  placeholder="Course name or doc id"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quiz-section">Section</Label>
                <Input
                  id="quiz-section"
                  value={quizForm.section}
                  onChange={(event) => setQuizForm((prev) => ({ ...prev, section: event.target.value }))}
                  placeholder="Module or lesson reference"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quiz-status">Status</Label>
                <select
                  id="quiz-status"
                  className="h-11 rounded-md border border-input bg-transparent px-3"
                  value={quizForm.status}
                  onChange={(event) => setQuizForm((prev) => ({ ...prev, status: event.target.value }))}
                >
                  <option value="draft">Draft</option>
                  <option value="live">Live</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quiz-count">Question count</Label>
                <Input
                  id="quiz-count"
                  type="number"
                  min="0"
                  value={quizForm.questionCount}
                  onChange={(event) => setQuizForm((prev) => ({ ...prev, questionCount: event.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-md border border-dashed border-border/60 bg-muted/30 px-4 py-3 md:col-span-2">
                <div>
                  <p className="text-sm font-semibold">Timed assessment</p>
                  <p className="text-xs text-muted-foreground">Mark whether the quiz is time-bound for proctoring.</p>
                </div>
                <Switch
                  id="quiz-timed"
                  checked={quizForm.isTimed}
                  onCheckedChange={(checked) => setQuizForm((prev) => ({ ...prev, isTimed: checked }))}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="quiz-instructions">Editor instructions</Label>
                <Textarea
                  id="quiz-instructions"
                  value={quizForm.instructions}
                  onChange={(event) => setQuizForm((prev) => ({ ...prev, instructions: event.target.value }))}
                  rows={3}
                  placeholder="Link to question bank or proctoring rules"
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingQuiz}>
                {savingQuiz ? "Saving…" : "Create quiz"}
              </Button>
            </form>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Existing quizzes</p>
              <div className="grid gap-2">
                {quizzes.length ? (
                  quizzes.map((quiz) => (
                    <div
                      key={quiz.id ?? quiz.title}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {quiz.courseTitle} · {quiz.section || "General"} · {quiz.questionCount ?? 0} questions
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={updatingQuizId === quiz.id}
                          onClick={() => handleQuizStatusChange(quiz.id as string, quiz.status === "live" ? "archived" : "live")}
                        >
                          {quiz.status === "live" ? "Mark archived" : "Mark live"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          disabled={updatingQuizId === quiz.id}
                          onClick={() => handleQuizDelete(quiz.id as string)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No quizzes yet.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publish announcement</CardTitle>
            <CardDescription>Push updates to every authenticated student.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleAnnouncementSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="announcement-title">Title</Label>
                <Input
                  id="announcement-title"
                  value={announcementForm.title}
                  onChange={(event) => setAnnouncementForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="announcement-audience">Audience</Label>
                <Input
                  id="announcement-audience"
                  value={announcementForm.audience}
                  onChange={(event) => setAnnouncementForm((prev) => ({ ...prev, audience: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="announcement-body">Message</Label>
                <Textarea
                  id="announcement-body"
                  value={announcementForm.body}
                  onChange={(event) => setAnnouncementForm((prev) => ({ ...prev, body: event.target.value }))}
                  rows={4}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="announcement-date">Publish date</Label>
                <Input
                  id="announcement-date"
                  type="date"
                  value={announcementForm.publishedAt}
                  onChange={(event) => setAnnouncementForm((prev) => ({ ...prev, publishedAt: event.target.value }))}
                />
              </div>
              <Button type="submit" disabled={savingAnnouncement}>
                {savingAnnouncement ? "Publishing…" : "Publish"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exams & certifications</CardTitle>
            <CardDescription>Prep assessments that unlock certificates.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={handleExamSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="exam-title">Title</Label>
                <Input
                  id="exam-title"
                  value={examForm.title}
                  onChange={(event) => setExamForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="exam-course">Course</Label>
                <Input
                  id="exam-course"
                  value={examForm.courseTitle}
                  onChange={(event) => setExamForm((prev) => ({ ...prev, courseTitle: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="exam-status">Status</Label>
                <Input
                  id="exam-status"
                  value={examForm.status}
                  onChange={(event) => setExamForm((prev) => ({ ...prev, status: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="exam-date">Available on</Label>
                <Input
                  id="exam-date"
                  type="date"
                  value={examForm.availableOn}
                  onChange={(event) => setExamForm((prev) => ({ ...prev, availableOn: event.target.value }))}
                />
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <input
                  id="exam-proctored"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={examForm.proctored}
                  onChange={(event) => setExamForm((prev) => ({ ...prev, proctored: event.target.checked }))}
                />
                <Label htmlFor="exam-proctored">Proctored assessment</Label>
              </div>
              <Button type="submit" className="md:col-span-2" disabled={savingExam}>
                {savingExam ? "Saving…" : "Create assessment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create teacher account</CardTitle>
            <CardDescription>Log internal instructors so you can provision access later.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-3" onSubmit={handleTeacherSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="teacher-name">Full name</Label>
                <Input
                  id="teacher-name"
                  value={teacherForm.fullName}
                  onChange={(event) => setTeacherForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="teacher-email">Email</Label>
                <Input
                  id="teacher-email"
                  type="email"
                  value={teacherForm.email}
                  onChange={(event) => setTeacherForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="teacher-specialty">Specialty</Label>
                <Input
                  id="teacher-specialty"
                  value={teacherForm.specialty}
                  onChange={(event) => setTeacherForm((prev) => ({ ...prev, specialty: event.target.value }))}
                />
              </div>
              <Button type="submit" className="md:col-span-3" disabled={savingTeacher}>
                {savingTeacher ? "Saving…" : "Create teacher profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What students will see</CardTitle>
          <CardDescription>Every item you create here is consumed by the student dashboard immediately.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <div>
              <p className="font-semibold text-foreground">Courses</p>
              <p>{courses.length ? courses.map((course) => course.title).join(", ") : "No courses yet."}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Live sessions</p>
              <p>{sessions.length ? sessions.map((session) => session.title).join(", ") : "No sessions scheduled."}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Resources</p>
              <p>{resources.length ? resources.map((resource) => resource.title).join(", ") : "No resources uploaded."}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Announcements</p>
              <p>
                {announcements.length
                  ? announcements.map((announcement) => announcement.title).join(", ")
                  : "No announcements yet."}
              </p>
            </div>
          </div>
          <Alert>
            <AlertDescription>
              Need to revoke access or update roles? Use the Firestore <Badge>users</Badge> collection and toggle the <code>role</code>
              field between <strong>user</strong> and <strong>admin</strong>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

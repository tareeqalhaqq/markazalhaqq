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
import { useToast } from "@/hooks/use-toast"
import { useUserRole } from "@/hooks/useUserRole"
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection"
import {
  createAnnouncement,
  createCourse,
  createExamOrCertification,
  createLiveSession,
  createResource,
  createTeacherProfile,
  type AcademyCourse,
  type Announcement,
  type ExamOrCertification,
  type LiveSession,
  type ResourceLibraryItem,
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

  const [savingCourse, setSavingCourse] = useState(false)
  const [savingSession, setSavingSession] = useState(false)
  const [savingResource, setSavingResource] = useState(false)
  const [savingAnnouncement, setSavingAnnouncement] = useState(false)
  const [savingExam, setSavingExam] = useState(false)
  const [savingTeacher, setSavingTeacher] = useState(false)

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.replace("/dashboard")
    }
  }, [loading, role, router, user])

  const overview = useMemo(
    () => [
      { label: "Courses", value: courses.length },
      { label: "Live sessions", value: sessions.length },
      { label: "Resources", value: resources.length },
      { label: "Announcements", value: announcements.length },
      { label: "Assessments", value: exams.length },
    ],
    [announcements.length, courses.length, exams.length, resources.length, sessions.length],
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

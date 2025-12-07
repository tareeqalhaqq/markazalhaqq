import { notFound } from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  FileAudio,
  Flame,
  Megaphone,
  PenLine,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  date: string;
  summary: string;
};

type DiscussionThread = {
  id: string;
  title: string;
  replies: number;
  lastActivity: string;
  status: "active" | "archived";
};

type Lesson = {
  id: string;
  title: string;
  status: "Published" | "Ready" | "Draft";
  releaseDate?: string;
  duration?: string;
  hasRecording: boolean;
  focus: string;
};

type UploadSlot = {
  id: string;
  title: string;
  type: string;
  size: string;
  status: "Uploaded" | "Processing" | "Awaiting";
};

type QuizBlueprint = {
  id: string;
  title: string;
  questions: number;
  availability: string;
  passingScore: number;
  focus: string;
};

type CommentThread = {
  id: string;
  author: string;
  role: "Student" | "Instructor" | "Mentor";
  timeAgo: string;
  message: string;
  replies?: CommentThread[];
};

type CustomisationTool = {
  id: string;
  title: string;
  description: string;
  helper: string;
};

type Workspace = {
  slug: string;
  title: string;
  tagline: string;
  instructor: string;
  cohort: string;
  level: string;
  nextSync: { label: string; date: string };
  stats: { label: string; value: string }[];
  announcements: Announcement[];
  threads: DiscussionThread[];
  lessons: Lesson[];
  uploads: UploadSlot[];
  quizzes: QuizBlueprint[];
  comments: CommentThread[];
  customisation: CustomisationTool[];
};

const workspaceCatalog: Record<string, Workspace> = {
  "aurjuzah-al-miyyah-immersive": {
    slug: "aurjuzah-al-miyyah-immersive",
    title: "Aurjuzah Al-Miyyah Immersive",
    tagline: "Full instructor control over memorisation pacing, reflections, and accountability circles.",
    instructor: "Shaykh Musa",
    cohort: "Spring 2024",
    level: "Intermediate",
    nextSync: { label: "Next live cohort sync", date: "April 21 · 7:00 PM GMT" },
    stats: [
      { label: "Active learners", value: "128" },
      { label: "Lessons published", value: "8" },
      { label: "Quizzes live", value: "3" },
    ],
    announcements: [
      {
        id: "announcement-1",
        title: "Upload your reflective journal before the weekend",
        date: "Apr 18, 2024",
        summary: "Remind students to submit the Makkan era reflections so you can weave responses into the next session.",
      },
      {
        id: "announcement-2",
        title: "Office hours slot added",
        date: "Apr 16, 2024",
        summary: "A new Wednesday Q&A has been scheduled to accommodate Americas-based students.",
      },
    ],
    threads: [
      {
        id: "thread-1",
        title: "Lesson 5: Migration reflections",
        replies: 42,
        lastActivity: "2h ago",
        status: "active",
      },
      {
        id: "thread-2",
        title: "Supplementary reading requests",
        replies: 18,
        lastActivity: "6h ago",
        status: "active",
      },
      {
        id: "thread-3",
        title: "Makkan era quiz feedback",
        replies: 9,
        lastActivity: "1d ago",
        status: "archived",
      },
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Early life of the Messenger ﷺ",
        status: "Published",
        releaseDate: "Apr 5",
        duration: "54:21",
        hasRecording: true,
        focus: "Identity, family, and formative character traits.",
      },
      {
        id: "lesson-2",
        title: "The first revelations",
        status: "Published",
        releaseDate: "Apr 8",
        duration: "48:13",
        hasRecording: true,
        focus: "Chronology of revelation and early da'wah methodology.",
      },
      {
        id: "lesson-3",
        title: "Persecution in Makkah",
        status: "Ready",
        releaseDate: "Apr 19",
        duration: "—",
        hasRecording: false,
        focus: "Lessons in resilience, sabr, and community safeguarding.",
      },
      {
        id: "lesson-4",
        title: "The Hijrah masterclass",
        status: "Draft",
        duration: "—",
        hasRecording: false,
        focus: "Curate travel maps, companions, and virtues of migration.",
      },
    ],
    uploads: [
      {
        id: "upload-1",
        title: "Lesson 3 replay",
        type: "Video",
        size: "1.8 GB",
        status: "Processing",
      },
      {
        id: "upload-2",
        title: "Makkan era slides",
        type: "PDF",
        size: "12 MB",
        status: "Uploaded",
      },
      {
        id: "upload-3",
        title: "Reflection prompts",
        type: "Doc",
        size: "320 KB",
        status: "Awaiting",
      },
    ],
    quizzes: [
      {
        id: "quiz-1",
        title: "Makkan Era Comprehension",
        questions: 8,
        availability: "Opens Apr 20",
        passingScore: 80,
        focus: "Chronology, themes, and key personalities.",
      },
      {
        id: "quiz-2",
        title: "Hijrah Analytical Essay",
        questions: 3,
        availability: "Drafting",
        passingScore: 75,
        focus: "Synthesize political, social, and spiritual lessons.",
      },
    ],
    comments: [
      {
        id: "comment-1",
        author: "Aisha",
        role: "Student",
        timeAgo: "1h ago",
        message: "I struggled to connect the migration routes with today's map. Could we add a visual overlay?",
        replies: [
          {
            id: "reply-1",
            author: "Shaykh Musa",
            role: "Instructor",
            timeAgo: "45m ago",
            message: "Great note. Uploading an annotated map tonight so the cohort can revisit before the quiz.",
          },
        ],
      },
      {
        id: "comment-2",
        author: "Yusuf",
        role: "Student",
        timeAgo: "3h ago",
        message: "Any recommendations for seerah poetry to memorise alongside Aurjuzah Al-Miyyah?",
      },
    ],
    customisation: [
      {
        id: "custom-1",
        title: "Define lesson outcomes",
        description: "List the competencies students should demonstrate before the next live circle.",
        helper: "E.g. 'Summarise the first revelation and articulate three key lessons'.",
      },
      {
        id: "custom-2",
        title: "Curate reflective practice",
        description: "Attach journal prompts, du'a goals, or service projects that reinforce the lesson.",
        helper: "Students can submit written or audio reflections directly to this workspace.",
      },
      {
        id: "custom-3",
        title: "Assign cohort mentors",
        description: "Tag mentors responsible for moderating discussions and nudging completion.",
        helper: "Mentors receive weekly digest emails with learners who need follow-up.",
      },
    ],
  },
};

const sharedWorkspaceExtensions: Record<string, Partial<Workspace>> = {
  "foundations-of-aqidah": {
    title: "Foundations of Aqidah",
    tagline: "Guide students through creed essentials with structured discussions and contextualised case studies.",
    instructor: "Ustadha Zaynab",
    cohort: "Summer 2024",
    level: "Beginner",
    stats: [
      { label: "Active learners", value: "96" },
      { label: "Lessons published", value: "6" },
      { label: "Quizzes live", value: "2" },
    ],
  },
  "fiqh-of-worship": {
    title: "Fiqh of Worship & Daily Living",
    tagline: "Customise modules on taharah, salah, zakah, and transactions with madhhab-aware guidance.",
    instructor: "Shaykh Idris",
    cohort: "Ramadan Intensive",
    level: "Intermediate",
    stats: [
      { label: "Active learners", value: "84" },
      { label: "Lessons published", value: "9" },
      { label: "Quizzes live", value: "4" },
    ],
  },
  "arabic-for-sacred-texts": {
    title: "Arabic for Sacred Texts",
    tagline: "Blend tajwid labs, grammar journeys, and vocabulary sprints in one instructor console.",
    instructor: "Ustadh Kareem",
    cohort: "Open enrolment",
    level: "All levels",
    stats: [
      { label: "Active learners", value: "210" },
      { label: "Lessons published", value: "12" },
      { label: "Quizzes live", value: "5" },
    ],
  },
};

export const dynamic = "force-static";

export function generateStaticParams() {
  const catalogSlugs = Object.keys(workspaceCatalog);
  const sharedSlugs = Object.keys(sharedWorkspaceExtensions);
  const uniqueSlugs = Array.from(new Set([...catalogSlugs, ...sharedSlugs]));

  return uniqueSlugs.map((slug) => ({ slug }));
}

function getWorkspace(slug: string): Workspace | null {
  if (workspaceCatalog[slug]) {
    return workspaceCatalog[slug];
  }

  if (sharedWorkspaceExtensions[slug]) {
    return {
      ...workspaceCatalog["aurjuzah-al-miyyah-immersive"],
      ...sharedWorkspaceExtensions[slug],
      slug,
    };
  }

  return null;
}

function CommentThreadView({ comment, depth = 0 }: { comment: CommentThread; depth?: number }) {
  return (
    <div key={comment.id} className={cn("rounded-2xl border border-border/60 bg-white/70 p-4", depth > 0 && "ml-6 mt-4")}>        
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="rounded-full border-primary/40 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-primary">
          {comment.role}
        </Badge>
        <p className="text-sm font-semibold text-foreground">{comment.author}</p>
        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{comment.message}</p>
      {comment.replies?.map((reply) => (
        <CommentThreadView key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function CourseWorkspacePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const workspace = getWorkspace(slug);

  if (!workspace) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-secondary/20 to-primary/10" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-6">
              <Badge className="rounded-full border border-primary/20 bg-primary/10 px-5 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
                Instructor workspace
              </Badge>
              <div>
                <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {workspace.title}
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{workspace.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1">
                  <Users className="h-4 w-4 text-primary" />
                  {workspace.instructor}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1">
                  <Flame className="h-4 w-4 text-secondary" />
                  {workspace.level}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  {workspace.cohort}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="secondary" className="rounded-full px-6">
                  <Link href="/courses">Back to catalog</Link>
                </Button>
                <Button className="rounded-full px-6">
                  Save workspace changes
                </Button>
                <Button variant="outline" className="rounded-full px-6">
                  Preview student view
                </Button>
              </div>
            </div>
            <Card className="mt-10 w-full max-w-sm border border-muted bg-white/80 shadow-lg shadow-primary/5 md:mt-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  {workspace.nextSync.label}
                </CardTitle>
                <CardDescription className="text-xl font-semibold text-foreground">{workspace.nextSync.date}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {workspace.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <Tabs defaultValue="overview" className="space-y-10">
          <TabsList className="flex flex-wrap gap-3 rounded-full border border-border/60 bg-white/60 p-2">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="lessons" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Lessons & uploads
            </TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="discussions" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Discussions
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Comments & Q&A
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                    <Sparkles className="h-5 w-5 text-primary" /> Lesson customisation studio
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Build tailored lesson pathways, set outcomes, and map how the cohort engages between sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {workspace.customisation.map((tool) => (
                    <div key={tool.id} className="rounded-2xl border border-border/60 bg-white/70 p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{tool.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full px-4">
                          Configure
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">{tool.helper}</p>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
                    <p className="font-semibold text-primary">Need a bespoke template?</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clone from an existing course or import lesson plans from Google Docs, Notion, or Markdown.
                    </p>
                    <Button variant="secondary" className="mt-4 rounded-full px-6">
                      Launch template wizard
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Rapid actions</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Pin quick tasks, schedule office hours, or share micro-updates with the cohort.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full rounded-full" variant="secondary">
                    <Megaphone className="mr-2 h-4 w-4" /> Post quick announcement
                  </Button>
                  <Button className="w-full rounded-full" variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Upload lesson resources
                  </Button>
                  <Button className="w-full rounded-full">
                    <ClipboardList className="mr-2 h-4 w-4" /> Build new quiz draft
                  </Button>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Tip: Actions sync instantly with the Talib al Ilm programme so learners on the all-access plan see updates.
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons">
            <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Lesson timeline</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Reorder lessons, publish recordings, and control release pacing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workspace.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="grid gap-3 rounded-2xl border border-border/70 bg-white/70 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-sm font-semibold text-foreground">{lesson.title}</h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.3em]",
                              lesson.status === "Published" && "border-emerald-400/60 text-emerald-600",
                              lesson.status === "Ready" && "border-amber-300/70 text-amber-500",
                              lesson.status === "Draft" && "border-slate-300 text-muted-foreground",
                            )}
                          >
                            {lesson.status}
                          </Badge>
                          {lesson.hasRecording ? (
                            <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-primary">
                              Recording posted
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="rounded-full border-dashed px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                              Awaiting replay
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{lesson.focus}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          {lesson.releaseDate && <span>Release: {lesson.releaseDate}</span>}
                          {lesson.duration && lesson.duration !== "—" && <span>Duration: {lesson.duration}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-full px-4">
                          <PenLine className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button size="sm" className="rounded-full px-4">
                          Publish
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-8">
                <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Upload centre</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Drop lesson recordings or supporting files to share instantly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
                      <FileAudio className="h-10 w-10 text-primary" />
                      <p className="mt-3 font-semibold text-foreground">Upload recording</p>
                      <p className="mt-2 text-sm text-muted-foreground">Drag & drop a file or browse your computer.</p>
                      <Button variant="secondary" className="mt-4 rounded-full px-6">
                        Select file
                      </Button>
                    </div>
                    <div className="space-y-3 text-sm">
                      {workspace.uploads.map((upload) => (
                        <div key={upload.id} className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{upload.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {upload.type} • {upload.size}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.3em]",
                                upload.status === "Uploaded" && "border-emerald-400/60 text-emerald-600",
                                upload.status === "Processing" && "border-amber-300/70 text-amber-500",
                                upload.status === "Awaiting" && "border-slate-300 text-muted-foreground",
                              )}
                            >
                              {upload.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Create micro-lesson</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Package a short lesson with a replay, worksheet, and reflective prompt.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="micro-lesson-title">Lesson title</Label>
                      <Input id="micro-lesson-title" placeholder="E.g. Principles of patience in Makkan period" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="micro-lesson-description">Guiding focus</Label>
                      <Textarea id="micro-lesson-description" rows={3} placeholder="Outline the key outcomes or reflection prompts for this micro-lesson." />
                    </div>
                    <Button className="w-full rounded-full">Save micro-lesson draft</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements">
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Recent announcements</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Keep learners aligned with cohort logistics and new uploads.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workspace.announcements.map((announcement) => (
                    <div key={announcement.id} className="rounded-2xl border border-border/70 bg-white/70 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{announcement.title}</h3>
                        <span className="text-xs text-muted-foreground">{announcement.date}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{announcement.summary}</p>
                      <div className="mt-4 flex gap-3">
                        <Button size="sm" variant="outline" className="rounded-full px-4">
                          Edit
                        </Button>
                        <Button size="sm" className="rounded-full px-4">
                          Publish to cohort
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Draft new announcement</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Announcements reach course enrollees and Talib al Ilm learners automatically.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcement-title">Headline</Label>
                    <Input id="announcement-title" placeholder="E.g. Quiz unlock schedule" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="announcement-body">Message</Label>
                    <Textarea id="announcement-body" rows={4} placeholder="Share logistics, reminders, or resources for your cohort." />
                  </div>
                  <Button className="w-full rounded-full">Queue announcement</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Discussion threads</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Moderate, archive, or reopen threads to keep the learning space vibrant.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workspace.threads.map((thread) => (
                    <div key={thread.id} className="rounded-2xl border border-border/70 bg-white/70 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{thread.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{thread.replies} replies • {thread.lastActivity}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.3em]",
                            thread.status === "active" ? "border-emerald-400/60 text-emerald-600" : "border-slate-300 text-muted-foreground",
                          )}
                        >
                          {thread.status}
                        </Badge>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button size="sm" className="rounded-full px-4">
                          Join discussion
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full px-4">
                          Archive
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Launch a new discussion</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Seed prompts to cultivate peer learning, reflection, and Q&A.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discussion-title">Topic</Label>
                    <Input id="discussion-title" placeholder="E.g. Lessons from the Year of Sorrow" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discussion-body">Guiding question</Label>
                    <Textarea id="discussion-body" rows={3} placeholder="Offer a reflective prompt or framing question for your cohort." />
                  </div>
                  <Button className="w-full rounded-full">Publish thread</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Quiz builder</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Create assessments, adjust passing thresholds, and align question pools with each lesson.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {workspace.quizzes.map((quiz) => (
                    <div key={quiz.id} className="rounded-2xl border border-border/70 bg-white/70 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">{quiz.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {quiz.questions} questions • Passing score {quiz.passingScore}% • {quiz.availability}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full px-4">
                          Manage
                        </Button>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{quiz.focus}</p>
                    </div>
                  ))}
                  <Separator className="border-dashed" />
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiz-title">New quiz title</Label>
                      <Input id="quiz-title" placeholder="E.g. Consolidation quiz: Makkan to Madinan transition" />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="quiz-questions">Number of questions</Label>
                        <Input id="quiz-questions" type="number" min={1} placeholder="10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quiz-passing">Passing score (%)</Label>
                        <Input id="quiz-passing" type="number" min={0} max={100} placeholder="75" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiz-focus">Focus</Label>
                      <Textarea id="quiz-focus" rows={3} placeholder="Outline key competencies, references, or text passages the quiz reinforces." />
                    </div>
                    <Button className="w-full rounded-full">Create quiz blueprint</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Question ideas</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Reuse or remix prompts from previous cohorts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[320px] pr-4">
                    <div className="space-y-4 text-sm">
                      <div className="rounded-2xl border border-border/70 bg-white/70 p-4">
                        <p className="font-semibold text-foreground">Timeline match-up</p>
                        <p className="mt-2 text-muted-foreground">Drag the key Makkan events into the correct chronological order.</p>
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-white/70 p-4">
                        <p className="font-semibold text-foreground">Short reflection</p>
                        <p className="mt-2 text-muted-foreground">Describe how the first revelation impacted the Messenger ﷺ inwardly and outwardly.</p>
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-white/70 p-4">
                        <p className="font-semibold text-foreground">Application case study</p>
                        <p className="mt-2 text-muted-foreground">A new Muslim faces persecution—outline prophetic guidance drawn from early seerah.</p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Comments & Q&A</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Respond to student questions, capture mentor follow-ups, and mark resolutions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[420px] pr-4">
                    <div className="space-y-4">
                      {workspace.comments.map((comment) => (
                        <CommentThreadView key={comment.id} comment={comment} />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="border border-muted bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Log an instructor response</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Address pressing questions and tag mentors for escalated support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="response-topic">Topic</Label>
                    <Input id="response-topic" placeholder="E.g. Clarifying Hijrah timeline" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="response-message">Response</Label>
                    <Textarea id="response-message" rows={4} placeholder="Craft a detailed answer or resource summary for the student." />
                  </div>
                  <Button className="w-full rounded-full">Post response</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="border-t border-border/60 bg-gradient-to-br from-white via-primary/10 to-secondary/20 py-16">
        <div className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
          <ArrowLeft className="h-5 w-5 text-primary" />
          <h2 className="max-w-3xl font-headline text-3xl font-semibold tracking-tight text-foreground">
            Invite your cohort into the Talib al Ilm programme for full-library access
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Learners on the Talib al Ilm plan unlock every course, quiz, and discussion space—including this workspace. Admins
            can slot your course into the appropriate level so seekers progress with clarity.
          </p>
          <Button asChild className="rounded-full px-6">
            <Link href="/talib-al-ilm">Explore Talib al Ilm programme</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

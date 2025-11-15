import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookCopy, GraduationCap, LayoutDashboard, Layers, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-section");
const classroomImage = PlaceHolderImages.find((img) => img.id === "course-1");

const stats = [
  { label: "Years serving seekers", value: "14+" },
  { label: "Core disciplines", value: "10" },
  { label: "Global students", value: "8k" },
];

const programTracks = [
  {
    title: "Tareeq Path",
    focus: "Spiritual refinement",
    description:
      "Cultivate presence through guided dhikr, prophetic character, and living mentorship that keeps your heart anchored.",
    outcomes: ["Curated adhkar frameworks", "Monthly spiritual circles", "Mentor accountability"],
  },
  {
    title: "Haqq Path",
    focus: "Sacred sciences",
    description:
      "Build literacy in aqidah, fiqh, tafsir, hadith, and seerah with sequenced lessons and instructor feedback.",
    outcomes: ["Structured syllabi", "Source texts & translations", "Weekly case-based labs"],
  },
];

const pillars = [
  {
    title: "Guided mentorship",
    description: "Live cohorts with teachers and assistants who know your goals and follow up on progress.",
    icon: Users,
  },
  {
    title: "Immersive curriculum",
    description: "Deep dives, recitations, and assessments that mirror the rhythm of in-person halaqat.",
    icon: Layers,
  },
  {
    title: "Living practice",
    description: "Assignments turn knowledge into service, devotion, and leadership within your community.",
    icon: Sparkles,
  },
];

const curriculum = [
  {
    title: "Foundations of Creed",
    description: "Clarify orthodox belief through classical primers with commentary and contemporary applications.",
  },
  {
    title: "Fiqh of Worship & Life",
    description: "Understand purification, salah, zakah, fasting, and personal transactions with depth and evidence.",
  },
  {
    title: "Seerah Intensives",
    description: "Walk line-by-line through the Prophetic biography drawing leadership and compassion lessons.",
  },
  {
    title: "Arabic & Recitation Labs",
    description: "Strengthen language, tajwid, and comprehension so you interact with the sources directly.",
  },
];

const experienceSteps = [
  {
    title: "Orientation & diagnostic",
    description: "Map your goals, meet mentors, and receive a guided plan tailored to your schedule and background.",
  },
  {
    title: "Weekly live learning",
    description: "Attend interactive lessons, small circles, and reflective assignments that reinforce retention.",
  },
  {
    title: "Applied service projects",
    description: "Translate knowledge into action through service briefs, leadership labs, and community partnerships.",
  },
  {
    title: "Certification & next steps",
    description: "Earn completion badges, receive feedback, and transition into advanced study or teaching support roles.",
  },
];

const testimonial = {
  quote:
    "The academy gave structure to my worship and my study. The mentorship felt like sitting with teachers in person—gentle, precise, and actionable.",
  name: "Former Tareeq & Haqq cohort participant",
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50/60 to-white" aria-hidden />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-white/70 via-white/40 to-transparent" aria-hidden />
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-center">
          <div className="space-y-8">
            <Badge className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Markaz al-Haqq Academy
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-3xl font-headline text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
                A modern learning experience rooted in classical scholarship
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Step into a curated academy inspired by sokacademy.com—elegant, accessible, and built for seekers who desire both beauty and rigour. Join pathways that weave mentorship, scholarship, and practice together.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-[0_28px_40px_-25px_rgba(99,102,241,0.5)]">
                <Link href="/signup">
                  Join the waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 px-8 py-6 text-base text-primary hover:bg-primary/10">
                <Link href="/courses">Browse courses</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-primary/20 bg-white/70 p-6 shadow-sm shadow-primary/10">
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={960}
                  height={640}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="h-full w-full object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="rounded-[3rem] bg-white p-10 shadow-xl shadow-primary/10 md:p-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="w-fit rounded-full bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
                Two signature tracks
              </Badge>
              <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">
                Choose the journey that aligns with your goals
              </h2>
              <p className="text-lg text-muted-foreground">
                Every cohort follows a modern, SOK-inspired learner experience while remaining grounded in our authentic isnad.
              </p>
              <Button asChild variant="ghost" className="rounded-full px-5 text-primary hover:bg-primary/10">
                <Link href="/about">Learn about the academy</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {programTracks.map((track) => (
                <Card key={track.title} className="h-full border border-muted bg-white/90 shadow-md">
                  <CardHeader>
                    <div className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{track.focus}</div>
                    <CardTitle className="mt-3 font-headline text-2xl text-foreground">{track.title}</CardTitle>
                    <CardDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {track.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {track.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                        {outcome}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" aria-hidden />
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              What defines the academy
            </Badge>
            <h2 className="mt-6 font-headline text-3xl font-semibold text-foreground sm:text-4xl">
              Crafted to feel like a boutique digital campus
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We redesigned every touchpoint to mirror the polish of sokacademy.com while preserving the soul of our tradition.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="border border-transparent bg-white/80 shadow-lg shadow-primary/5">
                <CardHeader className="space-y-6 text-center">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <pillar.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="font-headline text-xl text-foreground">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-primary/20 bg-white shadow-2xl">
            {classroomImage && (
              <Image
                src={classroomImage.imageUrl}
                alt={classroomImage.description}
                data-ai-hint={classroomImage.imageHint}
                width={900}
                height={640}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="space-y-6">
            <Badge className="rounded-full bg-secondary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
              Curriculum highlights
            </Badge>
            <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">
              A syllabus that progresses with you
            </h2>
            <p className="text-lg text-muted-foreground">
              Each module blends live teaching, guided readings, and applied projects so knowledge becomes a lived reality.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {curriculum.map((course) => (
                <Card key={course.title} className="border border-muted bg-white/90">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl text-foreground">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {course.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white via-primary/5 to-secondary/5" aria-hidden />
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Your learning flow
            </Badge>
            <h2 className="mt-6 font-headline text-3xl font-semibold text-foreground sm:text-4xl">
              Designed for momentum from day one
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {experienceSteps.map((step, index) => (
              <Card key={step.title} className="border border-white/60 bg-white/90 shadow-md">
                <CardHeader>
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Step {index + 1}</div>
                  <CardTitle className="mt-2 font-headline text-xl text-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid gap-12 rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-900 p-12 text-white md:grid-cols-[minmax(0,420px)_1fr] md:p-16">
          <div className="space-y-6">
            <Badge className="rounded-full bg-white/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
              Student reflections
            </Badge>
            <h2 className="font-headline text-3xl font-semibold text-white sm:text-4xl">
              "It felt like the digital campus I always wished existed."
            </h2>
            <p className="text-base text-slate-200">{testimonial.quote}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">{testimonial.name}</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-slate-100">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Access included</p>
                  <p className="text-lg font-semibold">Live classes & replays</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Resources</p>
                  <p className="text-lg font-semibold">Guided workbooks & dashboards</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <BookCopy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Certification</p>
                  <p className="text-lg font-semibold">Completion pathway for both tracks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="rounded-[3rem] border border-primary/20 bg-white/80 p-12 shadow-xl shadow-primary/5 md:p-16">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Ready to begin?
              </Badge>
              <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">
                Secure your place in the next cohort
              </h2>
              <p className="text-lg text-muted-foreground">
                Share your goals, receive tailored updates, and be the first to access the redesigned courses page built for multiple programmes.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-[0_28px_40px_-25px_rgba(79,70,229,0.45)]">
                <Link href="/signup">Join the waitlist</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 px-8 py-6 text-base text-primary hover:bg-primary/10">
                <Link href="/faq">View FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

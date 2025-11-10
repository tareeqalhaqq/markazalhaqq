import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  Compass,
  Layers,
  Sparkles,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-section");
const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image");

const featureCards = [
  {
    title: "Authentic scholarship",
    description:
      "Lessons are authored in collaboration with the teachers behind Tareeq Al-Haqq so that every module reflects the clarity and reverence you expect.",
    icon: BookOpenCheck,
  },
  {
    title: "Elegant learning experience",
    description:
      "An interface inspired by modern academies keeps your focus on what matters—structured tracks, intuitive progress, and purposeful reminders.",
    icon: Compass,
  },
  {
    title: "Community & mentorship",
    description:
      "Circle-based discussions, mentorship hours, and reflection prompts help you embody what you learn with sincere companionship.",
    icon: Users2,
  },
];

const programHighlights = [
  {
    title: "Foundations first",
    description:
      "Aqeedah, worship, and prophetic character sequenced for steady growth with guided reflections each week.",
    meta: "Phase 1",
  },
  {
    title: "Applied understanding",
    description:
      "Work through fiqh case studies, contemporary issues, and etiquette labs that translate knowledge into action.",
    meta: "Phase 2",
  },
  {
    title: "Scholarly depth",
    description:
      "Arabic intensives, tafsir circles, and instructor office hours open the door to classical texts with supervision.",
    meta: "Phase 3",
  },
];

const experienceMoments = [
  {
    title: "Weekly live review",
    description: "Join guided circles for Q&A, recaps, and spiritual reminders from our teaching team.",
    icon: CalendarCheck,
  },
  {
    title: "Interactive workbooks",
    description: "Downloadable study planners, assessments, and reflection prompts anchor each lesson.",
    icon: Layers,
  },
  {
    title: "Personal progress lens",
    description: "Track your learning arc with milestone badges and tailored course suggestions.",
    icon: Sparkles,
  },
];

const stats = [
  { value: "14+", label: "Structured study paths" },
  { value: "40+", label: "Hours of guided lessons" },
  { value: "Global", label: "Students across 5 continents" },
];

const testimonial = {
  quote:
    "MarkazalHaqq pairs the reverence of TareeqAlHaqq.org with a curated roadmap. The pacing, design, and mentorship keep me consistent week after week.",
  name: "Student of Knowledge beta participant",
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/80 via-primary/50 to-transparent opacity-70" aria-hidden />
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-white via-white/80 to-transparent" aria-hidden />
        <div className="absolute left-1/2 top-24 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/40 via-accent/40 to-transparent blur-3xl" aria-hidden />
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-8">
            <Badge className="w-fit rounded-full bg-white/80 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-primary shadow-[0_10px_40px_-28px] shadow-primary/50">
              Inspired by Rahmaniyyah
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-3xl font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A tranquil digital campus for sincere seekers of knowledge
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Drawing visual language from Rahmaniyyah.com and the reverence of TareeqAlHaqq.org, MarkazalHaqq ushers you into an oasis of guided study, soft gradients, and clear pathways to growth.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="px-8 py-6 text-base shadow-[0_25px_55px_-30px] shadow-primary/40">
                <Link href="/signup">
                  Start your program
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 bg-white/70 text-primary shadow-[0_18px_40px_-32px] shadow-primary/30 backdrop-blur">
                <Link href="/plans">See membership plans</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_28px_60px_-34px] shadow-primary/25 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/40 via-accent/50 to-transparent blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/80 p-5 shadow-2xl backdrop-blur">
              {heroImage && (
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    width={960}
                    height={640}
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              )}
              <div className="mt-6 space-y-3 rounded-2xl bg-accent/40 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Inside the learning experience</p>
                <ul className="space-y-2 text-sm text-primary/70">
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Weekly live circles with instructors</li>
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Downloadable outlines &amp; workbooks</li>
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Community reflections anchored in tradition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-br from-white via-accent/40 to-white" aria-hidden />
        <div className="container mx-auto px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Crafted for depth, delivered with calm
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every surface echoes the clean, airy aesthetic of Rahmaniyyah—allowing the knowledge to breathe while guiding you forward with clarity.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="h-full border border-border/70 bg-white/80 shadow-[0_32px_70px_-42px] shadow-primary/25 backdrop-blur">
                <CardHeader className="space-y-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/60 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div className="space-y-8">
            <Badge variant="outline" className="rounded-full border-accent/80 bg-white/80 text-primary">
              Student of Knowledge Program
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your pathway, illuminated step by step
            </h2>
            <p className="text-lg text-muted-foreground">
              Flow through gentle phases designed to nurture conviction, practice with confidence, and unlock deeper study with the calm focus of our new teal-accented experience.
            </p>
            <div className="grid gap-4">
              {programHighlights.map((highlight) => (
                <Card key={highlight.title} className="border border-border/70 bg-white/75 backdrop-blur">
                  <CardHeader className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.38em] text-primary/70">{highlight.meta}</p>
                    <CardTitle className="font-headline text-lg text-foreground">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {highlight.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card className="border border-border/80 bg-white/85 shadow-[0_40px_80px_-48px] shadow-primary/25 backdrop-blur">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="font-headline text-2xl text-foreground">Membership snapshot</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Immediate access to every course, live review, and upcoming release.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-2xl bg-accent/60 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-primary/80">Monthly access</p>
                <p className="mt-3 text-4xl font-semibold text-primary">$40</p>
                <p className="mt-1 text-sm text-primary/80">Cancel anytime. Scholarships available.</p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-white/80 p-5 text-left shadow-[0_20px_55px_-40px] shadow-primary/40">
                <p className="text-sm font-semibold text-primary">Annual commitment</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  $240 for a full year of guidance—equivalent to $20/month while your membership is active.
                </p>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/plans">Explore all plans</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-6 inset-y-0 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/90 via-primary/75 to-accent/70" aria-hidden />
        <div className="container mx-auto px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center">
            <div className="space-y-6 text-primary-foreground">
              <h2 className="font-headline text-3xl font-semibold sm:text-4xl">Every week anchored by lived guidance</h2>
              <p className="text-lg text-primary-foreground/90">
                More than videos—your subscription unlocks interactive sessions, reflective prompts, and consistent reminders to nurture action.
              </p>
              <div className="grid gap-5 sm:grid-cols-3">
                {experienceMoments.map((moment) => (
                  <Card key={moment.title} className="border-none bg-primary-foreground/10">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground">
                        <moment.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base text-primary-foreground">{moment.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-primary-foreground/80">
                        {moment.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-[2.75rem] border border-primary-foreground/30 bg-primary-foreground/10 p-8 text-primary-foreground shadow-[0_30px_70px_-45px] shadow-black/30">
              <Sparkles className="h-10 w-10" />
              <p className="text-lg leading-relaxed">“{testimonial.quote}”</p>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground/70">{testimonial.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
          <div className="space-y-7">
            <Badge variant="outline" className="rounded-full border-accent/80 bg-white/80 text-primary">
              About MarkazalHaqq
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The official academy of Tareeq Al-Haqq
            </h2>
            <p className="text-lg text-muted-foreground">
              We extend the sincerity of TareeqAlHaqq.org into an immersive environment where reverence and modern craft come together. Expect dependable scholarship and thoughtful design from the very first session.
            </p>
            <p className="text-lg text-muted-foreground">
              From introductory Aqeedah to advanced Arabic, each release is produced with our scholars so that your growth remains authentic and transformative.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-6">
                <Link href="/about">Discover our story</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full px-6 text-primary">
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {aboutImage && (
              <div className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/75 shadow-[0_36px_90px_-50px] shadow-primary/25 backdrop-blur">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  width={960}
                  height={640}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/30" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/85 via-primary/70 to-accent/65" aria-hidden />
        <div className="container mx-auto px-6 py-24 text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="font-headline text-3xl font-semibold sm:text-4xl">Begin your guided journey today</h2>
            <p className="text-lg text-primary-foreground/90">
              Enroll in the Student of Knowledge Program or explore individual courses built by the Tareeq Al-Haqq teaching team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary-foreground px-8 text-primary hover:bg-primary-foreground/90">
                <Link href="/signup">Create your account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground px-8 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


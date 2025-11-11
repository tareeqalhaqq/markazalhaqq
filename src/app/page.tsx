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

const studyPaths = [
  {
    name: "Tareeq Path",
    focus: "Self purification",
    description:
      "A guided tazkiyah journey that pairs reflective practices with live reminders so your heart softens alongside every lesson.",
  },
  {
    name: "Haqq Path",
    focus: "Grounded knowledge",
    description:
      "Structured modules covering aqeedah, fiqh, Arabic, and hadith—designed to build certainty and scholarly literacy step by step.",
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
        <div className="absolute inset-0 -z-30 bg-gradient-to-br from-background via-[#0b101d] to-[#111a2b]" aria-hidden />
        <div className="absolute inset-0 -z-20 calligraphy-overlay" aria-hidden />
        <div className="absolute left-1/3 top-16 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_hsla(37,78%,56%,0.18)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="absolute right-0 top-0 -z-10 h-[420px] w-[420px] translate-x-1/3 bg-[radial-gradient(circle_at_center,_hsla(197,52%,32%,0.22)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-8">
            <Badge className="w-fit rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-primary shadow-[0_10px_40px_-28px] shadow-black/60">
              Calligraphy inspired sanctuary
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-3xl font-headline text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl md:text-6xl">
                A tranquil digital campus inked for sincere seekers of knowledge
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Drawing on the reverent strokes of Islamic calligraphy, MarkazalHaqq ushers you into an evening-lit sanctuary of guided study, gentle gilded accents, and clear pathways to growth.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="px-8 py-6 text-base shadow-[0_25px_55px_-30px] shadow-black/50">
                <Link href="/signup">
                  Start your program
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 bg-card/60 text-primary shadow-[0_18px_40px_-32px] shadow-black/40 backdrop-blur">
                <Link href="/plans">See membership plans</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-[0_28px_60px_-34px] shadow-black/60 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-accent/30 to-transparent blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-border/70 bg-card/80 p-5 shadow-2xl backdrop-blur">
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
              <div className="mt-6 space-y-3 rounded-2xl border border-primary/30 bg-secondary/30 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Inside the learning experience</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
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
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0f172a] via-background to-[#111a2b]" aria-hidden />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-40" aria-hidden />
        <div className="container mx-auto px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Crafted for depth, delivered with calm
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every surface now glows with twilight gradients and subtle motifs—echoing manuscript margins while guiding you forward with clarity.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="h-full border border-border/60 bg-card/70 shadow-[0_32px_70px_-42px] shadow-black/50 backdrop-blur">
                <CardHeader className="space-y-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl text-primary">{feature.title}</CardTitle>
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

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0b121f] to-background" aria-hidden />
        <div className="absolute inset-0 -z-20 calligraphy-overlay opacity-30" aria-hidden />
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
          <div className="space-y-5">
            <Badge variant="outline" className="w-fit rounded-full border-primary/40 px-5 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-primary">
              Two curated paths
            </Badge>
            <h2 className="font-headline text-3xl font-semibold text-primary sm:text-4xl">Choose your rhythm of growth</h2>
            <p className="text-lg text-muted-foreground">
              The Student of Knowledge Program opens two complementary pathways. Tareeq centers the refinement of the heart, while Haqq immerses you in classical knowledge with clarity.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {studyPaths.map((path) => (
              <Card key={path.name} className="relative overflow-hidden border border-primary/30 bg-card/80 shadow-[0_28px_60px_-40px] shadow-black/50">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(37,78%,56%,0.16)_0%,_transparent_70%)] opacity-80" aria-hidden />
                <CardHeader className="relative space-y-2">
                  <CardTitle className="font-headline text-2xl text-primary">{path.name}</CardTitle>
                  <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">{path.focus}</p>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">{path.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div className="space-y-8">
            <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/5 text-primary">
              Student of Knowledge Program
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Your pathway, illuminated step by step
            </h2>
            <p className="text-lg text-muted-foreground">
              Flow through gentle phases designed to nurture conviction, practice with confidence, and unlock deeper study inside a candlelit, calligraphy-inspired interface.
            </p>
            <div className="grid gap-4">
              {programHighlights.map((highlight) => (
                <Card key={highlight.title} className="border border-border/60 bg-card/75 backdrop-blur">
                  <CardHeader className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.38em] text-primary">{highlight.meta}</p>
                    <CardTitle className="font-headline text-lg text-primary">{highlight.title}</CardTitle>
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
          <Card className="border border-border/70 bg-card/85 shadow-[0_40px_80px_-48px] shadow-black/50 backdrop-blur">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="font-headline text-2xl text-primary">Membership snapshot</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Immediate access to every course, live review, and upcoming release.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-primary/80">Monthly access</p>
                <p className="mt-3 text-4xl font-semibold text-primary">$40</p>
                <p className="mt-1 text-sm text-muted-foreground">Cancel anytime. Scholarships available.</p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-card/80 p-5 text-left shadow-[0_20px_55px_-40px] shadow-black/50">
                <p className="text-sm font-semibold text-primary">Annual commitment</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  $240 for a full year of guidance—equivalent to $20 per month while your membership is active.
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
        <div className="absolute inset-x-6 inset-y-0 -z-20 rounded-[3rem] bg-gradient-to-br from-[#0f1a2b] via-[#0b121f] to-[#162134]" aria-hidden />
        <div className="absolute inset-x-6 inset-y-0 -z-10 rounded-[3rem] calligraphy-overlay opacity-40" aria-hidden />
        <div className="container mx-auto px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center">
            <div className="space-y-6 text-primary-foreground">
              <h2 className="font-headline text-3xl font-semibold text-primary sm:text-4xl">Every week anchored by lived guidance</h2>
              <p className="text-lg text-primary-foreground/90">
                More than videos—your subscription unlocks interactive sessions, reflective prompts, and consistent reminders to nurture action.
              </p>
              <div className="grid gap-5 sm:grid-cols-3">
                {experienceMoments.map((moment) => (
                  <Card key={moment.title} className="border border-primary/30 bg-primary/10 text-primary-foreground">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/20 text-primary-foreground">
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
            <div className="space-y-6 rounded-[2.75rem] border border-primary/40 bg-primary/10 p-8 text-primary-foreground shadow-[0_30px_70px_-45px] shadow-black/50">
              <Sparkles className="h-10 w-10 text-primary" />
              <p className="text-lg leading-relaxed text-primary-foreground">“{testimonial.quote}”</p>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">{testimonial.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
          <div className="space-y-7">
            <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/5 text-primary">
              About MarkazalHaqq
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
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
              <div className="relative overflow-hidden rounded-[2.75rem] border border-border/70 bg-card/80 shadow-[0_36px_90px_-50px] shadow-black/50 backdrop-blur">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  width={960}
                  height={640}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-accent/25" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#101a2c] via-[#0f1729] to-[#142034]" aria-hidden />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-40" aria-hidden />
        <div className="container mx-auto px-6 py-24 text-center text-foreground">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="font-headline text-3xl font-semibold text-primary sm:text-4xl">Begin your guided journey today</h2>
            <p className="text-lg text-muted-foreground">
              Enroll in the Student of Knowledge Program or explore individual courses built by the Tareeq Al-Haqq teaching team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <Link href="/signup">Create your account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary px-8 text-primary hover:bg-primary/10">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


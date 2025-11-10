import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, Sparkles, Users2 } from "lucide-react";

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
      "Every lesson is vetted by the teachers behind Tareeq Al-Haqq and anchored in the Quran and Sunnah upon the way of the early generations.",
    icon: BookOpenCheck,
  },
  {
    title: "Structured learning paths",
    description:
      "Progress through foundations, intermediate, and advanced tracks with recommended pacing, quizzes, and live support.",
    icon: Compass,
  },
  {
    title: "Community & mentorship",
    description:
      "Connect inside moderated circles for reflection, accountability, and direct questions to our instructors.",
    icon: Users2,
  },
];

const programHighlights = [
  {
    title: "Guided curriculum",
    description:
      "Follow a cohesive roadmap that layers Aqeedah, Fiqh, Seerah, and more so you always know the next step in your studies.",
  },
  {
    title: "Live review touchpoints",
    description:
      "Weekly online meetups with the teaching team help you internalize lessons and ask questions in a safe environment.",
  },
  {
    title: "Resource library",
    description:
      "Downloadable notes, readings, and implementation guides keep you engaged between sessions.",
  },
];

const tracks = [
  {
    name: "Foundations Track",
    description: "Establish your Aqeedah, worship, and prophetic character with introductory courses designed for new students.",
  },
  {
    name: "Application Track",
    description: "Translate knowledge into practice through fiqh case studies, contemporary issues, and spiritual refinement.",
  },
  {
    name: "Scholarly Arabic Track",
    description: "Develop the language skills required to access classical works directly with guided Arabic and tafsir lessons.",
  },
];

const testimonial = {
  quote:
    "MarkazalHaqq has taken the clarity of TareeqAlHaqq.org and turned it into a guided journey. The structured paths and consistent reminders keep me progressing with ihsan.",
  name: "Student of Knowledge beta participant",
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden pt-16">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/90 via-white/95 to-sky-200/80" />
        <div className="relative"> 
          <div className="absolute -left-28 -top-32 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" aria-hidden />
          <div className="absolute -right-16 top-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl" aria-hidden />
        </div>
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
          <Badge className="mb-6 bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Official Tareeq Al-Haqq academy
          </Badge>
          <h1 className="max-w-4xl font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Guided learning for sincere seekers of knowledge
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            MarkazalHaqq extends the legacy of TareeqAlHaqq.org with curated curricula, live mentorship, and a community built for students of knowledge worldwide.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="px-7 shadow-lg shadow-primary/20">
              <Link href="/signup">
                Start your journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 bg-white/60 text-primary hover:bg-white"
            >
              <Link href="/plans">View plans</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/70 p-6 text-left shadow-lg shadow-sky-100 backdrop-blur">
              <p className="text-2xl font-bold text-primary">100% authentic</p>
              <p className="mt-1 text-sm text-muted-foreground">Grounded in Quran and Sunnah on the understanding of the Salaf.</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-6 text-left shadow-lg shadow-sky-100 backdrop-blur">
              <p className="text-2xl font-bold text-primary">Live connection</p>
              <p className="mt-1 text-sm text-muted-foreground">Weekly touchpoints and Q&A sessions with the Tareeq Al-Haqq team.</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-6 text-left shadow-lg shadow-sky-100 backdrop-blur">
              <p className="text-2xl font-bold text-primary">Worldwide access</p>
              <p className="mt-1 text-sm text-muted-foreground">Learn from anywhere with structured pacing and downloadable notes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A campus built around sincere study
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We designed MarkazalHaqq to feel like the digital equivalent of sitting with your teachers—organized, attentive, and spiritually uplifting.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card
                key={feature.title}
                className="h-full border-none bg-gradient-to-br from-white via-sky-50 to-white shadow-lg shadow-sky-100"
              >
                <CardHeader className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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

      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100 py-20">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[1.1fr_minmax(0,420px)] lg:items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary">
              Student of Knowledge Program
            </Badge>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One subscription. Complete access.
            </h2>
            <p className="text-lg text-muted-foreground">
              Built directly by the Tareeq Al-Haqq team, the Student of Knowledge Program brings every course, live review, and resource into one streamlined experience.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {programHighlights.map((highlight) => (
                <Card key={highlight.title} className="h-full border-none bg-white/70 shadow-md shadow-primary/10 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="font-headline text-base text-foreground">{highlight.title}</CardTitle>
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
          <Card className="border-none bg-white/80 shadow-2xl shadow-primary/15 backdrop-blur">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="font-headline text-2xl text-foreground">Subscription details</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Unlock every current and upcoming course the moment you join.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Monthly</p>
                <p className="text-4xl font-bold text-primary">$40</p>
                <p className="text-sm text-muted-foreground">per month • cancel anytime</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-4 text-left">
                <p className="text-sm font-semibold text-primary">Commit for the year</p>
                <p className="text-sm text-muted-foreground">
                  Pay $240 for 12 months of access — the equivalent of $20 per month while your membership remains active.
                </p>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/plans">See plan breakdown</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto grid gap-10 px-6 py-20 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary">Curriculum preview</Badge>
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">Designed around clear tracks</h2>
            <p className="text-lg text-muted-foreground">
              Choose the path that suits your level. Each track includes recorded modules, live reinforcement, and practical implementation guidance.
            </p>
            <Button asChild variant="ghost" className="px-0 text-primary">
              <Link href="/courses">
                Explore the course catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tracks.map((track) => (
              <Card key={track.name} className="h-full border-none bg-white/70 shadow-lg shadow-primary/10 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-headline text-lg text-foreground">{track.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">{track.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/90 via-sky-500/90 to-sky-300/80" />
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-3xl space-y-6 text-center text-primary-foreground">
            <Sparkles className="mx-auto h-10 w-10" />
            <p className="text-xl leading-relaxed">“{testimonial.quote}”</p>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">{testimonial.name}</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary">
              About MarkazalHaqq
            </Badge>
            <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
              The official academy of Tareeq Al-Haqq
            </h2>
            <p className="text-lg text-muted-foreground">
              Our team extends the work of TareeqAlHaqq.org into an immersive online space. Expect sincere teaching, dependable resources, and a focus on living what you learn.
            </p>
            <p className="text-lg text-muted-foreground">
              From introductory Aqeedah to advanced Arabic, each release is crafted in consultation with our scholars so that your path remains authentic and transformative.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/about">Discover our story</Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary">
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {aboutImage && (
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  width={960}
                  height={640}
                  sizes="(min-width: 1024px) 540px, 90vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/25" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-sky-500 to-sky-300" />
        <div className="container mx-auto px-6 py-20 text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="font-headline text-3xl font-bold sm:text-4xl">Ready to begin your structured journey?</h2>
            <p className="text-lg text-primary-foreground/90">
              Sign up to access the Student of Knowledge Program or browse individual courses crafted by the official Tareeq Al-Haqq teaching team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
                <Link href="/signup">Create account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


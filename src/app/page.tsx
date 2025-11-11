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
const seerahImage = PlaceHolderImages.find((img) => img.id === "course-2");
const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image");

const featureCards = [
  {
    title: "Line-by-line commentary",
    description:
      "Each verse of Al Aurjuzah Al Miyyah is unpacked with evidences from Qur'an and Sunnah so you grasp the Seerah with certainty.",
    icon: BookOpenCheck,
  },
  {
    title: "Context & timeline",
    description:
      "Maps, source notes, and key events place every moment of the Prophetic biography in its historical setting.",
    icon: Compass,
  },
  {
    title: "Memorisation support",
    description:
      "Dedicated review sheets, audio recitations, and coaching circles help you retain the 100-line poem with ease.",
    icon: Layers,
  },
];

const courseOutline = [
  {
    title: "Noble lineage to Prophethood",
    description:
      "Study verses 1-20 covering the Messenger's ﷺ lineage, birth, and the signs that announced his mission.",
    meta: "Module 1",
  },
  {
    title: "Revelation and migration",
    description:
      "Verses 21-60 detail the first revelation, early da'wah in Makkah, and the Hijrah that established Madinah.",
    meta: "Module 2",
  },
  {
    title: "Campaigns and final counsel",
    description:
      "Verses 61-100 review the key battles, Treaty of Hudaybiyyah, Farewell Pilgrimage, and the Prophet's ﷺ passing.",
    meta: "Module 3",
  },
];

const formatHighlights = [
  {
    title: "Weekly live sessions",
    description: "Attend twelve interactive lessons with time for Q&A and guided reflections.",
    icon: CalendarCheck,
  },
  {
    title: "Scholarly feedback",
    description: "Submit memorisation recordings and receive corrections from the teaching team.",
    icon: Users2,
  },
  {
    title: "Reflection assignments",
    description: "Short written prompts keep you applying the Prophetic lessons to your own context.",
    icon: Sparkles,
  },
];

const stats = [
  { value: "100 lines", label: "Poem by Ibn Abi Izz al-Hanafi" },
  { value: "12 weeks", label: "Structured Seerah journey" },
  { value: "Live Q&A", label: "Sessions every week" },
];

const testimonial = {
  quote:
    "The Seerah finally became a connected story for me. Memorising Al Aurjuzah Al Miyyah with guidance from Tareeq Al-Haqq grounded each event in my heart.",
  name: "Cohort 1 attendee",
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-30 bg-gradient-to-br from-sky-50 via-white to-sky-100" aria-hidden />
        <div className="absolute inset-0 -z-20 calligraphy-overlay opacity-25" aria-hidden />
        <div className="absolute left-1/3 top-12 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_hsla(201,100%,80%,0.45)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="absolute right-0 top-0 -z-10 h-[360px] w-[360px] translate-x-1/3 bg-[radial-gradient(circle_at_center,_hsla(199,90%,78%,0.4)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-8">
            <Badge className="w-fit rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
              Seerah course
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-3xl font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Study the Seerah through Al Aurjuzah Al Miyyah
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Join the official Tareeq Al-Haqq classroom for the celebrated 100-line poem by Ibn Abi Izz al-Hanafi. Guided commentary, memorisation support, and weekly live access help you connect to the Prophetic biography with clarity.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="px-8 py-6 text-base shadow-[0_25px_55px_-30px] shadow-primary/40">
                <Link href="/signup">
                  Enrol now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 bg-card/60 text-primary hover:bg-primary/10">
                <Link href="/courses">View course details</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-lg shadow-sky-100 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-accent/30 to-transparent blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-border/40 bg-card/90 p-5 shadow-2xl shadow-sky-200 backdrop-blur">
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
              <div className="mt-6 space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Inside the learning experience</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Weekly live commentary with Q&amp;A</li>
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Annotated slides and source references</li>
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Memorisation circles for every section</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-sky-50/60 to-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What you will gain inside the course
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every component of MarkazalHaqq's Seerah offering is built for clarity, reverence, and steady progress—mirroring the trusted presentation of Rahmaniyyah.com and TareeqAlHaqq.org.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="h-full border border-primary/10 bg-white/90 shadow-lg shadow-sky-100">
                <CardHeader className="space-y-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
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
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-center">
          <div className="space-y-5">
            <Badge variant="outline" className="w-fit rounded-full border-primary/30 bg-primary/5 px-5 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-primary">
              About the text
            </Badge>
            <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">Al Aurjuzah Al Miyyah by Ibn Abi Izz al-Hanafi</h2>
            <p className="text-lg text-muted-foreground">
              This poetic synopsis of the Prophetic biography condenses the Seerah into one hundred lines. Our course maintains the traditional cadence while providing clear explanations in English and Arabic.
            </p>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />Authentic text with graded isnad readings and reliable translations.</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />Memorisation trackers and vocabulary glossaries for every set of lines.</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />Historical notes that connect key events from the Seerah to lived lessons today.</li>
            </ul>
          </div>
          <div className="relative">
            {seerahImage && (
              <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-white/80 shadow-xl shadow-sky-100">
                <Image
                  src={seerahImage.imageUrl}
                  alt={seerahImage.description}
                  data-ai-hint={seerahImage.imageHint}
                  width={960}
                  height={640}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100 py-24">
        <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div className="space-y-8">
            <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary">
              Course outline
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Follow the Seerah week by week
            </h2>
            <p className="text-lg text-muted-foreground">
              Twelve weeks are grouped into three modules. Each gathering covers the Arabic text, reliable commentary, and practical takeaways for your daily life.
            </p>
            <div className="grid gap-4">
              {courseOutline.map((highlight) => (
                <Card key={highlight.title} className="border border-primary/15 bg-white/90 shadow-md shadow-sky-100">
                  <CardHeader className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.38em] text-primary">{highlight.meta}</p>
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
          <Card className="overflow-hidden border border-primary/20 bg-white/90 shadow-xl shadow-sky-100">
            <CardHeader className="space-y-4 border-b border-primary/10 bg-primary/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Course cadence</p>
              <CardTitle className="font-headline text-2xl text-foreground">Live Seerah immersion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="rounded-2xl border border-primary/15 bg-white/80 p-5">
                <p className="text-sm font-semibold text-primary">Weekly schedule</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Saturdays at 7PM GMT with replay access within 24 hours.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/80 p-5">
                <p className="text-sm font-semibold text-primary">Course materials</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Downloadable Arabic text, English translation, and commentary notes for each lesson.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-white/80 p-5">
                <p className="text-sm font-semibold text-primary">Community space</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dedicated forum for discussion, memorisation check-ins, and instructor updates.
                </p>
              </div>
            </CardContent>
            <CardContent className="border-t border-primary/10 bg-primary/5 p-8">
              <div className="rounded-2xl border border-primary/15 bg-white/90 p-5 text-left">
                <p className="text-sm font-semibold text-primary">Next cohort</p>
                <p className="mt-1 text-sm text-muted-foreground">Begins soon · register to secure your seat</p>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-4xl font-semibold text-primary">$120</p>
                  <p className="text-sm text-muted-foreground">one-time access for the full 12-week course</p>
                </div>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/signup">Reserve your seat</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary">
              Learning format
            </Badge>
            <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">Every gathering stays interactive</h2>
            <p className="text-lg text-muted-foreground">
              Sessions blend live instruction, memorisation checks, and reflective prompts so the Prophetic biography shapes both knowledge and character.
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              {formatHighlights.map((moment) => (
                <Card key={moment.title} className="border border-primary/15 bg-white/90 shadow-sm shadow-sky-100">
                  <CardHeader className="space-y-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <moment.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base text-foreground">{moment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {moment.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6 rounded-[2.75rem] border border-primary/20 bg-white/90 p-8 shadow-xl shadow-sky-100">
            <Sparkles className="h-10 w-10 text-primary" />
            <p className="text-lg leading-relaxed text-foreground">“{testimonial.quote}”</p>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">{testimonial.name}</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-sky-50/60 to-white py-24">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
          <div className="space-y-7">
            <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary">
              About MarkazalHaqq
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The official academy of Tareeq Al-Haqq
            </h2>
            <p className="text-lg text-muted-foreground">
              The same clean typography and presentation you recognise from Rahmaniyyah.com and TareeqAlHaqq.org guides every page here. Our scholars oversee the full learning experience so the Seerah is delivered with ihsaan.
            </p>
            <p className="text-lg text-muted-foreground">
              This launch is dedicated entirely to the Seerah of the Messenger ﷺ through Al Aurjuzah Al Miyyah. Future offerings will follow the same standard once this cohort completes.
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
              <div className="relative overflow-hidden rounded-[2.75rem] border border-primary/15 bg-white/90 shadow-xl shadow-sky-100">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  width={960}
                  height={640}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-sky-50 via-white to-sky-100" aria-hidden />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-20" aria-hidden />
        <div className="container mx-auto px-6 py-24 text-center text-foreground">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">Begin your Seerah study today</h2>
            <p className="text-lg text-muted-foreground">
              Secure your place in the live commentary of Al Aurjuzah Al Miyyah and experience the Prophetic biography with trusted teachers.
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


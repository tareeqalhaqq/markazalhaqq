import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  Compass,
  Layers,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-section");
const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image");

const stats = [
  { value: "2 paths", label: "Tareeq & Haqq" },
  { value: "10+ disciplines", label: "Fiqh, Aqidah, Tafsir, Seerah" },
  { value: "Scholars-led", label: "Guided by licensed teachers" },
];

const features = [
  {
    title: "Verified scholarship",
    description: "Classes are sourced from established texts with isnad-linked teachers and peer review.",
    icon: ShieldCheck,
  },
  {
    title: "Structured mentorship",
    description: "Cohorts pair you with mentors to help implement lessons in worship, service, and daily rhythms.",
    icon: Users2,
  },
  {
    title: "Integrated practice",
    description: "Assignments and reflections nurture a living practice—bridging study, action, and remembrance.",
    icon: Sparkles,
  },
];

const tracks = [
  {
    id: "tareeq",
    name: "Tareeq Path",
    focus: "Spiritual cultivation",
    description:
      "A guided route for purifying the heart, sustaining dhikr, and embodying the etiquette of the seekers.",
    highlights: ["Purification of the heart", "Daily adhkar frameworks", "Companions' devotions and adab"],
  },
  {
    id: "haqq",
    name: "Haqq Path",
    focus: "Islamic sciences",
    description:
      "A disciplined curriculum covering the core sciences—clarifying creed, law, Qur'an, and Prophetic biography.",
    highlights: ["Foundations of creed (aqidah)", "Jurisprudence across worship and transactions", "Tafsir, hadith, and seerah studies"],
  },
];

const disciplineHighlights = [
  {
    title: "Fiqh",
    description: "Jurisprudence from relied-upon madhahib covering personal devotion and communal life.",
  },
  {
    title: "Aqidah",
    description: "Foundational creed texts affirming orthodox belief with precise explanation and evidences.",
  },
  {
    title: "Tafsir",
    description: "Surah intensives and thematic readings that connect Qur'anic guidance to lived realities.",
  },
  {
    title: "Seerah",
    description: "Chronological journeys through the Prophetic biography with contextual analysis and application.",
  },
  {
    title: "Hadith",
    description: "Selections from canonical collections emphasising practice, character, and transmission chains.",
  },
  {
    title: "Arabic",
    description: "Language labs to strengthen recitation, vocabulary, and comprehension of sacred texts.",
  },
];

const learningRhythms = [
  {
    title: "Guided live circles",
    description: "Weekly gatherings with space for Q&A, recitation, and directed spiritual counsel.",
    icon: CalendarCheck,
  },
  {
    title: "Mentorship cohorts",
    description: "Small-group check-ins ensure steady progress and provide personalised support.",
    icon: Users2,
  },
  {
    title: "Applied study labs",
    description: "Workshops and case studies translate principles of the deen into service and leadership.",
    icon: Layers,
  },
];

const communityPillars = [
  {
    title: "Scholars & teaching assistants",
    description: "Sessions are facilitated by scholars with ijazaat alongside trained assistants for continuity.",
    icon: BookOpenCheck,
  },
  {
    title: "Spiritual companionship",
    description: "Circles of dhikr, du'a gatherings, and monthly retreats nurture hearts in the Tareeq path.",
    icon: ScrollText,
  },
  {
    title: "Global access",
    description: "Digital classrooms connect seekers across time zones with replays and resource libraries.",
    icon: Compass,
  },
];

const testimonial = {
  quote:
    "The academy gave structure to my learning and my worship—the guidance was precise, compassionate, and actionable.",
  name: "Community member",
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" aria-hidden />
        <div className="absolute inset-0 -z-20 calligraphy-overlay opacity-25" aria-hidden />
        <div className="absolute left-1/3 top-14 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_hsla(201,100%,48%,0.35)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="absolute right-0 top-0 -z-10 h-[360px] w-[360px] translate-x-1/3 bg-[radial-gradient(circle_at_center,_hsla(199,84%,46%,0.32)_0%,_transparent_70%)] blur-3xl" aria-hidden />
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-8">
            <Badge className="w-fit rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
              Markaz al-Haqq Academy
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-3xl font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A hub for authentic Islamic knowledge
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Study with a community anchored in Prophetic guidance. Our academy unites seekers under two complementary paths—Tareeq for spiritual refinement and Haqq for the sacred sciences—delivered with reverence and clarity.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="px-8 py-6 text-base shadow-[0_25px_55px_-30px] shadow-primary/40">
                <Link href="#paths">
                  Explore the paths
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 bg-card/60 text-primary hover:bg-primary/10">
                <Link href="/courses">View courses</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-primary/20 bg-card/70 p-5 shadow-lg shadow-slate-900/50 backdrop-blur">
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/30 via-accent/20 to-transparent blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-border/60 bg-card/90 p-5 shadow-2xl shadow-slate-950/60 backdrop-blur">
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
              <div className="mt-6 space-y-3 rounded-2xl border border-primary/30 bg-background/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">What guides us</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Authentic sources with isnad-connected scholars.</li>
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Integration of worship, study, and service.</li>
                  <li className="flex items-start gap-3"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />Global classrooms with curated resources.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The academy experience
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every programme we deliver is rooted in scholarship, structured mentorship, and a culture of devotion.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full border border-primary/20 bg-card/80 shadow-lg shadow-slate-950/40">
                <CardHeader className="space-y-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
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

      <section id="paths" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" aria-hidden />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-[0.15]" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="rounded-full border-primary/40 bg-background/70 text-primary">
              The two paths
            </Badge>
            <h2 className="mt-6 font-headline text-3xl font-semibold text-foreground sm:text-4xl">
              Tareeq & Haqq in harmony
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose a path—or walk both—to balance inner refinement with rigorous study of the sacred sciences.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {tracks.map((track) => (
              <Card key={track.id} className="flex h-full flex-col border border-primary/25 bg-card/85 shadow-xl shadow-slate-950/40">
                <CardHeader className="space-y-3 border-b border-primary/20 bg-background/60 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{track.focus}</p>
                  <CardTitle className="font-headline text-2xl text-foreground">{track.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-6 p-6">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {track.description}
                  </CardDescription>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {track.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent className="border-t border-primary/20 bg-background/60 p-6">
                  <Button asChild variant="ghost" className="w-full rounded-full border border-primary/30 text-primary hover:bg-primary/10">
                    <Link href="/plans">See structure</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-center">
          <div className="space-y-5">
            <Badge variant="outline" className="w-fit rounded-full border-primary/40 bg-background/70 px-5 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-primary">
              Disciplines we cultivate
            </Badge>
            <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">Depth across the sacred sciences</h2>
            <p className="text-lg text-muted-foreground">
              Our curriculum spans the core Islamic sciences with dedicated modules, readings, and reflective practice assignments.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you begin in the Tareeq path or the Haqq path, you gain access to circles that strengthen faith, knowledge, and service.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {disciplineHighlights.map((discipline) => (
              <Card key={discipline.title} className="border border-primary/20 bg-card/75 shadow-md shadow-slate-950/30">
                <CardHeader className="space-y-1">
                  <CardTitle className="font-headline text-lg text-foreground">{discipline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {discipline.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24">
        <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div className="space-y-8">
            <Badge variant="outline" className="rounded-full border-primary/40 bg-background/70 text-primary">
              Learning rhythms
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built for consistency and transformation
            </h2>
            <p className="text-lg text-muted-foreground">
              The academy calendar combines live teaching, mentorship, and practice labs so you can absorb, implement, and share knowledge responsibly.
            </p>
            <div className="grid gap-4">
              {learningRhythms.map((moment) => (
                <Card key={moment.title} className="border border-primary/25 bg-card/80 shadow-md shadow-slate-950/50">
                  <CardHeader className="space-y-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
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
          <div className="space-y-6 rounded-[2.75rem] border border-primary/25 bg-card/85 p-8 shadow-xl shadow-slate-950/50">
            <Sparkles className="h-10 w-10 text-primary" />
            <p className="text-lg leading-relaxed text-foreground">“{testimonial.quote}”</p>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">{testimonial.name}</p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
          <div className="space-y-7">
            <Badge variant="outline" className="rounded-full border-primary/40 bg-background/70 text-primary">
              Community pillars
            </Badge>
            <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              An academy rooted in ihsan
            </h2>
            <p className="text-lg text-muted-foreground">
              Our educators and mentors prioritise sincerity, precision, and service—ensuring every class uplifts hearts and minds.
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              {communityPillars.map((pillar) => (
                <Card key={pillar.title} className="border border-primary/25 bg-card/80 shadow-sm shadow-slate-950/40">
                  <CardHeader className="space-y-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base text-foreground">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-6">
                <Link href="/about">Discover our ethos</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full px-6 text-primary">
                <Link href="/instructors">Meet the instructors</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {aboutImage && (
              <div className="relative overflow-hidden rounded-[2.75rem] border border-primary/25 bg-card/80 shadow-xl shadow-slate-950/50">
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
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" aria-hidden />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-[0.15]" aria-hidden />
        <div className="container mx-auto px-6 py-24 text-center text-foreground">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">Join the academy waitlist</h2>
            <p className="text-lg text-muted-foreground">
              Receive the next intake announcement for both Tareeq and Haqq paths, along with open study circles and resource releases.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <Link href="/signup">Join the waitlist</Link>
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

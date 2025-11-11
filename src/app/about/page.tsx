import Image from "next/image";
import { Sparkles, BookOpenCheck, Users2, HeartHandshake } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const aboutImage = PlaceHolderImages.find((img) => img.id === "about-us-image");

const pillars = [
  {
    title: "Authenticity",
    description:
      "Everything we publish is reviewed by the Tareeq Al-Haqq scholars to ensure alignment with the Quran and Sunnah upon the way of the Salaf.",
    icon: BookOpenCheck,
  },
  {
    title: "Community",
    description:
      "Our platforms include moderated spaces where students can encourage one another and seek clarification directly from trusted teachers.",
    icon: Users2,
  },
  {
    title: "Service",
    description:
      "MarkazalHaqq exists to serve the Ummah. Each course is designed to build clarity, character, and action in the lives of our learners.",
    icon: HeartHandshake,
  },
];

const milestones = [
  {
    year: "2010–2023",
    title: "The legacy of TareeqAlHaqq.org",
    description:
      "Hundreds of lessons, articles, and reminders were published for free, giving Muslims a trusted digital resource for authentic guidance.",
  },
  {
    year: "2023",
    title: "Identifying the need",
    description:
      "Students asked for structured study plans, live mentorship, and clear next steps beyond standalone lectures.",
  },
  {
    year: "2024",
    title: "Launching MarkazalHaqq",
    description:
      "We began building an academy that mirrors in-person circles—organized curricula, accountability, and direct access to our teachers.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-sky-200" />
        <div className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary">About MarkazalHaqq</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The official academy of Tareeq Al-Haqq
            </h1>
            <p className="text-lg text-muted-foreground">
              MarkazalHaqq extends the trust of TareeqAlHaqq.org into a guided learning experience. Our goal is to help sincere seekers progress with clarity, companionship, and action.
            </p>
            <p className="text-lg text-muted-foreground">
              We pair carefully sequenced curricula with live mentorship so every student feels supported—whether you are beginning your journey or deepening your scholarship.
            </p>
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

      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-6 font-headline text-3xl font-bold text-foreground sm:text-4xl">Why we launched MarkazalHaqq</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our community needed a place where sincere seekers could move beyond individual lectures and into a purposeful journey. MarkazalHaqq provides that structure while keeping the heart and authenticity of Tareeq Al-Haqq alive.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="h-full border-none bg-gradient-to-br from-white via-sky-50 to-white shadow-lg shadow-sky-100">
              <CardHeader className="space-y-4 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <pillar.icon className="h-6 w-6" />
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
      </section>

      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-6 py-20">
          <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">Our journey so far</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            MarkazalHaqq remains rooted in the mission of Tareeq Al-Haqq: cultivating clarity upon the path of the Salaf. Here is how our academy came to life.
          </p>
          <div className="mt-12 space-y-10">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative rounded-3xl bg-white/80 p-8 shadow-xl shadow-primary/10 backdrop-blur">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">{milestone.year}</p>
                    <h3 className="mt-2 font-headline text-2xl text-foreground">{milestone.title}</h3>
                  </div>
                  <Separator orientation="vertical" className="hidden h-16 bg-primary/10 sm:block" />
                  <p className="max-w-xl text-base text-muted-foreground">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && <div className="mt-8 h-px w-full bg-primary/10" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

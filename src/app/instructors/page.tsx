export const dynamic = 'force-dynamic'
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, BookOpenCheck, GraduationCap } from "lucide-react";

const instructorHighlights = [
  {
    title: "Connected to Tareeq Al-Haqq",
    description:
      "Our teaching team consists of scholars and students of knowledge who contribute directly to Tareeq Al-Haqq programs, events, and publications.",
    icon: Users2,
  },
  {
    title: "Verified credentials",
    description:
      "Each instructor is vetted for their ijazaat, methodology, and ability to communicate clearly while remaining rooted in the Quran and Sunnah.",
    icon: GraduationCap,
  },
  {
    title: "Mentorship-first teaching",
    description:
      "Expect live review sessions, feedback opportunities, and community engagement that keeps you supported between lessons.",
    icon: BookOpenCheck,
  },
];

export default function InstructorsPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-sky-200" />
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="bg-primary/10 text-primary">Teaching team</Badge>
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Guided by trusted instructors
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The detailed roster will be released as we launch each course. Every teacher is part of the Tareeq Al-Haqq network, ensuring consistency in creed, methodology, and character.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-6 pb-16 md:grid-cols-3">
        {instructorHighlights.map((highlight) => (
          <Card
            key={highlight.title}
            className="h-full border-none bg-gradient-to-br from-white via-sky-50 to-white shadow-lg shadow-primary/10"
          >
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <highlight.icon className="h-7 w-7" />
              </div>
              <CardTitle className="font-headline text-xl text-foreground">{highlight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                {highlight.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-white/80 p-10 text-center shadow-xl shadow-primary/15 backdrop-blur">
          <h2 className="font-headline text-3xl font-bold text-foreground">Instructor roster coming soon</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We will publish instructor bios and teaching schedules as we confirm the Seerah cohort timeline. Join the waitlist to receive the announcements first.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-8">
            <Link href="/signup">Join the waitlist</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

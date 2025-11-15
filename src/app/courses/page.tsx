import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courseCatalog = [
  {
    title: "Aurjuzah Al-Miyyah Immersive",
    category: "Seerah",
    level: "Intermediate",
    duration: "12 weeks",
    price: "$180",
    description:
      "Study the Prophetic biography through the famed 100-line poem with guided memorisation, recitations, and contextual lessons.",
    image: PlaceHolderImages.find((img) => img.id === "course-2"),
    details: ["Line-by-line commentary", "Audio library & memorisation pacing", "Weekly live Q&A"],
  },
  {
    title: "Foundations of Aqidah",
    category: "Aqidah",
    level: "Beginner",
    duration: "8 weeks",
    price: "$140",
    description:
      "Clarify creed through classical primers, contemporary case studies, and mentorship that addresses modern questions head-on.",
    image: PlaceHolderImages.find((img) => img.id === "course-3"),
    details: ["Guided text readings", "Scenario-based workshops", "Community forums"],
  },
  {
    title: "Fiqh of Worship & Daily Living",
    category: "Fiqh",
    level: "Intermediate",
    duration: "10 weeks",
    price: "$165",
    description:
      "Master purification, salah, zakah, fasting, and personal transactions with evidence-driven lessons and applied labs.",
    image: PlaceHolderImages.find((img) => img.id === "course-1"),
    details: ["Weekly case studies", "Comparative madhhab insights", "Accountability cohorts"],
  },
  {
    title: "Arabic for Sacred Texts",
    category: "Arabic",
    level: "All levels",
    duration: "Ongoing",
    price: "$45/mo",
    description:
      "Develop vocabulary, grammar, and recitation skills through live labs designed for seekers engaging the Qur'an and hadith.",
    image: PlaceHolderImages.find((img) => img.id === "course-4"),
    details: ["Live tajwid coaching", "Interactive workbooks", "Peer study circles"],
  },
];

const coursePillars = [
  {
    title: "Live cohorts & replays",
    description: "Every course includes live instruction with replay access so you can revisit the material anytime.",
  },
  {
    title: "Mentor follow-up",
    description: "Dedicated mentors keep you accountable, answer questions, and help you integrate lessons into your worship.",
  },
  {
    title: "Project-based learning",
    description: "Expect reflective journals, community briefs, and service projects that translate knowledge into action.",
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-purple-50/70 to-blue-50/60" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full border border-primary/20 bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Courses catalog
            </Badge>
            <h1 className="mt-6 font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Explore programmes built for every stage of your journey
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The redesigned courses page mirrors the polish of sokacademy.com and now scales to showcase multiple tracks. Filter, browse, and join the cohort that meets your goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="rounded-full border-primary/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-primary">
                Live cohorts
              </Badge>
              <Badge variant="outline" className="rounded-full border-primary/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-primary">
                On-demand resources
              </Badge>
              <Badge variant="outline" className="rounded-full border-primary/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-primary">
                Certification pathways
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {courseCatalog.map((course) => (
            <Card key={course.title} className="flex h-full flex-col overflow-hidden border border-muted bg-white/90 shadow-lg shadow-primary/5">
              {course.image && (
                <CardHeader className="relative h-56 overflow-hidden p-0">
                  <Image
                    src={course.image.imageUrl}
                    alt={course.image.description}
                    data-ai-hint={course.image.imageHint}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" aria-hidden />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <Badge className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      {course.category}
                    </Badge>
                    <Badge className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
              )}
              <CardContent className="flex flex-1 flex-col gap-6 p-8">
                <div className="space-y-3">
                  <CardTitle className="font-headline text-2xl text-foreground">{course.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {course.description}
                  </CardDescription>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {course.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-5 border-t border-muted/60 bg-white/80 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">{course.duration} • {course.price}</p>
                  <p>Includes replays, resources, and mentorship</p>
                </div>
                <Button asChild className="rounded-full px-6">
                  <Link href="/signup">Join waitlist</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="rounded-[3rem] bg-white/90 p-12 shadow-xl shadow-primary/5 md:p-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
            <div className="space-y-5">
              <Badge className="rounded-full bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                What every course includes
              </Badge>
              <h2 className="font-headline text-3xl font-semibold text-foreground sm:text-4xl">
                A consistent, elevated learning experience
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you join a live cohort or an evergreen lab, your dashboard mirrors the refined aesthetic of sokacademy.com with intuitive navigation and polished resources.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {coursePillars.map((pillar) => (
                <Card key={pillar.title} className="border border-muted bg-white/80 text-center shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg text-foreground">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-headline text-2xl text-foreground">Need a tailored recommendation?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Share your background and our team will match you with the right course bundle.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/signup">Start intake form</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-primary/40 px-6 text-primary hover:bg-primary/10">
                <Link href="/faq">Course FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

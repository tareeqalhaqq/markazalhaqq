import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courses = [
  {
    title: "Al Aurjuzah Al Miyyah: The Seerah in 100 Lines",
    category: "Seerah",
    level: "Intermediate",
    description:
      "Study the Prophetic biography through the renowned poem by Ibn Abi Izz al-Hanafi with detailed commentary, translation, and memorisation support.",
    highlight: "Includes Arabic text, English explanation, memorisation trackers, and weekly live Q&A.",
    image: PlaceHolderImages.find((img) => img.id === "course-2"),
  },
];

export default function CoursesPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-[0.18]" />
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="border border-primary/30 bg-primary/10 text-primary">Seerah course</Badge>
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Al Aurjuzah Al Miyyah by Ibn Abi Izz al-Hanafi
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Markaz al-Haqq Academy presently offers one dedicated programme: a 12-week live study of the Prophetic biography through the celebrated 100-line poem. Presentation, materials, and instruction all follow our academy standards.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          {courses.map((course) => (
            <Card key={course.title} className="flex flex-col overflow-hidden border border-primary/20 bg-card/85 shadow-xl shadow-slate-950/40">
              {course.image && (
                <CardHeader className="p-0">
                  <Image
                    src={course.image.imageUrl}
                    alt={course.image.description}
                    data-ai-hint={course.image.imageHint}
                    width={640}
                    height={360}
                    className="h-64 w-full object-cover"
                  />
                </CardHeader>
              )}
              <CardContent className="flex flex-1 flex-col gap-5 p-8">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    {course.level}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <CardTitle className="font-headline text-2xl text-foreground">{course.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {course.description}
                  </CardDescription>
                  <p className="text-base font-medium text-primary">{course.highlight}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 border-t border-primary/20 bg-background/70 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Live cohort · Saturdays 7PM GMT</p>
                  <p className="text-sm text-muted-foreground">One-time payment of $120 · replays included</p>
                </div>
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/signup">Join the waitlist</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-3xl border border-primary/20 bg-card/85 p-10 shadow-xl shadow-slate-950/40 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold text-foreground">What the course includes</h2>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />Arabic text, translation, and annotated commentary for every line.</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />Memorisation trackers with pacing suggestions and audio recitations.</li>
              <li className="flex items-start gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />Weekly assignments to internalise lessons and share reflections with instructors.</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-2xl border border-primary/20 bg-background/70 p-8">
            <h3 className="font-headline text-2xl text-foreground">How to enrol</h3>
            <p className="text-base text-muted-foreground">
              Create your Markaz al-Haqq account, complete the short intake form, and you will receive access details once the next cohort opens. Spots are limited to maintain a guided classroom experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/signup">Join the waitlist</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-primary px-6 text-primary hover:bg-primary/10">
                <Link href="/faq">View course FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

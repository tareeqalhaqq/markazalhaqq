import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courses = [
  {
    title: "Foundations of Islamic Belief",
    category: "Aqeedah",
    level: "Beginner",
    description:
      "Understand the pillars of iman through a structured study of Aqeedah texts explained by the Tareeq Al-Haqq instructors.",
    highlight: "Includes weekly reflection prompts and live Q&A recaps.",
    image: PlaceHolderImages.find((img) => img.id === "course-1"),
  },
  {
    title: "The Prophetic Biography (Seerah)",
    category: "History",
    level: "Beginner",
    description:
      "Journey through the life of the Messenger (ﷺ) with timeless lessons, maps, and key events contextualized for today.",
    highlight: "Featuring interactive timelines and discussion circles.",
    image: PlaceHolderImages.find((img) => img.id === "course-2"),
  },
  {
    title: "Tajweed Essentials",
    category: "Quranic Sciences",
    level: "Beginner",
    description:
      "Develop proper recitation by focusing on makharij, sifaat, and practical correction sessions with certified reciters.",
    highlight: "Upload recitations for personalized instructor feedback.",
    image: PlaceHolderImages.find((img) => img.id === "course-3"),
  },
  {
    title: "Principles of Islamic Jurisprudence",
    category: "Fiqh",
    level: "Intermediate",
    description:
      "Explore usul al-fiqh and how rulings are derived, preparing you to analyze evidences with balance and humility.",
    highlight: "Case-based workshops with faculty moderation.",
    image: PlaceHolderImages.find((img) => img.id === "course-4"),
  },
  {
    title: "Introduction to Hadith Studies",
    category: "Hadith",
    level: "Intermediate",
    description:
      "Study the preservation, classification, and terminology of hadith with readings curated by the MarkazalHaqq team.",
    highlight: "Guided reading circles covering classical primers.",
    image: PlaceHolderImages.find((img) => img.id === "course-5"),
  },
  {
    title: "Arabic Language Level 1",
    category: "Language",
    level: "Beginner",
    description:
      "Build vocabulary, grammar, and comprehension skills that prepare you for direct engagement with classical texts.",
    highlight: "Weekly labs and dialogue practice with teaching assistants.",
    image: PlaceHolderImages.find((img) => img.id === "course-6"),
  },
];

export default function CoursesPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0f172a] via-background to-[#101b30]" />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-35" />
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="border border-primary/40 bg-primary/10 text-primary">Course library</Badge>
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Guided pathways rooted in revelation
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Every MarkazalHaqq course is an extension of the official Tareeq Al-Haqq teaching efforts—organized, authentic, and ready for sincere seekers worldwide.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <Input
              type="search"
              placeholder="Search courses or subjects"
              className="w-full rounded-full border-primary/30 bg-card/70 backdrop-blur"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.title} className="flex h-full flex-col overflow-hidden border border-primary/20 bg-card/80 shadow-lg shadow-black/40 backdrop-blur">
              {course.image && (
                <CardHeader className="p-0">
                  <Image
                    src={course.image.imageUrl}
                    alt={course.image.description}
                    data-ai-hint={course.image.imageHint}
                    width={640}
                    height={360}
                    className="h-48 w-full object-cover"
                  />
                </CardHeader>
              )}
              <CardContent className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1">
                    {course.level}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="font-headline text-xl text-primary">{course.title}</CardTitle>
                  <CardDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </CardDescription>
                </div>
                <p className="text-sm font-medium text-primary">{course.highlight}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 bg-card/70 p-6">
                <p className="text-sm font-medium text-muted-foreground">Instructor roster announced soon</p>
                <Button asChild size="sm" className="rounded-full px-5">
                  <Link href="/signup">Join waitlist</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 space-y-10 rounded-3xl border border-primary/30 bg-card/85 p-10 text-center shadow-xl shadow-black/50">
          <h2 className="font-headline text-3xl font-bold text-primary">Prefer to sample individual topics?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every course can be purchased individually with lifetime access, while the Student of Knowledge Program unlocks them all for $40 per month or $240 yearly.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-left">
              <h3 className="font-headline text-2xl text-primary">Tareeq Path</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Focus on self purification with guided reflections, spiritual check-ins, and mentorship rooted in the Prophetic path.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-left">
              <h3 className="font-headline text-2xl text-primary">Haqq Path</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Dive deep into knowledge—Arabic, aqeedah, fiqh, and hadith—sequenced for steady scholarly growth.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/plans">View plans</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/faq">Read pricing FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

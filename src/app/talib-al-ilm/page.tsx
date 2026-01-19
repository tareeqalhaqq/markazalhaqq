export const dynamic = 'force-dynamic'
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const levelCatalogue = [
  {
    level: "Level 1",
    title: "Foundational Seekers",
    focus: "Introductory creed, fiqh of worship, and structured Arabic primers.",
    courses: [
      "Foundations of Aqidah",
      "Fiqh of Worship essentials",
      "Arabic for Sacred Texts · Starter pathway",
    ],
    outcomes: [
      "Solidify creedal pillars using classical texts",
      "Master purification and daily salah with confidence",
      "Read short prophetic narrations with guided vocabulary notes",
    ],
  },
  {
    level: "Level 2",
    title: "Committed Students",
    focus: "Deepen seerah studies, expand fiqh applications, and unlock tajwid labs.",
    courses: [
      "Aurjuzah Al-Miyyah Immersive",
      "Fiqh of Worship & Daily Living",
      "Arabic for Sacred Texts · Applied readings",
    ],
    outcomes: [
      "Connect prophetic biography events to contemporary life",
      "Apply madhhab-specific rulings to complex scenarios",
      "Lead recitation circles with tajwid corrections",
    ],
  },
  {
    level: "Level 3",
    title: "Scholarly Track",
    focus: "Advanced text readings, comparative fiqh, and mentorship on teaching methodology.",
    courses: [
      "Advanced Aqidah dialogues",
      "Fiqh capstone clinics",
      "Arabic rhetoric for da'wah",
    ],
    outcomes: [
      "Defend creed with classical and contemporary proofs",
      "Facilitate community case studies using the seerah roadmap",
      "Craft lesson plans for local study circles",
    ],
  },
];

const allAccessHighlights = [
  {
    title: "Every course, one enrolment",
    description: "Talib al Ilm members see all published courses, replays, downloads, and live sessions instantly in their dashboard.",
  },
  {
    title: "Universal quiz access",
    description: "Assessments created in any course workspace—multiple-choice, reflections, or case studies—unlock for members by default.",
  },
  {
    title: "Level-based progression",
    description: "Admins drag-and-drop courses across levels to curate a guided journey from foundations to advanced mastery.",
  },
];

const adminToolkit = [
  {
    title: "Organise by level",
    description: "Assign any course to a level, reorder pathways, or mark prerequisites so seekers know the recommended flow.",
  },
  {
    title: "Monitor cohort momentum",
    description: "See quiz completion, discussion activity, and mentor follow-ups across all courses in a unified view.",
  },
  {
    title: "Launch spotlight programmes",
    description: "Feature seasonal intensives or new cohorts to the entire Talib al Ilm community with a single toggle.",
  },
];

export default function TalibAlIlmPage() {
  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-primary/20 to-secondary/30" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="rounded-full border border-primary/30 bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Talib al Ilm programme
            </Badge>
            <h1 className="mt-6 font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              One membership unlocking every course, quiz, and cohort experience
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for seekers who want structured progression, the Talib al Ilm programme opens the entire Markaz al-Haqq library and organises courses into levels you can tailor for your community.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
              <Badge variant="outline" className="rounded-full border-primary/40 px-4 py-1 text-primary">
                All-access learning
              </Badge>
              <Badge variant="outline" className="rounded-full border-primary/40 px-4 py-1 text-primary">
                Level-based roadmap
              </Badge>
              <Badge variant="outline" className="rounded-full border-primary/40 px-4 py-1 text-primary">
                Admin curation tools
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Card className="border border-muted bg-white/85 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Why seekers love Talib al Ilm</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                The programme mirrors the polish of our redesigned student experience while layering in academy-wide access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {allAccessHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl border border-border/70 bg-white/75 p-5">
                  <h3 className="text-lg font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-muted bg-white/85 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Membership snapshot</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Everything an eager student needs to immerse in sacred knowledge year-round.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/75 px-4 py-3">
                <span className="font-semibold text-foreground">Monthly investment</span>
                <span className="text-lg font-bold text-primary">$95</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/75 px-4 py-3">
                <span className="font-semibold text-foreground">Annual commitment</span>
                <span className="text-lg font-bold text-primary">$950</span>
              </div>
              <p>
                Includes every live cohort, on-demand replay, quiz, workbook, and discussion thread. Scholarships and community sponsorships are available upon request.
              </p>
              <Button asChild className="w-full rounded-full">
                <Link href="/signup">Join Talib al Ilm waitlist</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto space-y-12 px-6">
        <div className="max-w-3xl">
          <h2 className="font-headline text-3xl font-semibold tracking-tight text-foreground">Level-based course organisation</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Administrators drag-and-drop courses into levels so students always know the next best step. Levels update instantly across the instructor workspaces and the student dashboard.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {levelCatalogue.map((level) => (
            <Card key={level.level} className="border border-muted bg-white/85 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  <span className="mr-2 text-xs uppercase tracking-[0.35em] text-primary">{level.level}</span>
                  {level.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{level.focus}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">Courses included</p>
                  <ul className="mt-2 space-y-1">
                    {level.courses.map((course) => (
                      <li key={course} className="rounded-xl border border-border/60 bg-white/70 px-3 py-2 text-foreground">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator className="border-dashed" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">Outcomes</p>
                  <ul className="mt-2 space-y-1">
                    {level.outcomes.map((outcome) => (
                      <li key={outcome} className="rounded-xl border border-border/60 bg-white/70 px-3 py-2">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <Card className="border border-muted bg-white/85 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Admin toolkit</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Empower your team to manage access, pathway ordering, and spotlight content without touching code.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            {adminToolkit.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/70 bg-white/75 p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-2">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-6">
        <Card className="border border-muted bg-white/85 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Ready to give your community all-access learning?</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Pair the Talib al Ilm membership with your existing cohorts or launch it as the flagship experience for your markaz.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Button asChild className="rounded-full px-6">
              <Link href="/signup">Start application</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/courses">Browse courses</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full px-6 text-primary hover:text-primary">
              <Link href="/dashboard/instructor">Review instructor tools</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

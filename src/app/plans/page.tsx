import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const academyPlanFeatures = [
  "Twelve live sessions exploring the Prophetic biography with guided commentary",
  "Annotated Arabic text, English translation, and memorisation trackers",
  "Weekly Q&A, feedback on recitation submissions, and cohort discussions",
  "Lifetime access to replays and downloadable course resources",
];

const enrolSteps = [
  "Create your Markaz al-Haqq account and complete the intake form",
  "Receive confirmation once the next cohort schedule is released",
  "Attend orientation to review learning tools and practice pacing",
];

export default function PlansPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 -z-10 calligraphy-overlay opacity-[0.18]" />
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="border border-primary/30 bg-primary/10 text-primary">Pathway investment</Badge>
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Tuition for the current cohort
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              One straightforward fee grants access to the full 12-week Prophetic biography programme, including live sessions, memorisation support, and lifetime replays.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid max-w-4xl gap-10 px-6 pb-20">
        <Card className="overflow-hidden border border-primary/20 bg-card/85 shadow-xl shadow-slate-950/40">
          <CardHeader className="p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Single programme</p>
            <CardTitle className="mt-3 font-headline text-3xl text-foreground">Current Seerah Cohort</CardTitle>
            <CardDescription className="mt-4 text-base text-muted-foreground">
              One payment grants access to the live Seerah course, memorisation support, and all accompanying resources. No subscriptions or hidden tiers.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-10 px-8 pb-8 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-start">
            <ul className="space-y-4 text-left text-base text-muted-foreground">
              {academyPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-5 rounded-3xl border border-primary/20 bg-background/70 p-6 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Course fee</p>
                <p className="text-4xl font-bold text-primary">$120</p>
                <p className="text-sm text-muted-foreground">one-time · replays included</p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-card/85 p-4 text-left">
                <p className="text-sm font-semibold text-primary">Need assistance?</p>
                <p className="text-sm text-muted-foreground">
                  Limited scholarships are available. Email support@tareeqalhaqq.org to inquire.
                </p>
              </div>
              <Button asChild size="lg" className="w-full rounded-full">
                <Link href="/signup">Join the waitlist</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/20 bg-card/85 shadow-lg shadow-slate-950/40">
          <CardHeader className="p-8 text-center">
            <CardTitle className="font-headline text-2xl text-foreground">How enrolment works</CardTitle>
            <CardDescription className="mt-3 text-base text-muted-foreground">
              Follow these steps to join the upcoming cohort and access the learning platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <ol className="space-y-4 text-left text-base text-muted-foreground">
              {enrolSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button asChild variant="outline" className="w-full rounded-full" size="lg">
              <Link href="/faq">Read course FAQ</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

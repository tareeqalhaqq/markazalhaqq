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
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50/70 to-purple-50/60" aria-hidden />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full border border-primary/30 bg-primary/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Pathway investment
            </Badge>
            <h1 className="mt-6 font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Tuition options for every seeker
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Transparent pricing that reflects the mentorship, resources, and support embedded into each Markaz al-Haqq programme.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid max-w-4xl gap-10 px-6">
        <Card className="overflow-hidden border border-muted bg-white/90 shadow-xl shadow-primary/5">
          <CardHeader className="p-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Signature cohort</p>
            <CardTitle className="mt-3 font-headline text-3xl text-foreground">Current Seerah Cohort</CardTitle>
            <CardDescription className="mt-4 text-base text-muted-foreground">
              Enrol once and unlock 12 weeks of guided study, mentorship, and lifetime resources. Experience the same polish and flow as the redesigned sokacademy.com interface.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-10 px-10 pb-10 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-start">
            <ul className="space-y-4 text-left text-base text-muted-foreground">
              {academyPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-6 rounded-3xl border border-primary/20 bg-primary/5 p-6 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Cohort fee</p>
                <p className="text-4xl font-bold text-primary">$180</p>
                <p className="text-sm text-muted-foreground">One-time · replays and resources included</p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-white/80 p-4 text-left">
                <p className="text-sm font-semibold text-primary">Need support?</p>
                <p className="text-sm text-muted-foreground">
                  Limited scholarships are available. Email support@markazalhaqq.org to start the conversation.
                </p>
              </div>
              <Button asChild size="lg" className="w-full rounded-full">
                <Link href="/signup">Join the waitlist</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-muted bg-white/90 shadow-lg shadow-primary/5">
          <CardHeader className="p-10 text-center">
            <CardTitle className="font-headline text-2xl text-foreground">How enrolment works</CardTitle>
            <CardDescription className="mt-3 text-base text-muted-foreground">
              Three simple steps to access the academy platform and start your journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-6">
            <ol className="space-y-4 text-left text-base text-muted-foreground">
              {enrolSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter className="px-10 pb-10">
            <Button asChild variant="outline" className="w-full rounded-full" size="lg">
              <Link href="/faq">Read course FAQ</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

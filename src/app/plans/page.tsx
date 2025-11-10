import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const studentPlanFeatures = [
  "Immediate access to the full Student of Knowledge curriculum",
  "Weekly live review or Q&A touchpoints with the Tareeq Al-Haqq team",
  "Downloadable notes, readings, and supplemental resources",
  "Private student community for accountability and mentorship",
];

const individualCourseFeatures = [
  "Choose the subjects that matter most to your journey",
  "Lifetime access to purchased course recordings and materials",
  "Eligible for community discussions tied to that course",
  "Upgrade into the Student of Knowledge Program at any time",
];

export default function PlansPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-sky-200" />
        <div className="container mx-auto px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="bg-primary/10 text-primary">Plans & pricing</Badge>
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Simple pricing for sincere seekers
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              One immersive subscription for committed students, plus the flexibility to purchase individual courses when you want to focus on a single topic.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid max-w-5xl gap-10 px-6 pb-20">
        <Card className="overflow-hidden border border-primary/20 bg-gradient-to-br from-white via-sky-50 to-white shadow-xl shadow-primary/15">
          <CardHeader className="p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Core offering</p>
            <CardTitle className="mt-3 font-headline text-3xl text-foreground">Student of Knowledge Program</CardTitle>
            <CardDescription className="mt-4 text-base text-muted-foreground">
              Unlock every current and upcoming course, structured study plans, and weekly live support from the official Tareeq Al-Haqq teaching team.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-10 px-8 pb-8 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-start">
            <ul className="space-y-4 text-left text-base text-muted-foreground">
              {studentPlanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-5 rounded-3xl bg-white/85 p-6 text-center shadow-lg shadow-primary/10 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Monthly access</p>
                <p className="text-4xl font-bold text-primary">$40</p>
                <p className="text-sm text-muted-foreground">per month · cancel anytime</p>
              </div>
              <div className="rounded-2xl bg-primary/5 p-4 text-left">
                <p className="text-sm font-semibold text-primary">Commit for the year</p>
                <p className="text-sm text-muted-foreground">
                  Pay $240 once and receive 12 months of access — the equivalent of $20 per month while your membership remains active.
                </p>
              </div>
              <Button asChild size="lg" className="w-full rounded-full">
                <Link href="/signup">Join the program</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-dashed border-primary/30 bg-white/70 shadow-lg shadow-primary/10 backdrop-blur">
          <CardHeader className="p-8 text-center">
            <CardTitle className="font-headline text-2xl text-foreground">Individual course purchases</CardTitle>
            <CardDescription className="mt-3 text-base text-muted-foreground">
              Prefer to study one subject at a time? Purchase single courses and keep the materials forever.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <ul className="space-y-4 text-base text-muted-foreground">
              {individualCourseFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button asChild variant="outline" className="w-full rounded-full" size="lg">
              <Link href="/courses">Browse courses</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

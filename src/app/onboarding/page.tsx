import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const milestones = [
  {
    title: "Confirm your details",
    description: "Review your profile so instructors can recognise you across live sessions and coursework.",
  },
  {
    title: "Choose your track",
    description: "Pick the learning lane that matches your experience level so we can place you in the right cohort.",
  },
  {
    title: "Activate membership",
    description: "Select a plan to unlock the student dashboard and resources curated for your path.",
  },
]

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-border/60 bg-white/90 px-6 py-10 shadow-2xl shadow-primary/5">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Badge variant="outline" className="border-primary/40 text-primary">
            Welcome to Markaz al-Haqq
          </Badge>
          <div className="space-y-3">
            <h1 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
              You're signed in — let's finish setting you up
            </h1>
            <p className="text-lg text-muted-foreground">
              We’ve created your profile. Choose a membership so we can route you to the right dashboard and unlock your
              course materials.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-white shadow-lg shadow-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground">View membership plans</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Compare access levels, live sessions, and certification paths.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full rounded-full">
                  <Link href="/plans">Browse plans</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border border-border/70 bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground">Need a hand?</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Speak with our team to match you to the right cohort or clarify billing.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" asChild className="rounded-full">
                  <Link href="mailto:admin@markazalhaqq.org">Email support</Link>
                </Button>
                <Button variant="ghost" asChild className="rounded-full">
                  <Link href="/faq">View FAQs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="h-fit border border-border/60 bg-white/90 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-foreground">Onboarding checklist</CardTitle>
            <CardDescription className="text-muted-foreground">
              Follow these quick steps to unlock your personalised dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {milestones.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-muted/40 px-4 py-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
              Already have a membership? <Link href="/auth/callback" className="font-semibold underline">Refresh your access</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

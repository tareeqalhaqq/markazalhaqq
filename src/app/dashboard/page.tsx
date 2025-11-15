import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const dashboardCards = [
  {
    title: "Instructor workspace",
    description:
      "Create courses, publish lessons, and share resources. Every action instantly updates the student preview so you can validate the flow before wiring Firebase.",
    href: "/dashboard/instructor",
    badge: "Admin",
  },
  {
    title: "Student timeline",
    description:
      "See exactly what learners will experience. Lesson progress, live sessions, and downloads stay in sync with the instructor dashboard.",
    href: "/dashboard/student",
    badge: "Learner",
  },
]

export default function DashboardLandingPage() {
  return (
    <div className="container mx-auto max-w-5xl space-y-10 px-6">
      <div className="rounded-3xl border border-primary/20 bg-white/90 p-10 text-center shadow-xl shadow-primary/10">
        <Badge variant="outline" className="border-primary/50 text-primary">
          Linked preview
        </Badge>
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground">
          Explore the connected academy dashboards
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage everything from one place. The instructor tools feed directly into the student view so you can test the product
          experience while you prepare the Firebase integration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dashboardCards.map((card) => (
          <Card key={card.title} className="flex h-full flex-col border-primary/10 bg-white/90 shadow-lg shadow-primary/10">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>Workspace</span>
                <Badge variant="outline" className="border-primary/40 text-primary">
                  {card.badge}
                </Badge>
              </div>
              <CardTitle className="font-headline text-2xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-4">
              <CardDescription className="text-base text-muted-foreground">{card.description}</CardDescription>
              <Button asChild className="self-start rounded-full">
                <Link href={card.href}>Open prototype</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

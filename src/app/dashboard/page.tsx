import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const dashboardCards = [
  {
    title: "Instructor workspace",
    description:
      "Prototype area for administrators to plan courses, lessons, and cohort logistics. Actions are simulated to outline the workflow.",
    href: "/dashboard/instructor",
    badge: "Admin",
  },
  {
    title: "Student timeline",
    description:
      "Preview of what an enrolled learner will see: progress tracking, upcoming lessons, and resources gathered in one place.",
    href: "/dashboard/student",
    badge: "Learner",
  },
]

export default function DashboardLandingPage() {
  return (
    <div className="container mx-auto max-w-5xl space-y-10 px-6">
      <div className="rounded-3xl border border-primary/20 bg-white/90 p-10 text-center shadow-xl shadow-primary/10">
        <Badge variant="outline" className="border-primary/50 text-primary">
          Prototype preview
        </Badge>
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground">
          Explore the academy dashboards
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We are experimenting with the instructor and student experiences before wiring them to the live data layer. Use the hard
          coded accounts on the login page to preview each role.
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

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { addDays, format } from "date-fns"
import { CheckCircle2, CreditCard, Receipt } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAcademyUser } from "@/hooks/useAcademyUser"
import { logout } from "@/lib/logout"

type BillingPlanDefinition = {
  id: string
  name: string
  price: string
  cadence: string
  perks: string[]
  nextBillingDaysOffset?: number
}

const billingPlanCatalog: Record<string, BillingPlanDefinition> = {
  none: {
    id: "none",
    name: "No active plan",
    price: "$0",
    cadence: "You're not enrolled in an academy subscription yet.",
    perks: ["Complete checkout from the plans page to activate access."],
  },
  "talib-al-ilm": {
    id: "talib-al-ilm",
    name: "Talib al Ilm Membership",
    price: "$95/mo",
    cadence: "Monthly all-access membership",
    nextBillingDaysOffset: 28,
    perks: [
      "Unlimited course library access",
      "Priority Q&A during live intensives",
      "Downloadable workbooks and archives",
    ],
  },
  "seerah-cohort": {
    id: "seerah-cohort",
    name: "Current Seerah Cohort",
    price: "$180",
    cadence: "One-time payment • lifetime replay access",
    perks: [
      "12 live sessions",
      "Guided memorisation resources",
      "Direct instructor office hours",
    ],
  },
}

function formatToReadableDate(value: unknown): string | null {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return format(value, "MMM d, yyyy")
  }

  if (typeof value === "number") {
    return format(new Date(value), "MMM d, yyyy")
  }

  if (typeof value === "string") {
    return value
  }

  if (typeof value === "object" && "toDate" in (value as { toDate?: () => Date }) && typeof (value as { toDate?: () => Date }).toDate === "function") {
    return format((value as { toDate: () => Date }).toDate(), "MMM d, yyyy")
  }

  return null
}

function resolveBillingPlan(planId: string): BillingPlanDefinition {
  if (billingPlanCatalog[planId]) {
    return billingPlanCatalog[planId]
  }

  return {
    id: planId || "custom-plan",
    name: planId ? `Custom plan (${planId})` : "Custom plan",
    price: "Custom pricing",
    cadence: "Managed directly by the admin team",
    perks: ["Your instructor will confirm the benefits shortly."],
    nextBillingDaysOffset: 30,
  }
}

export default function AcademyDashboardPage() {
  const router = useRouter()
  const { firebaseUser, userDoc, courses, loading } = useAcademyUser()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push("/login")
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading your academy data…</p>
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold">Please login</h1>
        <p className="text-muted-foreground">
          You must be signed in to access the Markaz al Haqq academy dashboard.
        </p>
        <Button asChild>
          <Link href="/login">Go to login</Link>
        </Button>
      </div>
    )
  }

  const academyRole = (userDoc?.academyRole as string | undefined) ?? "Not set"
  const isAcademyStudent = Boolean(userDoc?.isAcademyStudent)
  const displayName = firebaseUser.displayName || (userDoc?.displayName as string | undefined) || firebaseUser.email || "Academy learner"
  const accountEmail = firebaseUser.email || (userDoc?.email as string | undefined) || "No email on file"
  const memberSince = formatToReadableDate(userDoc?.createdAt) ?? "Awaiting activation"
  const planIdFromDoc = typeof userDoc?.academyPlanId === "string" ? userDoc.academyPlanId : undefined
  const resolvedPlanId = planIdFromDoc && planIdFromDoc.trim() ? planIdFromDoc : isAcademyStudent ? "talib-al-ilm" : "none"
  const resolvedPlan = resolveBillingPlan(resolvedPlanId)
  const nextBillingDate = resolvedPlan.id === "none" ? null : format(addDays(new Date(), resolvedPlan.nextBillingDaysOffset ?? 30), "MMM d, yyyy")
  const activePlans = resolvedPlan.id === "none" ? [] : [resolvedPlan]
  const profileDetails = [
    { label: "Full name", value: displayName },
    { label: "Email", value: accountEmail },
    { label: "Account ID", value: firebaseUser.uid },
    { label: "Member since", value: memberSince },
    { label: "Academy role", value: academyRole },
    { label: "Student access", value: isAcademyStudent ? "Active" : "Inactive" },
  ]

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Welcome back</p>
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <p className="text-muted-foreground">{accountEmail}</p>
        </div>
        <Button onClick={handleLogout} disabled={isLoggingOut} variant="outline">
          {isLoggingOut ? "Signing out…" : "Logout"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academy status</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="text-xl font-semibold">{academyRole}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Student Access</p>
            <div className="mt-1 flex items-center gap-2 text-xl font-semibold">
              {isAcademyStudent ? "Active" : "Inactive"}
              <Badge variant={isAcademyStudent ? "default" : "secondary"}>
                {isAcademyStudent ? "Enrolled" : "Not enrolled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>The information you shared during onboarding stays synced here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid gap-4">
              {profileDetails.map((item) => (
                <div key={item.label} className="flex flex-col rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                  <dd className="text-base font-semibold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">Update profile</Button>
              <Button asChild variant="ghost" className="rounded-full text-primary">
                <Link href="/signup">Edit intake form</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing &amp; plans</CardTitle>
            <CardDescription>Active memberships and saved payment method.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activePlans.length ? (
              activePlans.map((plan) => (
                <div key={plan.id} className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-primary">Active plan</p>
                      <p className="text-lg font-semibold text-foreground">{plan.name}</p>
                      <p className="text-sm text-muted-foreground">{plan.cadence}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/40 text-primary">
                      {plan.price}
                    </Badge>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  {nextBillingDate ? (
                    <p className="mt-4 text-sm font-medium text-primary">Next renewal on {nextBillingDate}</p>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
                Add a plan from the pricing page and it will appear here immediately.
              </div>
            )}

            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <CreditCard className="h-10 w-10 rounded-full border border-border/60 p-2 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{(userDoc?.paymentMethodLabel as string | undefined) ?? "Visa •••• 2746"}</p>
                  <p className="text-sm text-muted-foreground">
                    {nextBillingDate ? `Next payment scheduled for ${nextBillingDate}` : "No payment scheduled"}
                  </p>
                </div>
                <Badge variant={isAcademyStudent ? "default" : "secondary"}>
                  {isAcademyStudent ? "Auto-pay enabled" : "Billing paused"}
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-full">
                  Update card
                </Button>
                <Button variant="ghost" className="rounded-full text-primary">
                  <Receipt className="mr-2 h-4 w-4" /> Download receipt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled courses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.length === 0 ? (
            <p className="text-muted-foreground">You&apos;re not enrolled in any academy courses yet.</p>
          ) : (
            courses.map((course) => {
              const progressValue = typeof course.progress === "number" ? course.progress : 0
              const progressLabel = `${progressValue}% complete`

              return (
                <div key={course.id} className="rounded-lg border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-lg font-semibold">{(course.title as string) ?? course.id}</p>
                      {course.description ? (
                        <p className="text-sm text-muted-foreground">{String(course.description)}</p>
                      ) : null}
                    </div>
                    <Badge variant="outline">{progressLabel}</Badge>
                  </div>
                  <Progress value={progressValue} className="mt-4" />
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}

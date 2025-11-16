"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAcademyUser } from "@/hooks/useAcademyUser"
import { logout } from "@/lib/logout"

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

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Welcome back</p>
          <h1 className="text-3xl font-bold">
            {firebaseUser.displayName || userDoc?.displayName || firebaseUser.email}
          </h1>
          <p className="text-muted-foreground">{firebaseUser.email}</p>
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

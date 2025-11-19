import { Suspense } from "react"

import { AcademyDashboardClient } from "./dashboard-client"

export default function AcademyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-background via-muted to-background">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Loading academy experience...
          </p>
        </div>
      }
    >
      <AcademyDashboardClient />
    </Suspense>
  )
}

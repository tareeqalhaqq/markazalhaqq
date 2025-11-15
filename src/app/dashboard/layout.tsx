import type { ReactNode } from "react"

import { AcademyDataProvider } from "./_components/academy-data-context"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AcademyDataProvider>
      <div className="bg-gradient-to-br from-slate-50 via-white to-sky-50 py-10">{children}</div>
    </AcademyDataProvider>
  )
}

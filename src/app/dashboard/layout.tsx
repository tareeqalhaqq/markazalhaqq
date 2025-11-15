import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-sky-50 py-10">
      {children}
    </div>
  )
}

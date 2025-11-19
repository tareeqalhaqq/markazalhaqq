import type { ReactNode } from "react"

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950/95 py-12 text-white">
      <div className="mx-auto w-full max-w-4xl space-y-6 px-6">
        {children}
      </div>
    </div>
  )
}

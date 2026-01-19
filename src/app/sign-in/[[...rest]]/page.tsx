import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const highlights = [
  {
    title: "Clerk-secured sign in",
    description: "Session handling is fully managed and works across the entire site.",
    icon: ShieldCheck,
  },
  {
    title: "Supabase-ready profile",
    description: "We create or update your profile the moment you authenticate.",
    icon: Sparkles,
  },
]

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-6xl items-center justify-center px-4 py-10">
      <div className="grid w-full gap-8 rounded-3xl border border-border/60 bg-white/90 p-8 shadow-2xl shadow-primary/5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Badge variant="outline" className="border-primary/40 text-primary">
            Secure login
          </Badge>
          <div className="space-y-2">
            <h1 className="font-headline text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Sign in to Markaz al-Haqq
            </h1>
            <p className="text-lg text-muted-foreground">
              Access your dashboard, courses, and community updates from a single, secure account.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <Card key={item.title} className="border border-border/70 bg-muted/40">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Login</CardTitle>
            <CardDescription className="text-slate-200">
              Use your Clerk account to continue. New to the academy? Create an account on the next tab.
            </CardDescription>
          </CardHeader>
          <CardContent className="rounded-2xl bg-white p-4 text-foreground shadow-lg">
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              afterSignInUrl="/auth/callback"
              afterSignUpUrl="/auth/callback"
              appearance={{
                variables: { borderRadius: "14px" },
                elements: {
                  card: "shadow-none border-none",
                  formButtonPrimary:
                    "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import type { AuthError } from "@supabase/supabase-js"
import { Loader2, Mail } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { deriveRoleFromProfile, type UserRole } from "@/lib/userRoles"
import { supabase } from "@/lib/supabaseClient"

async function resolveRole(userId: string, email?: string | null): Promise<UserRole> {
  const { data, error } = await supabase.from("users").select("role, tags").eq("id", userId).maybeSingle()
  if (error) {
    console.error("Failed to resolve role", error)
  }
  return deriveRoleFromProfile(data, email)
}

function getDestination(role: UserRole) {
  return role === "admin" ? "/dashboard/admin" : "/dashboard/student"
}

function getFriendlyErrorMessage(error: AuthError | null) {
  if (!error) {
    return null
  }

  if (error.message.toLowerCase().includes("invalid login credentials")) {
    return "Those credentials don’t match any academy profile. Double-check the email and password."
  }

  if (error.message.toLowerCase().includes("email")) {
    return "Please enter a valid email address."
  }

  return error.message || "We couldn't sign you in. Please try again or contact support."
}

export default function LoginPage() {
  const router = useRouter()
  const hasHandledSession = useRef(false)
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const appleAuthEnabled = process.env.NEXT_PUBLIC_ENABLE_APPLE_AUTH === "true"

  useEffect(() => {
    const handleUser = async () => {
      if (hasHandledSession.current) return
      const { data } = await supabase.auth.getSession()
      if (!data.session?.user) return

      hasHandledSession.current = true
      await ensureAcademyUser(data.session.user)
      const role = await resolveRole(data.session.user.id, data.session.user.email)
      router.replace(getDestination(role))
    }

    handleUser().catch((err) => console.error("Failed to resolve session", err))

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user || hasHandledSession.current) return
      hasHandledSession.current = true
      await ensureAcademyUser(session.user)
      const role = await resolveRole(session.user.id, session.user.email)
      router.replace(getDestination(role))
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatusMessage(null)
    setIsSubmitting(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (signInError || !data.user) {
        setError(getFriendlyErrorMessage(signInError) ?? "We couldn't sign you in. Please try again.")
        return
      }

      await ensureAcademyUser(data.user)
      const role = await resolveRole(data.user.id, data.user.email)
      router.push(getDestination(role))
    } catch (err) {
      console.error("Login failed", err)
      setError("We couldn't finish preparing your academy profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordReset() {
    setError(null)
    setStatusMessage(null)

    if (!email.trim()) {
      setError("Enter the email tied to your academy account so we can send a reset link.")
      return
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/login`,
      })

      if (resetError) {
        setError(getFriendlyErrorMessage(resetError) ?? "We couldn't send the reset email. Please try again.")
        return
      }

      setStatusMessage(`Password reset instructions are on their way to ${email.trim()}.`)
    } catch (err) {
      console.error("Password reset failed", err)
      setError("We couldn't send the reset email. Please try again.")
    }
  }

  async function handleProvider(provider: "google" | "apple") {
    setError(null)
    setStatusMessage(null)
    setIsSubmitting(true)

    try {
      const { error: providerError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      })

      if (providerError) {
        setError("We couldn't authenticate with that provider. Please try again.")
      }
    } catch (err) {
      console.error("OAuth sign-in failed", err)
      setError("We couldn't authenticate with that provider. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sign in</p>
          <h1 className="font-headline text-4xl font-semibold text-slate-900">Access your Academy account</h1>
          <p className="max-w-xl text-base text-slate-600">
            Use your email and password or continue with Google or Apple. Your admin or student dashboard will load based on
            your role.
          </p>
        </div>

        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your credentials to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Unable to sign in</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            {statusMessage ? (
              <Alert>
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">or</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => handleProvider("google")} disabled={isSubmitting}>
                <Mail className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              {appleAuthEnabled ? (
                <Button variant="outline" className="w-full" onClick={() => handleProvider("apple")} disabled={isSubmitting}>
                  Continue with Apple
                </Button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handlePasswordReset}
              className="w-full text-left text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Forgot your password?
            </button>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-slate-600">
            <span>Do not have an account?</span>
            <Link href="/signup" className="font-semibold text-slate-900 hover:underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

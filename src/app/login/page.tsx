"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FirebaseError } from "firebase/app"
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { auth } from "@/lib/firebaseClient"

function getFriendlyErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Those credentials don’t match any Markaz al Haqq profile. Double-check the username and password."
      case "auth/too-many-requests":
        return "Too many attempts in a short time. Please wait a moment and try again."
      default:
        return "We couldn't sign you in. Please try again or contact support if the issue continues."
    }
  }

  return "Something went wrong while signing you in. Please try again."
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.replace("/academy")
      }
    })

    return () => unsubscribe()
  }, [router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatusMessage(null)
    setIsSubmitting(true)

    const trimmedIdentifier = username.trim()

    try {
      const credential = await signInWithEmailAndPassword(auth, trimmedIdentifier, password)
      await ensureAcademyUser(credential.user)
      router.push("/academy")
    } catch (err) {
      if (err instanceof FirebaseError && err.code.startsWith("auth/")) {
        setError(getFriendlyErrorMessage(err))
      } else {
        console.error("Failed to ensure academy user profile", err)
        setError("We couldn't finish preparing your academy profile. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordReset() {
    setError(null)
    setStatusMessage(null)

    if (!username.trim()) {
      setError("Enter the email or username tied to your Markaz al Haqq account so we can send a reset link.")
      return
    }

    try {
      setIsResettingPassword(true)
      await sendPasswordResetEmail(auth, username.trim())
      setStatusMessage(`Password reset instructions are on their way to ${username.trim()}. Check your inbox and spam folder.`)
    } catch (err) {
      if (err instanceof FirebaseError && err.code.startsWith("auth/")) {
        setError(getFriendlyErrorMessage(err))
      } else {
        console.error("Failed to send password reset email", err)
        setError("We couldn't send the reset email. Please try again or contact support.")
      }
    } finally {
      setIsResettingPassword(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-white via-blue-50/60 to-purple-50/60 px-4 py-16">
      <Card className="w-full max-w-md border border-muted bg-white/85 shadow-xl shadow-primary/15 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="font-headline text-3xl font-bold tracking-tight text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Sign in with your academy username and password to reach the secure dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                <Badge variant="outline" className="border-primary/40 text-xs uppercase tracking-[0.3em] text-primary">
                  Secure
                </Badge>
                Username + password access
              </div>
              <p className="text-sm text-muted-foreground">
                Use the credentials issued by the Markaz al Haqq admin team. Accounts are secured through Firebase Authentication
                and monitored by the academy staff.
              </p>
            </div>
            {statusMessage ? (
              <Alert>
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
            ) : null}
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="academy.username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="ml-auto inline-block text-sm text-primary underline disabled:opacity-60"
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? "Sending reset link…" : "Forgot password?"}
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FirebaseError } from "firebase/app"
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { Activity, CheckCircle2, KeyRound, ShieldCheck } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ensureAcademyUser } from "@/lib/ensureAcademyUser"
import { auth, db } from "@/lib/firebaseClient"
import { deriveRoleFromProfile, type UserRole } from "@/lib/userRoles"

const securityHighlights = [
  {
    icon: ShieldCheck,
    title: "Dedicated auth boundary",
    description: "This login lives on an isolated layout so there’s zero overlap with the public marketing experience.",
  },
  {
    icon: KeyRound,
    title: "Encrypted credentials",
    description: "Firebase Authentication enforces SSL/TLS and monitors unusual password activity the moment it happens.",
  },
  {
    icon: Activity,
    title: "Live role sync",
    description: "If your profile carries the admin tag you’ll bypass the student stack and land in the admin workspace instantly.",
  },
]

const checklist = [
  "Use the username or email issued by the academy team.",
  "Password resets deliver to the exact identifier typed above.",
  "Admin-tagged accounts skip student dashboards entirely.",
]

async function resolveRole(userId: string): Promise<UserRole> {
  const profileRef = doc(db, "users", userId)
  const profileSnapshot = await getDoc(profileRef)
  return deriveRoleFromProfile(profileSnapshot.data())
}

function getDestination(role: UserRole) {
  return role === "admin" ? "/dashboard/admin" : "/academy"
}

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
      if (!currentUser) {
        return
      }

      resolveRole(currentUser.uid)
        .then((role) => router.replace(getDestination(role)))
        .catch((redirectError) => {
          console.error("Failed to determine role for redirect", redirectError)
          router.replace("/academy")
        })
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
      const role = await resolveRole(credential.user.uid)
      router.push(getDestination(role))
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
    <div className="relative min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_55%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-indigo-500/10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="relative hidden flex-col gap-10 border-r border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-10 lg:flex">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Private access</p>
              <h1 className="mt-4 font-headline text-4xl font-semibold text-white">Academy authentication console</h1>
              <p className="mt-3 text-base text-slate-300">
                This side of the platform is intentionally stripped of public content so you can focus on secure entry, nothing else.
              </p>
            </div>
            <div className="space-y-5">
              {securityHighlights.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-indigo-200">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-3xl border border-white/15 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Before signing in</p>
              <ul className="space-y-3 text-sm text-slate-200">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6 p-8 sm:p-12">
            <div className="space-y-3 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Credentials required</p>
              <h2 className="font-headline text-3xl font-semibold text-white">Sign in to the protected workspace</h2>
              <p className="text-sm text-slate-300">
                Only authenticated users may continue. The admin tag automatically unlocks the administrator console; everyone else enters the student academy.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
              <p className="font-semibold text-white">Need to reset your password?</p>
              <p className="text-slate-300">
                Provide the same username or email below so the system can verify you before sending the secure reset link.
              </p>
            </div>

            {statusMessage ? (
              <Alert className="border-emerald-400/40 bg-emerald-400/10 text-emerald-100">
                <AlertTitle>Status update</AlertTitle>
                <AlertDescription>{statusMessage}</AlertDescription>
              </Alert>
            ) : null}
            {error ? (
              <Alert variant="destructive" className="border-red-500/40 bg-red-500/10 text-red-100">
                <AlertTitle>Unable to sign in</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Username or email
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  inputMode="email"
                  placeholder="you@academy.com"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="border-white/20 bg-slate-950/40 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-slate-200">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="ml-auto text-sm font-medium text-indigo-300 underline-offset-4 hover:underline disabled:opacity-60"
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
                  className="border-white/20 bg-slate-950/40 text-white placeholder:text-slate-500"
                />
              </div>
              <Button type="submit" className="w-full rounded-2xl bg-indigo-500 text-white hover:bg-indigo-400" disabled={isSubmitting}>
                {isSubmitting ? "Verifying…" : "Enter secure area"}
              </Button>
            </form>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Admin tagging is additive—if your Firestore profile includes an <strong className="text-white">admin</strong> tag, this login will skip all student content and grant the elevated workspace immediately.
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

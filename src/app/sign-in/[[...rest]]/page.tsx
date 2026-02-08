import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { ArrowLeft } from "lucide-react"

import { SafeAuthForm } from "@/components/auth/safe-auth-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getClerkPublishableKey } from "@/lib/clerk"

export default function SignInPage() {
  const hasClerkKey = Boolean(getClerkPublishableKey())

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white/70"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="font-headline text-3xl font-semibold text-foreground">
            Sign in
          </h1>
          <p className="text-sm text-white/50">
            Access your dashboard, courses, and community.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          {hasClerkKey ? (
            <SafeAuthForm>
              <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                forceRedirectUrl="/auth/callback"
                appearance={{
                  variables: {
                    borderRadius: "12px",
                    colorBackground: "transparent",
                    colorText: "#f2f2f2",
                    colorTextSecondary: "rgba(255,255,255,0.5)",
                    colorInputBackground: "rgba(255,255,255,0.04)",
                    colorInputText: "#f2f2f2",
                  },
                  elements: {
                    card: "shadow-none border-none bg-transparent",
                    headerTitle: "text-foreground",
                    headerSubtitle: "text-white/50",
                    formButtonPrimary:
                      "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold rounded-full",
                    formFieldInput:
                      "border-white/[0.06] bg-white/[0.04] text-foreground placeholder:text-white/30",
                    formFieldLabel: "text-white/60",
                    footerActionLink: "text-primary hover:text-primary/80",
                    socialButtonsBlockButton:
                      "border-white/[0.06] bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
                    dividerLine: "bg-white/[0.06]",
                    dividerText: "text-white/30",
                    identityPreviewText: "text-foreground",
                    identityPreviewEditButton: "text-primary",
                  },
                }}
              />
            </SafeAuthForm>
          ) : (
            <Alert variant="destructive">
              <AlertTitle>Clerk configuration required</AlertTitle>
              <AlertDescription>
                Add a NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
                environment variable to enable sign in.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

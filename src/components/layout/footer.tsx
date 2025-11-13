import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="relative mt-28 border-t border-border/60 bg-card/80 text-foreground">
      <div className="absolute inset-0 -z-20 calligraphy-overlay" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-t from-background via-background/80 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-30 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr_minmax(0,280px)] lg:items-start">
          <div className="space-y-4 text-center lg:text-left">
            <Link href="/" className="flex items-center justify-center space-x-2 lg:justify-start">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The academy hub for seekers of authentic Islamic knowledge—anchored in scholarship and service.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              stay connected
            </div>
          </div>
          <div className="grid gap-6 text-sm uppercase tracking-[0.3em] text-foreground/70 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary">Navigate</p>
              <Link href="/courses" className="block transition-colors hover:text-primary">
                Courses
              </Link>
              <Link href="/plans" className="block transition-colors hover:text-primary">
                Plans
              </Link>
              <Link href="/faq" className="block transition-colors hover:text-primary">
                FAQ
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary">Learn</p>
              <Link href="/about" className="block transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/instructors" className="block transition-colors hover:text-primary">
                Instructors
              </Link>
              <Link href="/signup" className="block transition-colors hover:text-primary">
                Join the waitlist
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary">Connect</p>
              <p className="text-xs font-normal normal-case tracking-normal text-muted-foreground">support@markazalhaqq.org</p>
              <p className="text-xs font-normal normal-case tracking-normal text-muted-foreground">
                Based worldwide • Serving students everywhere
              </p>
            </div>
          </div>
          <div className="space-y-4 text-center text-sm text-muted-foreground lg:text-right">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">follow the journey</p>
            <p className="text-sm leading-relaxed">
              Subscribe for program updates, open study circles, and spiritual reminders.
            </p>
            <Button asChild className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/newsletter">Join the newsletter</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 border-t border-border/60 pt-6 text-center text-xs text-foreground/60">
          © {new Date().getFullYear()} MarkazalHaqq. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

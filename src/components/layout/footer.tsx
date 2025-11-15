import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="relative mt-32 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-900 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_transparent_55%)]" aria-hidden />
      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr_minmax(0,280px)] lg:items-start">
          <div className="space-y-6 text-center lg:text-left">
            <Link href="/" className="flex items-center justify-center space-x-2 lg:justify-start">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-base leading-relaxed text-slate-300">
              Markaz al-Haqq Academy guides sincere seekers through immersive programs rooted in the Qur'an, Sunnah, and the way of the Salaf.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              stay connected
            </div>
          </div>
          <div className="grid gap-8 text-left text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Programs</p>
              <Link href="/courses" className="block transition-colors hover:text-white">
                Courses
              </Link>
              <Link href="/plans" className="block transition-colors hover:text-white">
                Tuition & plans
              </Link>
              <Link href="/faq" className="block transition-colors hover:text-white">
                Frequently asked questions
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Community</p>
              <Link href="/about" className="block transition-colors hover:text-white">
                About the academy
              </Link>
              <Link href="/instructors" className="block transition-colors hover:text-white">
                Meet the instructors
              </Link>
              <Link href="/dashboard" className="block transition-colors hover:text-white">
                Student portal preview
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Connect</p>
              <p className="text-sm text-slate-300">support@markazalhaqq.org</p>
              <p className="text-sm text-slate-300">Worldwide faculty serving a global student body</p>
            </div>
          </div>
          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-100 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Join the waitlist</p>
            <p className="text-base leading-relaxed text-slate-200">
              Receive launch announcements, open lecture invites, and community highlights in your inbox.
            </p>
            <Button asChild className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-200">
              <Link href="/signup">Sign up today</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Markaz al-Haqq Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

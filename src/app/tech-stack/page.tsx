import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenCheck, Cpu, Layers, Rocket, Sparkles, Workflow } from 'lucide-react'

import { Section } from '@/components/marketing/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Technology stack | Markaz al-Haqq Academy',
  description:
    'See how the Markaz al-Haqq platform leans on the Next.js app router, React 18, and a modern TypeScript design system.',
}

const stackHighlights = [
  {
    title: 'Next.js app router',
    description:
      'Pages live in the app directory with server components, shared layout scaffolding, and metadata definitions that leverage the framework primitives.',
    icon: Layers,
  },
  {
    title: 'React 18 boundaries',
    description:
      'Critical experiences use Suspense-aware components and client boundaries where interactivity is required without sacrificing server-rendered speed.',
    icon: Sparkles,
  },
  {
    title: 'TypeScript by default',
    description:
      'Strict types cover UI primitives, hooks, and lib helpers, reinforced by the typecheck script in package.json.',
    icon: Workflow,
  },
  {
    title: 'Tailwind + design system',
    description:
      'Composable Shadcn UI primitives with Tailwind tokens keep pages consistent while allowing expressive layouts.',
    icon: BookOpenCheck,
  },
  {
    title: 'Edge-ready delivery',
    description:
      'Next build output is prepared for Cloudflare Pages via wrangler and apphosting config, keeping responses close to learners.',
    icon: Rocket,
  },
]

const verificationList = [
  'App directory routing with nested layouts in src/app',
  'Next metadata exports for SEO-friendly titles and descriptions',
  'Client components only where interactivity is needed (e.g., navigation, forms)',
  'Reusable UI primitives sourced from @/components/ui and marketing helpers',
  'Typed utilities in @/lib with Tailwind-powered design tokens',
]

export default function TechStackPage() {
  return (
    <Section background="subtle" className="py-section-lg">
      <div className="flex flex-col gap-12">
        <div className="space-y-4 text-center">
          <Badge className="rounded-pill border border-primary/30 bg-primary/10 text-primary">Built on Next.js</Badge>
          <h1 className="font-headline text-display-2 font-semibold text-foreground sm:text-display-3">
            A modern Next.js-first platform
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            The academy site embraces the latest Next.js stack—from the app router to type-safe UI primitives—so every page
            loads quickly, stays accessible, and is easy to extend.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild size="lg" className="rounded-pill px-6">
              <Link href="/">View the experience</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-pill px-6">
              <Link href="/about">Learn about the mission</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stackHighlights.map((item) => (
            <Card key={item.title} className="h-full rounded-card border border-border/70 bg-white/80 shadow-md">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle className="font-headline text-xl text-foreground">{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>

        <Card className="rounded-section border border-secondary/40 bg-white/90 shadow-lg shadow-secondary/10">
          <CardHeader className="space-y-2 md:flex md:items-center md:justify-between md:space-y-0">
            <div>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.32em] text-secondary">Verification</p>
              <CardTitle className="font-headline text-2xl">How we ensure the Next.js stack stays active</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Practical checkpoints the team can use to confirm the platform keeps leaning on the framework instead of
                reinventing it.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
              <Cpu className="h-4 w-4" aria-hidden />
              Next.js runtime ready
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {verificationList.map((item) => (
              <div
                key={item}
                className={cn(
                  'flex items-start gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3 shadow-sm',
                  'text-sm text-muted-foreground'
                )}
              >
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-secondary" aria-hidden />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

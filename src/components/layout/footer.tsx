import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/courses" className="text-sm text-foreground/70 hover:text-primary">Courses</Link>
            <Link href="/about" className="text-sm text-foreground/70 hover:text-primary">About</Link>
            <Link href="/plans" className="text-sm text-foreground/70 hover:text-primary">Plans</Link>
            <Link href="/faq" className="text-sm text-foreground/70 hover:text-primary">FAQ</Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <Link href="/" className="flex items-center justify-center space-x-2">
                <Logo className="h-6 w-auto" />
            </Link>
          </div>
        </div>
        <div className="mt-8">
            <p className="text-center text-xs text-foreground/50">
                © {new Date().getFullYear()} MarkazalHaqq. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}

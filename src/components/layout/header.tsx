'use client';

import Link from 'next/link';
import {
  Menu,
  BookOpen,
  Users,
  DollarSign,
  HelpCircle,
  GraduationCap,
  CalendarClock,
  Sparkles,
  LayoutDashboard,
  MonitorPlay,
  LibraryBig,
  BellRing,
  ShieldCheck,
  UserRound,
  Settings,
  CreditCard,
} from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserRole } from '@/hooks/useUserRole';

type NavLinkConfig = {
  href: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const publicNavLinks: NavLinkConfig[] = [
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/about', label: 'About', icon: Users },
  { href: '/instructors', label: 'Instructors', icon: GraduationCap },
  { href: '/talib-al-ilm', label: 'Talib al Ilm', icon: Sparkles },
  { href: '/plans', label: 'Plans', icon: DollarSign },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

const studentNavLinks: NavLinkConfig[] = [
  { href: '/academy?tab=dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/academy?tab=courses', label: 'Courses', icon: GraduationCap },
  { href: '/academy?tab=sessions', label: 'Live sessions', icon: MonitorPlay },
  { href: '/academy?tab=resources', label: 'Resources', icon: LibraryBig },
  { href: '/academy?tab=announcements', label: 'Announcements', icon: BellRing },
  { href: '/academy?tab=exams', label: 'Exams & certifications', icon: ShieldCheck },
  { href: '/account/profile', label: 'Profile & settings', icon: UserRound },
  { href: '/account/settings', label: 'Account settings', icon: Settings },
  { href: '/plans', label: 'Billing', icon: CreditCard },
];

const adminNavLinks: NavLinkConfig[] = [
  { href: '/dashboard/admin', label: 'Admin dashboard', icon: LayoutDashboard },
  ...studentNavLinks.filter((link) => link.href !== '/academy?tab=dashboard'),
];

function NavLink({
  href,
  children,
  mobile = false,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  isActive?: boolean;
}) {
  const pathname = usePathname();
  const resolvedIsActive = typeof isActive === 'boolean' ? isActive : pathname === href;

  const linkContent = (
    <Link
      href={href}
      className={cn(
        'font-medium transition-colors',
        mobile
          ? 'flex items-center rounded-xl p-2 text-base hover:bg-muted'
          : 'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] hover:bg-primary/10',
        resolvedIsActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </Link>
  );

  return mobile ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent;
}

export function Header() {
  const { user, role } = useUserRole();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userDisplayName = user?.displayName ?? user?.email ?? 'Account';
  const userInitials = React.useMemo(() => {
    if (!userDisplayName) return 'U';
    const parts = user?.displayName?.split(' ').filter(Boolean);
    if (parts && parts.length > 0) {
      const [first, second] = parts;
      return `${first?.[0] ?? ''}${second?.[0] ?? ''}`.trim().toUpperCase() || userDisplayName.slice(0, 2).toUpperCase();
    }
    return userDisplayName.slice(0, 2).toUpperCase();
  }, [user?.displayName, userDisplayName]);

  const userMenu = (options?: { className?: string; showLabel?: boolean }) => {
    if (!user) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'flex items-center gap-3 rounded-full border-border/70 bg-white/80 px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-white',
              options?.className
            )}
          >
            <Avatar className="h-9 w-9 border border-border/50 bg-muted">
              <AvatarImage src={user.photoURL ?? undefined} alt={userDisplayName} />
              <AvatarFallback className="text-xs font-semibold uppercase tracking-wide">{userInitials}</AvatarFallback>
            </Avatar>
            {options?.showLabel ? <span className="text-left">{userDisplayName}</span> : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Signed in as</p>
            <p className="font-semibold text-foreground">{userDisplayName}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account/profile">Profile &amp; settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings">Account preferences</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/plans">Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              void logout();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const resolvedNavLinks = React.useMemo(() => {
    if (!user) {
      return publicNavLinks;
    }
    if (role === 'admin') {
      return adminNavLinks;
    }
    return studentNavLinks;
  }, [user, role]);

  const activeTab = pathname === '/academy' ? searchParams?.get('tab') ?? 'dashboard' : null;

  const navLinksWithActive = resolvedNavLinks.map((link) => {
    if (!link.href.includes('?')) {
      return { ...link, isActive: pathname === link.href };
    }

    const [linkPath, queryString] = link.href.split('?');
    const linkParams = new URLSearchParams(queryString);
    if (!linkParams.has('tab')) {
      return { ...link, isActive: pathname === linkPath };
    }

    const targetTab = linkParams.get('tab');
    const isActive = pathname === linkPath && activeTab === targetTab;
    return { ...link, isActive };
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-white/80 backdrop-blur-md">
      <div className="hidden border-b border-primary/20 bg-gradient-to-r from-primary via-primary/80 to-secondary/90 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground md:block">
        <div className="container mx-auto flex items-center justify-center px-6">
          Next cohort opens soon · Join the waitlist today
        </div>
      </div>
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 md:py-6">
        <div className="flex flex-1 items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] bg-white/95 text-foreground">
              <div className="flex h-full flex-col gap-8 p-4">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center">
                    <Logo className="h-6 w-auto" />
                  </Link>
                </SheetClose>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/50 p-4 text-left text-sm text-muted-foreground">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <span className="font-medium uppercase tracking-[0.3em] text-primary">Next intake to be announced</span>
                </div>
                <nav className="flex flex-col gap-3">
                  {navLinksWithActive.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile isActive={link.isActive}>
                      {link.icon ? <link.icon className="mr-3 h-5 w-5 text-primary/80" /> : null}
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto space-y-3">
                  {user
                    ? userMenu({ className: 'w-full justify-start px-4 py-3 text-base', showLabel: true })
                    : (
                        <>
                          <Button asChild variant="outline" className="w-full rounded-full border-border">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full rounded-full">
                            <Link href="/signup">Join the waitlist</Link>
                          </Button>
                        </>
                      )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="hidden flex-none items-center gap-2 rounded-full border border-border/80 bg-white/80 px-3 py-2 shadow-sm md:flex">
          {navLinksWithActive.map((link) => (
            <NavLink key={link.href} href={link.href} isActive={link.isActive}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            userMenu({ className: 'px-2 py-1.5', showLabel: false })
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden rounded-full px-5 text-muted-foreground hover:text-foreground md:inline-flex"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-5 shadow-[0_20px_30px_-15px_rgba(99,102,241,0.4)]">
                <Link href="/signup">Join the waitlist</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

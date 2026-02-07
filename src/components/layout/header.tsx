'use client';

import Link from 'next/link';
import {
  Menu,
  BookOpen,
  Users,
  HelpCircle,
  GraduationCap,
  Sparkles,
  LayoutDashboard,
  MonitorPlay,
  LibraryBig,
  BellRing,
  ShieldCheck,
  UserRound,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { SignOutButton } from "@clerk/nextjs";

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
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
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

const studentNavLinks: NavLinkConfig[] = [
  { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: GraduationCap },
  { href: '/dashboard/student#student-sessions', label: 'Live sessions', icon: MonitorPlay },
  { href: '/dashboard/student#student-resources', label: 'Resources', icon: LibraryBig },
  { href: '/dashboard/student#student-announcements', label: 'Announcements', icon: BellRing },
  { href: '/dashboard/student#student-exams', label: 'Exams', icon: ShieldCheck },
];

const instructorNavLinks: NavLinkConfig[] = [
  { href: '/dashboard/instructor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: GraduationCap },
  { href: '/dashboard/student#student-sessions', label: 'Live sessions', icon: MonitorPlay },
  { href: '/dashboard/student#student-resources', label: 'Resources', icon: LibraryBig },
];

const adminNavLinks: NavLinkConfig[] = [
  { href: '/dashboard/admin', label: 'Admin', icon: LayoutDashboard },
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
          ? 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/5'
          : 'px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] hover:text-foreground',
        resolvedIsActive
          ? mobile ? 'bg-white/5 text-foreground' : 'text-foreground'
          : 'text-white/50 hover:text-white/80'
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
  const userDisplayName = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? 'Account';
  const userInitials = React.useMemo(() => {
    if (!userDisplayName) return 'U';
    const parts = userDisplayName?.split(' ').filter(Boolean);
    if (parts && parts.length > 0) {
      const [first, second] = parts;
      return `${first?.[0] ?? ''}${second?.[0] ?? ''}`.trim().toUpperCase() || userDisplayName.slice(0, 2).toUpperCase();
    }
    return userDisplayName.slice(0, 2).toUpperCase();
  }, [userDisplayName]);

  const resolvedNavLinks = React.useMemo(() => {
    if (!user) {
      return publicNavLinks;
    }
    if (role === 'admin') {
      return adminNavLinks;
    }
    if (role === 'instructor') {
      return instructorNavLinks;
    }
    return studentNavLinks;
  }, [user, role]);

  const navLinksWithActive = resolvedNavLinks.map((link) => {
    const [linkPath] = link.href.split(/[?#]/);
    return { ...link, isActive: pathname === linkPath };
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/60 hover:bg-white/5 hover:text-white md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] border-white/[0.06] bg-background">
              <div className="flex h-full flex-col gap-6 p-4">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center">
                    <Logo />
                  </Link>
                </SheetClose>
                <nav className="flex flex-col gap-1">
                  {navLinksWithActive.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile isActive={link.isActive}>
                      {link.icon ? <link.icon className="h-4 w-4 text-white/40" /> : null}
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto space-y-3">
                  {user ? (
                    <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.imageUrl ?? undefined} alt={userDisplayName} />
                        <AvatarFallback className="bg-white/10 text-xs">{userInitials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{userDisplayName}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full rounded-full border-white/10 text-foreground hover:bg-white/5">
                        <Link href="/sign-in">Login</Link>
                      </Button>
                      <Button asChild className="w-full rounded-full">
                        <Link href="/sign-up">Join the Academy</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinksWithActive.map((link) => (
            <NavLink key={link.href} href={link.href} isActive={link.isActive}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-white/5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl ?? undefined} alt={userDisplayName} />
                    <AvatarFallback className="bg-white/10 text-xs">{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-white/[0.06] bg-card">
                <DropdownMenuLabel className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Signed in as</p>
                  <p className="text-sm font-medium text-foreground">{userDisplayName}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem asChild className="cursor-pointer text-white/70 focus:bg-white/5 focus:text-foreground">
                  <Link href="/account/profile" className="flex items-center gap-2">
                    <UserRound className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer text-white/70 focus:bg-white/5 focus:text-foreground">
                  <Link href="/account/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer text-white/70 focus:bg-white/5 focus:text-foreground">
                  <Link href="/plans" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem asChild className="cursor-pointer text-white/70 focus:bg-white/5 focus:text-foreground">
                  <SignOutButton>
                    <div className="flex w-full cursor-pointer items-center gap-2">
                      <LogOut className="h-4 w-4" /> Sign out
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden rounded-full px-4 text-sm text-white/50 hover:bg-white/5 hover:text-white md:inline-flex"
              >
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-5 text-sm font-semibold">
                <Link href="/sign-up">Join</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

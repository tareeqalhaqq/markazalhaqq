'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

function AuthFallback() {
  return (
    <div className="space-y-4 py-8 text-center">
      <AlertCircle className="mx-auto h-10 w-10 text-white/30" />
      <p className="text-sm text-white/50">
        The authentication service is currently unavailable. Please try again
        later.
      </p>
      <Link
        href="/"
        className="inline-block text-sm text-primary transition hover:text-primary/80"
      >
        Return to home
      </Link>
    </div>
  );
}

class AuthFormErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[AuthForm] render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <AuthFallback />;
    }
    return this.props.children;
  }
}

export function SafeAuthForm({ children }: { children: React.ReactNode }) {
  return <AuthFormErrorBoundary>{children}</AuthFormErrorBoundary>;
}

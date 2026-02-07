import type { Metadata } from 'next';
import './globals.css';
import { SafeClerkProvider } from '@/components/safe-clerk-provider';
import { ClientHeader } from '@/components/layout/client-header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Markaz al-Haqq Academy',
  description: 'A dedicated academy and hub for authentic Islamic knowledge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background" aria-hidden />
      <ClientHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </>
  );

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body text-foreground antialiased min-h-screen flex flex-col">
        {clerkPubKey ? (
          <SafeClerkProvider>{content}</SafeClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}

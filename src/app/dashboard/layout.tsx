
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
    );
  }

  if (!user || (role !== 'admin' && role !== 'developer')) {
    router.replace('/');
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
          <Button asChild className="mt-4">
              <Link href="/">Return to Homepage</Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Dashboard</h1>
          <nav className="mt-6 border-b">
            <div className="flex space-x-8">
               <Link href="/dashboard" className="pb-3 text-muted-foreground hover:text-primary font-medium">
                  Overview
                </Link>
               <Link href="/dashboard/roles" className="pb-3 text-muted-foreground hover:text-primary font-medium">
                  Manage Roles
                </Link>
               <Link href="/dashboard/upload" className="pb-3 text-muted-foreground hover:text-primary font-medium">
                  Upload Projects
                </Link>
            </div>
          </nav>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}

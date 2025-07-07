
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Manage Roles', href: '/dashboard/roles' },
    { name: 'Manage Categories', href: '/dashboard/categories' },
    { name: 'Upload Projects', href: '/dashboard/upload' },
    { name: 'Manage Projects', href: '/dashboard/manage-projects' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
          <h1 className="text-3xl md:text-4xl font-bold font-headline">Dashboard</h1>
          <nav className="mt-6 border-b">
            <div className="flex space-x-8 overflow-x-auto">
               {navItems.map((item) => (
                 <Link 
                    key={item.name} 
                    href={item.href} 
                    className={cn(
                        "pb-3 font-medium transition-colors whitespace-nowrap",
                        pathname === item.href ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'
                    )}
                >
                  {item.name}
                </Link>
               ))}
            </div>
          </nav>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}

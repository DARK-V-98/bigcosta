'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-provider';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, ImageUp } from 'lucide-react';
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

  if (!user || role !== 'admin') {
    router.replace('/');
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
             <h2 className="text-lg font-semibold p-2 group-data-[collapsible=icon]:hidden">Admin Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Overview">
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Manage Roles">
                    <Link href="/dashboard/roles">
                      <Users />
                      <span>Manage Roles</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Upload Projects">
                    <Link href="/dashboard/upload">
                      <ImageUp />
                      <span>Upload Projects</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8 bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

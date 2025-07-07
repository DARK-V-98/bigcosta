'use client';

import Link from 'next/link';
import { Menu, LogOut, LayoutDashboard } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth-provider';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'CEO Message', href: '/ceo-message' },
  { name: 'Projects', href: '/projects' },
  { name: 'Testimonials', href: '/#testimonials' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, role, loading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (email: string | null | undefined) => {
    return email ? email.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "border-b border-border bg-background" : "bg-transparent"
    )}>
      <div className="container flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 mr-4">
          <Image src="/logobc.png" alt="BigCosta Construction Logo" width={56} height={56} className="h-14 w-14" />
          <span className="font-headline text-2xl font-bold text-foreground">BigCosta Construction</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="transition-colors text-muted-foreground hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild className="rounded-full">
              <Link href="/#contact">Contact Us</Link>
            </Button>
            {loading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.email ?? ''} />
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(role === 'admin' || role === 'developer') && (
                    <DropdownMenuItem asChild>
                       <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth">Login</Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col p-0">
                <SheetHeader className="p-6">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Main menu for navigating the BigCosta Construction website.
                  </SheetDescription>
                  <Link href="/" className="flex items-center gap-2 mb-6">
                      <Image src="/logobc.png" alt="BigCosta Construction Logo" width={48} height={48} className="h-12 w-12" />
                      <span className="font-headline text-xl font-bold">BigCosta Construction</span>
                  </Link>
                </SheetHeader>
                
                <nav className="grid gap-4 px-6">
                    {navItems.map((item) => (
                    <SheetClose key={item.name} asChild>
                        <Link href={item.href} className="text-lg font-medium transition-colors hover:text-primary">
                        {item.name}
                        </Link>
                    </SheetClose>
                    ))}
                </nav>
                
                {/* Sheet Footer */}
                <div className="mt-auto border-t p-6 grid gap-4">
                  {loading ? (
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                  ) : user ? (
                      <>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.photoURL ?? ''} alt={user.email ?? ''} />
                                <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 overflow-hidden">
                                <p className="text-sm font-medium leading-none">My Account</p>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                        {(role === 'admin' || role === 'developer') && (
                            <SheetClose asChild>
                                <Link href="/dashboard" className={cn(buttonVariants({ variant: 'outline' }), "w-full justify-start")}>
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Link>
                            </SheetClose>
                        )}
                        <SheetClose asChild>
                            <Button onClick={logout} variant="outline" className="w-full justify-start">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </SheetClose>
                      </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button asChild className="w-full">
                          <Link href="/auth">Login / Sign Up</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="w-full" variant="secondary">
                          <Link href="/#contact">Contact Us</Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

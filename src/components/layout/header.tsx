'use client';

import Link from 'next/link';
import { Building, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import React from 'react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'CEO Message', href: '#ceo-message' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Awards', href: '#awards' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-4">
          <Building className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold">BigCosta Construction</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <Button asChild>
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Building className="h-8 w-8 text-primary" />
                    <span className="font-headline text-xl font-bold">BigCosta Construction</span>
                  </Link>
                  <nav className="grid gap-4">
                    {navItems.map((item) => (
                      <SheetClose key={item.name} asChild>
                        <Link href={item.href} className="text-lg font-medium transition-colors hover:text-primary">
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="#contact">Contact Us</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

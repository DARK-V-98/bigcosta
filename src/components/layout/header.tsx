import Link from 'next/link';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
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
        <div className="flex flex-1 items-center justify-end">
           <Button asChild>
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

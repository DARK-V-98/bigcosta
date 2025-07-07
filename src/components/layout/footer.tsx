
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function Footer() {
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'ABOUT US', href: '/about-us' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'TESTIMONIALS', href: '/#testimonials' },
    { name: 'CONTACT', href: '/#contact' },
  ];

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logobc.png" alt="BigCosta Construction Logo" width={40} height={40} className="h-10 w-10 rounded-full" />
              <span className="font-headline text-xl font-bold text-foreground">BigCosta Construction (private) limited</span>
            </Link>
            <p className="text-sm text-center md:text-left">BUILDING YOUR VISION, ONE BRICK AT A TIME.</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-foreground">QUICK LINKS</h3>
            <ul className="mt-4 space-y-2 text-center md:text-left">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <h3 className="text-lg font-semibold text-foreground">FOLLOW US</h3>
             <div className="mt-4 flex justify-center md:justify-start gap-4">
               <Link href="#" aria-label="Facebook">
                 <Facebook className="h-6 w-6 hover:text-primary transition-colors" />
               </Link>
               <Link href="#" aria-label="Twitter">
                 <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
               </Link>
               <Link href="#" aria-label="Instagram">
                 <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
               </Link>
             </div>
          </div>
        </div>
        <Separator className="my-8 bg-border" />
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} BIGCOSTA CONSTRUCTION (PRIVATE) LIMITED. ALL RIGHTS RESERVED.</p>
          <p className="mt-2">
            WEBSITE POWERED BY{' '}
            <a 
              href="https://www.esystemlk.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              ESYSTEMLK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

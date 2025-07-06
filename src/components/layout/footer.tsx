
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function Footer() {
  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'CEO Message', href: '#ceo-message' },
    { name: 'Projects', href: '/projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logobc.PNG" alt="BigCosta Construction Logo" width={40} height={40} className="h-10 w-10" />
              <span className="font-headline text-xl font-bold text-foreground">BigCosta Construction</span>
            </Link>
            <p className="text-sm text-center md:text-left">Building your vision, one brick at a time.</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
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
             <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
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
          <p>© {new Date().getFullYear()} BigCosta Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

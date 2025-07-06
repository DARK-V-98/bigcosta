import Link from 'next/link';
import { Building, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Building className="h-8 w-8 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} BigCosta Construction. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
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
    </footer>
  );
}

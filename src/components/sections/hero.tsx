import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-center overflow-hidden rounded-2xl shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/hr.jpg"
          alt="Modern architectural building"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div 
            className="animate-in fade-in slide-in-from-bottom-12 duration-1000"
          >
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-lg">
              Building Dreams, Crafting Futures
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto drop-shadow-sm">
              We specialize in creating exceptional buildings and spaces through expert craftsmanship, innovative design, and a steadfast commitment to quality.
            </p>
          </div>
          
          <div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg w-full sm:w-auto">
              <Link href="#contact">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg text-white border-white hover:bg-white hover:text-black w-full sm:w-auto">
              <Link href="#projects">
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

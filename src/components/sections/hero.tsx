import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="w-full">
      <div 
        className="container mx-auto px-4 z-10 min-h-[70vh] sm:h-[85vh] flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-3xl animated-light-bg"></div>
          
          <div 
            className="absolute inset-[3px] rounded-3xl bg-gradient-to-br from-primary via-black to-secondary flex items-center justify-center"
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <div 
                className="animate-in fade-in slide-in-from-bottom-12 duration-1000"
              >
                <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight drop-shadow-lg animate-fade-in-out">
                  Building Dreams, Crafting Futures
                </h1>
                <p className="mt-6 text-base md:text-xl text-neutral-200 max-w-2xl mx-auto drop-shadow-sm">
                  We specialize in creating exceptional buildings and spaces through expert craftsmanship, innovative design, and a steadfast commitment to quality.
                </p>
              </div>
              
              <div 
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000"
              >
                <Button asChild size="lg" className="px-8 py-6 text-lg w-full sm:w-auto animate-neon-button">
                  <Link href="/#contact">Get a Free Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg text-white border-white hover:bg-white hover:text-black w-full sm:w-auto animate-neon-button">
                  <Link href="/#projects">
                    View Our Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

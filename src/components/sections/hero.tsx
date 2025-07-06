import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[calc(100vh-4rem)] w-full flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Modern building under construction"
        data-ai-hint="construction site"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center p-4">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Building Your Vision,
          <br />
          <span className="text-primary">One Brick at a Time.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
          From groundbreaking residential projects to state-of-the-art commercial spaces, BigCosta Construction delivers excellence and quality you can trust.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#contact">Get a Free Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="#projects">Our Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

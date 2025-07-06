import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function Hero() {
  return (
    <section className="relative w-full bg-slate-50 overflow-hidden">
      {/* Background Image and Gradient */}
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x1280.png"
          alt="Scenic landscape with mountains"
          data-ai-hint="mountains landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-24 sm:pt-32 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
              The Perfect Home
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              We craft custom homes, combining innovative design and the best materials to bring your vision to life.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-md px-10 py-3 text-base font-semibold shadow-lg">
              <Link href="#contact">Start Your Project</Link>
            </Button>
          </div>

          {/* Right Image Content */}
          <div className="relative">
            <Card className="rounded-2xl shadow-2xl overflow-hidden border-2 border-white aspect-[4/3]">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Modern house rendering"
                data-ai-hint="modern house architecture"
                fill
                className="object-cover"
              />
            </Card>
            <Card className="absolute -bottom-8 -right-8 w-60 p-4 rounded-xl shadow-xl bg-white/80 backdrop-blur-sm border-none hidden sm:block">
                <h4 className="font-semibold text-gray-800">Unique Design</h4>
                <p className="text-sm text-gray-600 mt-1">From blueprints to final renders.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

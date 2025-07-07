import Image from 'next/image';
import { Award, ShieldCheck, HardHat } from 'lucide-react';

export default function Awards() {
  return (
    <section id="awards" className="container mx-auto px-4">
      <div className="rounded-3xl bg-gradient-to-br from-secondary to-background p-8 md:p-12 lg:p-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Awards and Certifications</h2>
          <p className="mt-4 text-lg text-secondary-foreground">
            We are recognized for our commitment to quality, safety, and excellence in the construction industry.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold text-primary">A Legacy of Excellence</h3>
            <p className="text-muted-foreground">
              Our dedication to delivering outstanding results has been consistently recognized by industry leaders and clients alike. These accolades are a testament to our team's hard work, innovative solutions, and unwavering focus on exceeding expectations.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Industry-Recognized Quality</h4>
                  <p className="text-muted-foreground text-sm">Holding top-tier certifications for quality management and construction excellence.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Commitment to Safety</h4>
                  <p className="text-muted-foreground text-sm">Awarded for our impeccable safety records and adherence to the highest safety standards.</p>
                </div>
              </li>
               <li className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <HardHat className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Professional Craftsmanship</h4>
                  <p className="text-muted-foreground text-sm">Certified professionals in every trade, ensuring expert execution on all projects.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src="/cer.png"
              alt="Big Costa Construction Certifications"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Award, ShieldCheck } from 'lucide-react';

const awards = [
  { icon: <Award className="h-6 w-6 text-primary" />, text: 'National Construction Excellence Award 2023' },
  { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: 'Certified Grade A General Contractor' },
  { icon: <Award className="h-6 w-6 text-primary" />, text: 'Best in Residential Design 2022' },
  { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: 'ISO 9001:2015 Quality Management Certified' },
  { icon: <Award className="h-6 w-6 text-primary" />, text: 'Sustainable Building Innovator Award' },
  { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: 'Fully Licensed, Bonded, and Insured' },
];

export default function Awards() {
  return (
    <section id="awards" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Awards & Certifications</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our dedication to excellence is recognized by the industry's most prestigious organizations.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {awards.map((award, index) => (
              <li key={index} className="flex items-center gap-4">
                {award.icon}
                <span className="text-lg">{award.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

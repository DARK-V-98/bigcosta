
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HardHat, DraftingCompass, Wrench, Building2, Shovel, PaintRoller, Layers, Droplets, Hammer, Paintbrush, Sprout, Flame } from 'lucide-react';
import AnimateOnScroll from "@/components/layout/animate-on-scroll";

const allServices = [
  {
    icon: <HardHat className="h-10 w-10 text-primary" />,
    title: 'GENERAL CONTRACTOR SERVICES',
    description: 'WE MANAGE YOUR PROJECT FROM START TO FINISH. WE ENSURE QUALITY, BUDGET, AND TIMELINE.',
  },
  {
    icon: <DraftingCompass className="h-10 w-10 text-primary" />,
    title: 'ARCHITECT & INTERIOR DESIGN',
    description: 'WE WORK WITH YOU TO DESIGN USEFUL AND BEAUTIFUL SPACES, FROM PLANS TO FINAL DETAILS.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'ELECTRICAL, PLUMBING & HVAC',
    description: 'WE INSTALL AND MAINTAIN KEY SYSTEMS. THIS MAKES YOUR BUILDING SAFE, COMFORTABLE, AND EFFICIENT.',
  },
  {
    icon: <Building2 className="h-10 w-10 text-primary" />,
    title: 'ROOFING & MASONRY',
    description: 'WE DO EXPERT STRUCTURAL WORK, FROM ROOFS TO MASONRY.',
  },
  {
    icon: <Shovel className="h-10 w-10 text-primary" />,
    title: 'DEMOLITION & EXCAVATION',
    description: 'WE PREPARE SITES SAFELY AND QUICKLY. THIS INCLUDES DEMOLITION AND EXCAVATION.',
  },
  {
    icon: <PaintRoller className="h-10 w-10 text-primary" />,
    title: 'FLOORING & PAINTING',
    description: 'WE PROVIDE FINISHING TOUCHES. THIS INCLUDES PROFESSIONAL FLOORING AND PAINTING.',
  },
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: 'CONCRETE WORK',
    description: 'WE SPECIALIZE IN HIGH-QUALITY CONCRETE WORK FOR STRONG STRUCTURES.',
  },
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: 'TILING & WATERPROOFING',
    description: 'WE PROVIDE EXPERT TILE AND WATERPROOFING SERVICES TO PROTECT YOUR PROPERTY.',
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: 'CARPENTRY & WOODWORK',
    description: 'WE OFFER CUSTOM CARPENTRY AND WOODWORK.',
  },
  {
    icon: <Paintbrush className="h-10 w-10 text-primary" />,
    title: 'PLASTERING & CEILING',
    description: 'WE PROVIDE SMOOTH PLASTERING AND CEILING WORK.',
  },
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: 'LANDSCAPING & PAVING',
    description: 'WE TRANSFORM OUTDOOR SPACES WITH LANDSCAPING AND PAVING.',
  },
  {
    icon: <Flame className="h-10 w-10 text-primary" />,
    title: 'STEEL FABRICATION',
    description: 'WE OFFER CUSTOM STEEL FABRICATION.',
  },
];

const animationDelays = ["delay-0", "delay-150", "delay-300", "delay-0", "delay-150", "delay-300", "delay-0", "delay-150", "delay-300", "delay-0", "delay-150", "delay-300"];


export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
         <section id="services" className="container mx-auto px-4">
            <div className="rounded-3xl bg-gradient-to-br from-secondary to-background p-8 md:p-12 lg:p-20">
                <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">OUR CORE SERVICES</h1>
                <p className="mt-4 text-lg text-secondary-foreground">
                    WE OFFER MANY CONSTRUCTION SERVICES. WE CUSTOMIZE FOR EACH CLIENT AND PROJECT.
                </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allServices.map((service, index) => (
                    <AnimateOnScroll
                    key={index}
                    animationClasses={`animate-in fade-in zoom-in-95 duration-500 ${animationDelays[index % animationDelays.length]}`}
                    className="h-full"
                    >
                    <Card className="flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card rounded-2xl h-full">
                        <CardHeader className="items-center">
                        {service.icon}
                        <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                        <CardDescription className="text-secondary-foreground">{service.description}</CardDescription>
                        </CardContent>
                    </Card>
                    </AnimateOnScroll>
                ))}
                </div>
            </div>
            </section>
      </main>
      <Footer />
    </div>
  );
}

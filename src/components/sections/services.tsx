
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HardHat, DraftingCompass, Wrench } from 'lucide-react';
import AnimateOnScroll from "@/components/layout/animate-on-scroll";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

const featuredServices = [
  {
    icon: <HardHat className="h-10 w-10 text-primary" />,
    title: 'General Contractor Services',
    description: 'We manage your project from start to finish. We make sure it is high quality, on budget, and on time.',
  },
  {
    icon: <DraftingCompass className="h-10 w-10 text-primary" />,
    title: 'Architect & Interior Design',
    description: 'We work with you to design beautiful and useful spaces, from plans to final details.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Electrical, Plumbing & HVAC',
    description: 'We install and maintain key systems. We make your building safe, comfortable, and efficient.',
  },
];

const animationDelays = ["delay-0", "delay-150", "delay-300"];

export default function Services() {
  return (
    <section id="services" className="container mx-auto px-4">
      <div className="rounded-3xl bg-gradient-to-br from-secondary to-background p-8 md:p-12 lg:p-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Services</h2>
          <p className="mt-4 text-lg text-secondary-foreground">
            We offer many construction services. We customize for each client and project.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
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
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-full text-foreground border-foreground hover:bg-foreground hover:text-background shadow-[4px_4px_0_hsl(var(--primary))] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                <Link href="/services">
                    View All Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

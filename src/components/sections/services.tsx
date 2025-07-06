import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Home, Building2, Wrench } from 'lucide-react';

const services = [
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: 'Residential Construction',
    description: 'Custom homes, multi-family units, and renovations built with precision and care for lasting value and comfort.',
  },
  {
    icon: <Building2 className="h-10 w-10 text-primary" />,
    title: 'Commercial Construction',
    description: 'From office buildings to retail centers, we deliver functional and impressive commercial spaces on time and on budget.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Renovations & Remodeling',
    description: 'Transform your existing space. We handle all aspects of renovation, from kitchen remodels to large-scale additions.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Services</h2>
          <p className="mt-4 text-lg text-secondary-foreground">
            We provide a wide range of construction services, tailored to meet the unique needs of each client and project.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card">
              <CardHeader className="items-center">
                {service.icon}
                <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary-foreground">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

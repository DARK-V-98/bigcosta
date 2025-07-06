import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const projects = [
  {
    title: "Modern Villa",
    category: "Residential",
    image: "https://placehold.co/600x400.png",
    hint: "modern house"
  },
  {
    title: "Downtown Office Complex",
    category: "Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "office building"
  },
  {
    title: "Luxury Kitchen Remodel",
    category: "Renovation",
    image: "https://placehold.co/600x400.png",
    hint: "luxury kitchen"
  },
  {
    title: "Suburban Family Home",
    category: "Residential",
    image: "https://placehold.co/600x400.png",
    hint: "suburban house"
  },
  {
    title: "Retail Shopping Center",
    category: "Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "shopping mall"
  },
  {
    title: "Historic Building Restoration",
    category: "Renovation",
    image: "https://placehold.co/600x400.png",
    hint: "historic building"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-gradient-to-br from-primary to-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Project Showcase</h2>
          <p className="mt-4 text-lg text-foreground">
            Explore a selection of our finest work, a testament to our commitment to quality and craftsmanship.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group shadow-md hover:shadow-2xl transition-shadow duration-300 bg-card">
              <CardContent className="p-0 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  data-ai-hint={project.hint}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-headline text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-primary font-semibold">{project.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

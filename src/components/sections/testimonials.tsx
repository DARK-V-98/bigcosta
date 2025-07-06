'use client';

import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "BigCosta Construction transformed our dream home into a reality. Their attention to detail and commitment to quality is unparalleled. We couldn't be happier with the result.",
    name: 'Sarah & Tom Williams',
    title: 'Homeowners',
    avatar: 'https://placehold.co/100x100.png',
    initials: 'SW',
    hint: 'happy couple'
  },
  {
    quote: 'Working with BigCosta on our new office complex was a seamless experience. They finished the project ahead of schedule and under budget, without compromising on quality. Highly recommended.',
    name: 'Johnathan Carter',
    title: 'CEO, Tech Innovations Inc.',
    avatar: 'https://placehold.co/100x100.png',
    initials: 'JC',
    hint: 'businessman portrait'
  },
  {
    quote: "The renovation of our retail space was a massive undertaking, but BigCosta's team handled it with utmost professionalism. Our customers love the new design, and business has never been better.",
    name: 'Maria Rodriguez',
    title: 'Owner, The Boutique',
    avatar: 'https://placehold.co/100x100.png',
    initials: 'MR',
    hint: 'shop owner'
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We take pride in our work, but don't just take our word for it. Here's what our satisfied clients have to say.
          </p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <Card className="h-full flex flex-col justify-between shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6 flex-grow">
                        <blockquote className="italic text-card-foreground/90 border-l-4 border-primary pl-4">
                          "{testimonial.quote}"
                        </blockquote>
                      </CardContent>
                      <div className="p-6 bg-black/20 flex items-center gap-4 rounded-b-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}


'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Mail, Phone, MapPin } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
      variant: 'default',
    });
    form.reset();
  }

  return (
    <section id="contact" className="container mx-auto px-4">
      <div className="rounded-3xl bg-gradient-to-br from-background to-secondary p-8 md:p-12 lg:p-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <p className="mt-4 text-lg text-foreground">
            Have a project in mind? We'd love to hear from you. Fill out the form below or contact us directly.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/cs.jpg"
                alt="Construction site"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-semibold text-foreground">Contact Information</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@bigcosta.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>123 Construction Ave, Builder City, 45678</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="bg-card rounded-2xl">
              <CardHeader>
                <CardTitle className="font-headline">Send us a Message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-background placeholder:text-muted-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} className="bg-background placeholder:text-muted-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} className="bg-background placeholder:text-muted-foreground" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us about your project..." className="min-h-[120px] bg-background placeholder:text-muted-foreground" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full">Send Message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

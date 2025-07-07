
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award, ShieldCheck, HardHat } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Big Costa Construction (Private) Limited',
  description: 'Learn about Big Costa Construction. Our mission, vision, and commitment to quality and new ideas in construction.',
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <section id="about-us" className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">About Big Costa Construction</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Building the future with quality, honesty, and new ideas.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg group">
                <Image
                    src="/cs.jpg"
                    alt="Our team at a construction site"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="team construction"
                />
            </div>
            <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                    Big Costa Construction started with hard work and a focus on client happiness. We grew from a small contractor to a top name in construction. Our story shows our dedication to doing great work. We have a skilled team and we build strong relationships, not just buildings.
                </p>
                <p className="text-muted-foreground">
                    We work on many projects, from homes to large commercial buildings and infrastructure. We always use new ideas, good management, and green methods. Our results are better than expected.
                </p>
            </div>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-2xl bg-card/50">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Target className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Our mission is to deliver great projects on time and on budget. We have motivated and focused teams. We value our relationships. We are fair and honest with our employees, clients, and partners.
                    </p>
                </CardContent>
            </Card>
            <Card className="rounded-2xl bg-card/50">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Eye className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Our vision is to be the most trusted construction company in the area. We are known for great work, leadership, and helping our communities. We want to be the top choice for clients and a great place to work.
                    </p>
                </CardContent>
            </Card>
          </div>

          <section id="awards" className="mt-24">
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

          <section id="ceo-message" className="mt-24">
            <div className="rounded-3xl bg-gradient-to-br from-secondary to-background p-8 md:p-12 lg:p-20">
                <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-6">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">A Message from Our CEO</h2>
                    <div className="text-secondary-foreground space-y-6 text-left">
                        <p>
                            We are proud to be a leading company in construction, engineering, and building materials. We are known for our skill, competitive prices, and on-time delivery. We follow high quality and safety standards. We have a long history of making our clients happy with good management and great work. We continue to do this.
                        </p>
                        <p>
                            We grew from a small contractor to a large, respected firm. This is because of hard work and our commitment to making customers happy. Our company is built on ethics, professionalism, commitment, and quality. We have worked on industrial, infrastructure, and housing projects. Our success comes from our great team and our focus on client happiness.
                        </p>
                        <p>
                           Our goal is to grow and get more business. With our dedicated staff and modern management, we can achieve this. We are proud of our employees. Their hard work and loyalty make Big Costa Construction a strong company.
                        </p>
                    </div>
                </div>
                </div>
            </div>
           </section>

        </section>
      </main>
      <Footer />
    </div>
  );
}


import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | BigCosta Construction (private) limited',
  description: 'Learn about BigCosta Construction, our mission, our vision, and our commitment to quality and innovation in the construction industry.',
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <section id="about-us" className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">About BigCosta Construction</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Building the future on a foundation of quality, integrity, and innovation.
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
                    Founded on the principles of hard work and an unwavering commitment to client satisfaction, BigCosta Construction has grown from a small, ambitious contractor into a leading name in the construction industry. Our journey is a testament to our dedication to excellence, our skilled team of professionals, and our core philosophy of not just building structures, but building lasting relationships.
                </p>
                <p className="text-muted-foreground">
                    From residential homes to large-scale commercial complexes and vital civil infrastructure, we have left our mark of quality across diverse projects. We continually embrace innovation, employing advanced project management techniques and sustainable practices to deliver results that exceed expectations.
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
                        To deliver high-quality, cost-effective projects on schedule by employing and supporting motivated, flexible, and focused teams. We value the importance of our relationships and will continue to remain fair and true in our dealings with all employees, clients, vendors, and partners.
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
                        To be the most trusted and respected construction company in the region, renowned for our excellence, leadership, and unwavering commitment to improving the communities we serve. We aim to be the contractor of choice for our clients and a workplace of choice for our employees.
                    </p>
                </CardContent>
            </Card>
          </div>

          <section id="ceo-message" className="mt-24">
            <div className="rounded-3xl bg-gradient-to-br from-secondary to-background p-8 md:p-12 lg:p-20">
                <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-6">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">A Message from Our CEO</h2>
                    <div className="text-secondary-foreground space-y-4 text-left md:text-center">
                        <p>
                            We take pride in being one of the pioneer companies dealing with Construction, engineering, and building materials. The Company has attained prominence as a leader through competence, competitiveness, and timely delivery with the highest quality standards and recognized safety performance. We have a long tradition of serving our valued clients to their complete satisfaction through efficient management and excellent workmanship, which we continue to maintain with our untiring efforts.
                        </p>
                        <p>
                            Our progress from a small contractor to a large reputable construction firm. The reason for this progression lies not only in hard work and perseverance but our commitment to satisfy our customers and clients in the best way possible. Ethics, professionalism, commitment, and quality are the four pillars upon which our company stands. We have taken on construction projects in all major areas of the industry, including industrial, civil infrastructure, and residential housing projects in different cities. Our route to success has been highly dependent on our competent team of professionals and our philosophy of upholding client satisfaction.
                        </p>
                        <p>
                            Our long-term goals include expanding our operations to increase our business opportunities. We believe with committed staff and employment of advanced project management techniques, we have a recipe for sustainable growth and achievement. We are very proud of our employees, whose dedication, talent, and loyalty made BigCosta Construction an important force in the Construction market.
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

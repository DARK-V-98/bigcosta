
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ABOUT US | BIGCOSTA CONSTRUCTION (PRIVATE) LIMITED',
  description: 'LEARN ABOUT BIGCOSTA CONSTRUCTION. OUR MISSION, VISION, AND COMMITMENT TO QUALITY AND NEW IDEAS IN CONSTRUCTION.',
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <section id="about-us" className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">ABOUT BIGCOSTA CONSTRUCTION</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              BUILDING THE FUTURE WITH QUALITY, HONESTY, AND NEW IDEAS.
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
                <h2 className="font-headline text-3xl font-bold">OUR STORY</h2>
                <p className="text-muted-foreground">
                    BIGCOSTA CONSTRUCTION STARTED WITH HARD WORK AND A FOCUS ON CLIENT HAPPINESS. WE GREW FROM A SMALL CONTRACTOR TO A TOP NAME IN CONSTRUCTION. OUR STORY SHOWS OUR DEDICATION TO DOING GREAT WORK. WE HAVE A SKILLED TEAM AND WE BUILD STRONG RELATIONSHIPS, NOT JUST BUILDINGS.
                </p>
                <p className="text-muted-foreground">
                    WE WORK ON MANY PROJECTS, FROM HOMES TO LARGE COMMERCIAL BUILDINGS AND INFRASTRUCTURE. WE ALWAYS USE NEW IDEAS, GOOD MANAGEMENT, AND GREEN METHODS. OUR RESULTS ARE BETTER THAN EXPECTED.
                </p>
            </div>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-2xl bg-card/50">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Target className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline">OUR MISSION</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        OUR MISSION IS TO DELIVER GREAT PROJECTS ON TIME AND ON BUDGET. WE HAVE MOTIVATED AND FOCUSED TEAMS. WE VALUE OUR RELATIONSHIPS. WE ARE FAIR AND HONEST WITH OUR EMPLOYEES, CLIENTS, AND PARTNERS.
                    </p>
                </CardContent>
            </Card>
            <Card className="rounded-2xl bg-card/50">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Eye className="h-10 w-10 text-primary" />
                    <CardTitle className="font-headline">OUR VISION</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        OUR VISION IS TO BE THE MOST TRUSTED CONSTRUCTION COMPANY IN THE AREA. WE ARE KNOWN FOR GREAT WORK, LEADERSHIP, AND HELPING OUR COMMUNITIES. WE WANT TO BE THE TOP CHOICE FOR CLIENTS AND A GREAT PLACE TO WORK.
                    </p>
                </CardContent>
            </Card>
          </div>

          <section id="ceo-message" className="mt-24">
            <div className="rounded-3xl bg-gradient-to-br from-secondary to-background p-8 md:p-12 lg:p-20">
                <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-6">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">A MESSAGE FROM OUR CEO</h2>
                    <div className="text-secondary-foreground space-y-6 text-left">
                        <p>
                            WE ARE PROUD TO BE A LEADING COMPANY IN CONSTRUCTION, ENGINEERING, AND BUILDING MATERIALS. WE ARE KNOWN FOR OUR SKILL, COMPETITIVE PRICES, AND ON-TIME DELIVERY. WE FOLLOW HIGH QUALITY AND SAFETY STANDARDS. WE HAVE A LONG HISTORY OF MAKING OUR CLIENTS HAPPY WITH GOOD MANAGEMENT AND GREAT WORK. WE CONTINUE TO DO THIS.
                        </p>
                        <p>
                            WE GREW FROM A SMALL CONTRACTOR TO A LARGE, RESPECTED FIRM. THIS IS BECAUSE OF HARD WORK AND OUR COMMITMENT TO MAKING CUSTOMERS HAPPY. OUR COMPANY IS BUILT ON ETHICS, PROFESSIONALISM, COMMITMENT, AND QUALITY. WE HAVE WORKED ON INDUSTRIAL, INFRASTRUCTURE, AND HOUSING PROJECTS. OUR SUCCESS COMES FROM OUR GREAT TEAM AND OUR FOCUS ON CLIENT HAPPINESS.
                        </p>
                        <p>
                           OUR GOAL IS TO GROW AND GET MORE BUSINESS. WITH OUR DEDICATED STAFF AND MODERN MANAGEMENT, WE CAN ACHIEVE THIS. WE ARE PROUD OF OUR EMPLOYEES. THEIR HARD WORK AND LOYALTY MAKE BIGCOSTA CONSTRUCTION A STRONG COMPANY.
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

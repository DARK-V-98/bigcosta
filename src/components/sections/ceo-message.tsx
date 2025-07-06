import Image from 'next/image';

export default function CeoMessage() {
  return (
    <section id="ceo-message" className="container mx-auto px-4">
      <div className="rounded-3xl bg-gradient-to-br from-background to-primary p-12 md:p-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg group">
            <Image
              src="https://placehold.co/500x600.png"
              alt="CEO of BigCosta Construction"
              data-ai-hint="CEO portrait"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-headline text-2xl font-bold text-white">Mr. Costa</h3>
                <p className="text-primary font-semibold">Founder & CEO</p>
              </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">A Message from Our CEO</h2>
            <div className="text-muted-foreground space-y-4">
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
  );
}

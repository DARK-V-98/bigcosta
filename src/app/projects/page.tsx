
'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

import { db } from '@/lib/firebase-client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProjectCard from '@/components/project-card';
import ImageCarouselDialog from '@/components/image-carousel-dialog';

interface Project {
  id: string;
  title?: string;
  category: string;
  images: string[];
  hint: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData: Project[] = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (images: string[], startIndex: number) => {
    setCarouselImages(images);
    setCarouselStartIndex(startIndex);
    setIsCarouselOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <section className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Work</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our complete portfolio of residential, commercial, and renovation projects.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              Array.from({ length: 9 }).map((_, index) => (
                <Card key={index} className="overflow-hidden bg-card rounded-2xl">
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-auto aspect-[3/2]" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} onCardClick={handleCardClick} />
              ))
            )}
          </div>
          {!loading && projects.length === 0 && (
            <div className="text-center text-muted-foreground mt-12 text-lg">
              No projects have been uploaded yet. Check back soon!
            </div>
          )}
        </section>
      </main>
      <Footer />
       <ImageCarouselDialog
        open={isCarouselOpen}
        onOpenChange={setIsCarouselOpen}
        images={carouselImages}
        startIndex={carouselStartIndex}
      />
    </div>
  );
}

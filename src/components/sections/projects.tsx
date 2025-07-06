
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';
import { Card, CardContent } from "@/components/ui/card";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, 'projects'), 
      where('showOnHomepage', '==', true), 
      orderBy('createdAt', 'desc')
    );
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
    <section id="projects" className="container mx-auto px-4">
      <div className="rounded-3xl bg-gradient-to-br from-primary to-background p-8 md:p-12 lg:p-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Project Showcase</h2>
          <p className="mt-4 text-lg text-foreground">
            Explore a selection of our finest work, a testament to our commitment to quality and craftsmanship.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
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
             <div className="text-center text-foreground mt-12 text-lg">
                 No featured projects have been added yet. Check back soon!
             </div>
         )}
      </div>
      <ImageCarouselDialog
        open={isCarouselOpen}
        onOpenChange={setIsCarouselOpen}
        images={carouselImages}
        startIndex={carouselStartIndex}
      />
    </section>
  );
}

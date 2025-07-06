
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';


interface Project {
  id: string;
  title?: string;
  category: string;
  image: string;
  hint: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                        <Skeleton className="w-full h-[250px]" />
                        <div className="p-6">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </CardContent>
                </Card>
             ))
          ) : (
            projects.map((project) => (
              <div key={project.id} onClick={() => setSelectedImage(project.image)} className="cursor-pointer">
                <Card className="overflow-hidden group shadow-md hover:shadow-2xl transition-shadow duration-300 bg-card rounded-2xl h-full">
                  <CardContent className="p-0 relative">
                    <Image
                      src={project.image}
                      alt={project.title || 'Project Image'}
                      data-ai-hint={project.hint}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.title && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                          <h3 className="font-headline text-2xl font-bold text-white">{project.title}</h3>
                          <p className="text-primary font-semibold">{project.category}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
         {!loading && projects.length === 0 && (
             <div className="text-center text-foreground mt-12 text-lg">
                 No featured projects have been added yet. Check back soon!
             </div>
         )}
      </div>
       {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
            <DialogTitle className="sr-only">Enlarged Project Image</DialogTitle>
            <DialogDescription className="sr-only">A larger view of the selected project image.</DialogDescription>
            <Image
              src={selectedImage}
              alt="Enlarged project view"
              width={1200}
              height={800}
              className="rounded-lg object-contain w-full h-full"
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

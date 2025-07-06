
'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import Image from 'next/image';

import { db } from '@/lib/firebase-client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            <div className="text-center text-muted-foreground mt-12 text-lg">
              No projects have been uploaded yet. Check back soon!
            </div>
          )}
        </section>
      </main>
      <Footer />
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
    </div>
  );
}

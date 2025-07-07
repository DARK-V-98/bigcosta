
'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { groupBy } from 'lodash';

import { db } from '@/lib/firebase-client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from '@/components/project-card';
import ImageCarouselDialog from '@/components/image-carousel-dialog';

interface Project {
  id: string;
  title?: string;
  category: string;
  subcategory?: string;
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
        const data = doc.data();
        let images: string[] = [];
        if (data.images && Array.isArray(data.images)) {
          images = data.images;
        } else if (data.image && typeof data.image === 'string') {
          images = [data.image];
        }
        
        if (images.length > 0) {
            projectsData.push({ id: doc.id, ...data, images } as Project);
        }
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
  
  const groupedProjects = groupBy(projects, 'category');
  const categories = Object.keys(groupedProjects);

  const renderProjectGrid = (projectList: Project[]) => (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projectList.map((project) => (
        <ProjectCard key={project.id} project={project} onCardClick={handleCardClick} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <section className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Work</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our complete portfolio, organized by category.
            </p>
          </div>
          
          <div className="mt-12">
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="overflow-hidden bg-card rounded-2xl">
                            <Skeleton className="w-full h-auto aspect-[3/2]" />
                            <div className="p-6">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : projects.length > 0 ? (
                <Tabs defaultValue={categories[0]} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                       {categories.map(category => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                       ))}
                    </TabsList>
                    {categories.map(category => {
                        const projectsInCategory = groupedProjects[category];
                        const projectsBySubcategory = groupBy(projectsInCategory, 'subcategory');

                        return (
                             <TabsContent key={category} value={category}>
                                {Object.keys(projectsBySubcategory).sort().map(subcategory => (
                                    <div key={subcategory} className="mt-8">
                                        {subcategory && subcategory !== 'undefined' && (
                                            <h2 className="text-2xl font-semibold font-headline border-b pb-2 mb-4">{subcategory}</h2>
                                        )}
                                        {renderProjectGrid(projectsBySubcategory[subcategory])}
                                    </div>
                                ))}
                            </TabsContent>
                        )
                    })}
                </Tabs>
            ) : (
                 <div className="text-center text-muted-foreground mt-12 text-lg">
                    No projects have been uploaded yet. Check back soon!
                </div>
            )}
          </div>
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

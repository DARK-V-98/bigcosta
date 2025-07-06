'use client';

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MoreVertical, Edit, Trash2, Loader2 } from 'lucide-react';

import { db, storage } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface Project {
  id: string;
  title?: string;
  category: 'Residential' | 'Commercial' | 'Renovation';
  description?: string;
  image: string;
  showOnHomepage: boolean;
  hint: string;
}

const editProjectSchema = z.object({
  title: z.string().optional(),
  category: z.enum(['Residential', 'Commercial', 'Renovation']),
  description: z.string().optional(),
  showOnHomepage: z.boolean().default(false),
});

type EditProjectFormValues = z.infer<typeof editProjectSchema>;


export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectSchema),
  });

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
      toast({ title: 'Error', description: 'Could not fetch projects.', variant: 'destructive' });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setSelectedProject(project);
    form.reset({
      title: project.title || '',
      category: project.category,
      description: project.description || '',
      showOnHomepage: project.showOnHomepage,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    try {
      // Delete image from storage
      const imageRef = ref(storage, selectedProject.image);
      await deleteObject(imageRef);

      // Delete document from firestore
      await deleteDoc(doc(db, 'projects', selectedProject.id));

      toast({ title: 'Success', description: 'Project deleted successfully.' });
    } catch (error: any) {
      console.error("Error deleting project:", error);
      let description = "Could not delete project. Please try again.";
      if (error.code === 'storage/object-not-found') {
        // If image doesn't exist, still try to delete firestore doc
        try {
            await deleteDoc(doc(db, 'projects', selectedProject.id));
            toast({ title: 'Success', description: 'Project deleted successfully (image not found in storage).' });
        } catch (dbError) {
            console.error("Error deleting firestore doc after storage error:", dbError);
            toast({ title: 'Error', description, variant: 'destructive' });
        }
      } else {
         toast({ title: 'Error', description: error.message || description, variant: 'destructive' });
      }
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };
  
  const handleUpdateProject = async (data: EditProjectFormValues) => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    try {
      const projectRef = doc(db, 'projects', selectedProject.id);
      await updateDoc(projectRef, {
        ...data,
        hint: `${data.category.toLowerCase()} project`,
      });
      toast({ title: 'Success', description: 'Project updated successfully.' });
    } catch (error) {
       console.error('Error updating project:', error);
       toast({ title: 'Update Failed', description: 'Could not update project details.', variant: 'destructive' });
    } finally {
        setIsSubmitting(false);
        setIsEditDialogOpen(false);
        setSelectedProject(null);
    }
  };


  return (
    <>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Manage Projects</CardTitle>
          <CardDescription>
            View, edit, or delete uploaded projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>On Homepage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-12 w-16 rounded-md" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Image src={project.image} alt={project.title || 'Project'} width={64} height={48} className="rounded-md object-cover" />
                      </TableCell>
                      <TableCell className="font-medium">{project.title || <span className="text-muted-foreground">Untitled</span>}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{project.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={project.showOnHomepage ? 'default' : 'outline'}>
                          {project.showOnHomepage ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(project)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(project)} className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
           {!loading && projects.length === 0 && (
             <p className="text-center text-muted-foreground mt-8">No projects have been uploaded yet.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and its image from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject} disabled={isSubmitting} className="bg-destructive hover:bg-destructive/90">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to the project details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateProject)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Modern Villa" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Renovation">Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short description..." {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="showOnHomepage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Show on Homepage</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={isSubmitting}>
                        Cancel
                    </Button>
                 </DialogClose>
                 <Button type="submit" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   Save changes
                 </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

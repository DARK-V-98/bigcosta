
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';

import { storage, db } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';
import { type Category } from '../categories/page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const projectSchema = z.object({
  title: z.string().optional(),
  category: z.string().min(1, { message: 'A category is required.' }),
  subcategory: z.string().optional(),
  description: z.string().optional(),
  showOnHomepage: z.boolean().default(false),
  images: z
    .instanceof(FileList)
    .refine((files) => files?.length >= 1, 'At least one image is required.')
    .refine(
        (files) => Array.from(files).every((file) => file.size <= 10 * 1024 * 1024),
        'Each image size must be less than 10MB.'
    )
    .refine(
        (files) => Array.from(files).every((file) => file.type.startsWith('image/')),
        'Only image files are accepted.'
    ),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function UploadProjectsPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      showOnHomepage: false,
      category: '',
      subcategory: '',
      images: undefined,
    },
  });

  const watchCategory = form.watch('category');
  const availableSubcategories = categories.find(c => c.name === watchCategory)?.subcategories || [];


  useEffect(() => {
    const q = query(collection(db, 'projectCategories'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Category[];
        setCategories(categoriesData);
    });
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      const imageFiles = Array.from(data.images);
      
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
          const uploadResult = await uploadBytes(storageRef, file);
          return getDownloadURL(uploadResult.ref);
        })
      );

      await addDoc(collection(db, 'projects'), {
        title: data.title || '',
        category: data.category,
        subcategory: data.subcategory || '',
        description: data.description || '',
        images: imageUrls,
        showOnHomepage: data.showOnHomepage,
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Project Uploaded!',
        description: 'Your new project has been added.',
      });
      form.reset();
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
      if(fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error uploading project:', error);
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Upload New Project</CardTitle>
          <CardDescription>
            Upload one or more images, assign a category, and optionally feature it on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Modern Villa" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={(value) => { field.onChange(value); form.setValue('subcategory', ''); }} value={field.value} disabled={loading || categories.length === 0}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a project category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                {availableSubcategories.length > 0 && (
                 <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sub-category (Optional)</FormLabel>
                        <Select onValueChange={(v) => field.onChange(v === '__none__' ? '' : v)} value={field.value} disabled={loading}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a sub-category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="__none__">None</SelectItem>
                            {availableSubcategories.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
               )}
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short description of the project..." {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Project Images (Bulk Upload)</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        onChange={(e) => {
                            if (e.target.files) {
                                onChange(e.target.files);
                            }
                        }}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showOnHomepage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-2xl border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Show on Homepage</FormLabel>
                      <CardDescription>
                        Enable to feature this project in the homepage showcase.
                      </CardDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {loading ? 'Uploading...' : 'Upload Project'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

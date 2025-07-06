'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { storage, db } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const projectSchema = z.object({
  title: z.string().optional(),
  category: z.enum(['Residential', 'Commercial', 'Renovation']),
  description: z.string().optional(),
  showOnHomepage: z.boolean().default(false),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'An image is required.')
    .refine((files) => files?.[0]?.type.startsWith('image/'), 'Only image files are accepted.')
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, 'Image size must be less than 5MB.'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function UploadProjectsPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      showOnHomepage: false,
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      const imageFile = data.image[0];
      const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
      
      const uploadResult = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'projects'), {
        title: data.title || '',
        category: data.category,
        description: data.description || '',
        image: imageUrl,
        showOnHomepage: data.showOnHomepage,
        hint: `${data.category.toLowerCase()} project`,
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Project Uploaded!',
        description: 'Your new project has been added.',
      });
      form.reset();
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
          <CardTitle>Project Image Upload</CardTitle>
          <CardDescription>
            Upload images for new projects. Use the toggle to feature a project on the homepage.
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
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
                      <Textarea placeholder="A short description of the project..." {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Project Image</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
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

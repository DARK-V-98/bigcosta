
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Loader2, Trash2, ImageIcon } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import Image from 'next/image';

import { storage, db } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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

interface DirectorEvent {
  id: string;
  eventName?: string;
  imageUrl: string;
}

const eventSchema = z.object({
  eventName: z.string().optional(),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'A single image is required.')
    .refine((files) => files?.[0]?.size <= 10 * 1024 * 1024, 'Image size must be less than 10MB.')
    .refine((files) => files?.[0]?.type.startsWith('image/'), 'Only image files are accepted.'),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function ManageEventsPage() {
  const [events, setEvents] = useState<DirectorEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DirectorEvent | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventName: '',
      image: undefined,
    },
  });

  useEffect(() => {
    const q = query(collection(db, 'directorEvents'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData: DirectorEvent[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as DirectorEvent));
      setEvents(eventsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching events: ", error);
      toast({ title: 'Error', description: 'Could not fetch events.', variant: 'destructive' });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [toast]);

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    try {
      const imageFile = data.image[0];
      const storageRef = ref(storage, `directorEvents/${Date.now()}_${imageFile.name}`);
      const uploadResult = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'directorEvents'), {
        eventName: data.eventName || '',
        imageUrl,
        createdAt: serverTimestamp(),
      });

      toast({ title: 'Success', description: 'New event added successfully.' });
      form.reset({ eventName: '', image: undefined });
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error uploading event:', error);
      toast({ title: 'Upload Failed', description: 'Could not upload event.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteClick = (event: DirectorEvent) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;
    setIsDeleting(true);
    try {
      // Delete image from storage
      const imageRef = ref(storage, selectedEvent.imageUrl);
      await deleteObject(imageRef).catch(err => console.error("Failed to delete image, it might not exist:", err));

      // Delete document from Firestore
      await deleteDoc(doc(db, 'directorEvents', selectedEvent.id));

      toast({ title: 'Success', description: 'Event deleted successfully.' });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({ title: 'Error', description: 'Could not delete event.', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>Upload an image and name for a special event.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Company Anniversary" {...field} value={field.value ?? ''} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>Event Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onBlur={onBlur}
                          name={name}
                          ref={ref}
                          onChange={(e) => onChange(e.target.files)}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  {isSubmitting ? 'Uploading...' : 'Add Event'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Existing Events</CardTitle>
            <CardDescription>View and manage uploaded special events.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ) : events.length > 0 ? (
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="border p-3 rounded-lg flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                       <Image src={event.imageUrl} alt={event.eventName || 'Event Image'} width={64} height={48} className="rounded-md object-cover w-16 h-12" />
                       <span className="font-medium">{event.eventName || <span className="italic text-muted-foreground">Untitled Event</span>}</span>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(event)} disabled={isDeleting}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground mt-4">No events have been added yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
              and its image from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
